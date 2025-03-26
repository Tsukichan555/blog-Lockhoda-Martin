//app/posts/[id]/page.js
//個別記事ページ
import { client } from '@/libs/microcms';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import Image from 'next/image';
import s from '@/styles/page.module.css';
import { parseHtmlContent } from '@/utils/htmlParser';

//get specific post data from microCMS
async function getBlogPost(id) {
    const data = await client.get({
        endpoint: `blog/${id}`,
    });
    return data;
}

//generate post page
export default async function BlogPostPage({ params }) {
    const { id } = params; //get id
    const post = await getBlogPost(id); //get post data

    // dayjsを使ってpublishedAtをYY.MM.DD形式に変換
    const formattedDate = dayjs(post.publishedAt).locale('ja').format('YY.MM.DD');

    // Parse the HTML content to replace img tags with Next.js Image components
    const parsedContent = post.maincontent ? parseHtmlContent(post.maincontent) : null;

    return (
        <article className={s.postContainer}>
            <section className={s.postHeader}>
                {post.pic && (
                    <div className={s.featuredImage}>
                        <Image 
                            src={post.pic.url} 
                            alt={post.title} 
                            width={post.pic.width} 
                            height={post.pic.height}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                )}
                
                <h1 className={s.postTitle}>{post.title}</h1>
                
                <div className={s.postMeta}>
                    <span className={s.postDate}>{formattedDate}</span>
                    
                    {post.tags && (
                        <div className={s.tags}>
                            {post.tags.split("/").map((tag, index) => (
                                <span className={s.tag} key={index}>{tag}</span>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className={s.postContent}>
                {parsedContent}
            </section>
        </article>
    );
}

// 静的パスを生成
export async function generateStaticParams() {
    try {
        const contentIds = await client.getAllContentIds({ endpoint: 'blog' });
        
        return contentIds.map((contentId) => ({
            id: contentId, // 各記事のIDをパラメータとして返す
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}
