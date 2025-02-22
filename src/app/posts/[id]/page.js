//app/[id]/page.js
//個別記事ページ
import { client } from '@/libs/microcms'
import dayjs from 'dayjs'
import { md2html } from '@/libs/md2html'
import Image from 'next/image'

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

    //md2htmlを使ってcontentをHTMLに変換
    const htmlContent = await md2html(post.content);

    //debug
    console.log('-----------------------');
    console.log(post);
    console.log('-----------------------');
    console.log(htmlContent);
    console.log('-----------------------');

    return (
        <>
            <section>
                <div>
                    {post.pic ? (
                        <Image src={post.pic.url} alt={post.title} width={post.pic.width} height={post.pic.height} /> // 画像を表示
                    ) : (
                        <span>🚀</span> // ロケットの絵文字を表示
                    )}
                </div>
                <div>
                    <h1>{post.title}</h1> {/* タイトルを表示 */}
                    <div>{formattedDate}</div> {/* 日付を表示 */}
                </div>
            </section>
            <section>
                <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div> {/* 記事本文を表示 */}
            </section>
        </>
    );
}

// 静的パスを生成
export async function generateStaticParams() {
    const contentIds = await client.getAllContentIds({ endpoint: 'blogs' });

    return contentIds.map((contentId) => ({
        id: contentId, // 各記事のIDをパラメータとして返す
    }));
}