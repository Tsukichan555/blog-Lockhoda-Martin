// /api/like/[id] - いいねAPI（サーバーサイド専用）
// microCMSへのすべてのリクエストはここで処理する
import { createClient } from 'microcms-js-sdk';
import { client } from '@/libs/microcms';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Write権限付きクライアント（このルートのみで使用）
function getWriteClient() {
  if (!process.env.MICROCMS_WRITE_API_KEY) {
    throw new Error('MICROCMS_WRITE_API_KEY is required');
  }
  return createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_WRITE_API_KEY,
  });
}

// GET /api/like/[id]
// 最新のlikeCountと、このユーザーがいいね済みかどうかを返す
export async function GET(request, { params }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const isLiked = cookieStore.has(`liked_${id}`);

  try {
    const post = await client.get({
      endpoint: `blog/${id}`,
      queries: { fields: 'likeCount' },
    });

    return NextResponse.json({
      likeCount: post.likeCount ?? 0,
      isLiked,
    });
  } catch (error) {
    console.error('Failed to get like count:', error);
    return NextResponse.json({ likeCount: 0, isLiked });
  }
}

// POST /api/like/[id]
// 二重いいねチェック → microCMS GET → likeCount+1 → microCMS PATCH → Cookie発行
export async function POST(request, { params }) {
  const { id } = await params;
  const cookieStore = await cookies();

  // 二重いいね防止
  if (cookieStore.has(`liked_${id}`)) {
    return NextResponse.json({ error: 'Already liked' }, { status: 409 });
  }

  try {
    // 現在のlikeCountを取得（read APIキー）
    const post = await client.get({
      endpoint: `blog/${id}`,
      queries: { fields: 'likeCount' },
    });

    const newCount = (post.likeCount ?? 0) + 1;

    // likeCountを更新（write APIキー）
    const writeClient = getWriteClient();
    await writeClient.update({
      endpoint: 'blog',
      contentId: id,
      content: { likeCount: newCount },
    });

    // httpOnly Cookieをセットしてレスポンス（1年間）
    const response = NextResponse.json({ likeCount: newCount });
    response.cookies.set(`liked_${id}`, '1', {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Failed to update like count:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
