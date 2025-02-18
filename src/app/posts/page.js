import React from 'react';
import Link from 'next/link'
import { client } from '@/libs/microcms'

//get articles from microCMS
async function getBLogPosts() {
    const data = await client.get({
        endpoint: 'blogs',
        queries: {
            fileds: 'id, title',

        },
    });
    return data.contents;
}

async function PostsPage() {
    const posts = await getBLogPosts();

    return (
        <div>
            <h1>記事一覧</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.date || 'No date provided'}</p>
                        <p          dangerouslySetInnerHTML={{ __html: post.content }} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsPage;