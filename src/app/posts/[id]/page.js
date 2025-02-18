import Layout from '@/app/layout'
import { client } from '@/libs/microcms'
import dayjs from 'dayjs'
import { md2html } from '@/libs/md2html'

//get specific post data from microCMS
async function getBlogPost(id) {
    const data = await client.get({
        endpoint: `blogs/${id}`,
    });
    return data;
}

//generate post page
export default async function BlogPostPage({ params }) {
    const { id } = await params; //get id
    const post = await getBlogPost(id); //get post data

    // dayjsを使ってpublishedAtをYY.MM.DD形式に変換
    const formattedDate = dayjs(post.publishedAt).format('YY.MM.DD');

    return (
        <main>
            <h1>{post.title}</h1> {/* タイトルを表示 */}
            <div>{formattedDate}</div> {/* 日付を表示 */}
            <div>カテゴリー：{post.category && post.category.name}</div> {/* カテゴリーを表示 */}
            {/*<div dangerouslySetInnerHTML={{ __html: post.body }} />  記事本文を表示 */}
        </main>
    );
}

// 静的パスを生成
export async function generateStaticParams() {
    const contentIds = await client.getAllContentIds({ endpoint: 'blogs' });

    return contentIds.map((contentId) => ({
        id: contentId, // 各記事のIDをパラメータとして返す
    }));
}