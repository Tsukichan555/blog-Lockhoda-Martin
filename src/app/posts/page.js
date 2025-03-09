// app/posts/page.js
//投稿一覧ページ

import React from 'react';
import Link from 'next/link'
import { client } from '@/libs/microcms'

//get articles from microCMS
async function getBLogPosts() {
    const data = await client.get({
        endpoint: 'blog',
        queries: {
            fields: 'id, title', //idとtitleを取得

        },
    });
    return data.contents;
}

export async function PostsPage() {
    const posts = await getBLogPosts();

    return (
        <>
            <h1>記事一覧</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        
                        <Link href={`/posts/${post.id}`}>
                            <h2>{post.title || "No Title" }</h2>
                            <p>{post.date || 'No date provided'}</p>
                            {/* <p dangerouslySetInnerHTML={{ __html: post.content }} /> */}
                        </Link>
                        </li>
                ))}


                
            </ul>
        </>
    );
};

export default PostsPage;