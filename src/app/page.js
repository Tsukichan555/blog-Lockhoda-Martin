//app/page.js
//トップページ

import s from '@/styles/index.module.css';
import Link from 'next/link';
import { client } from '@/libs/microcms';


// microCMSからブログ記事を取得
async function getBlogPosts() {
  const data = await client.get({
    endpoint: 'blogs',
    queries: {
      fileds: 'id, title', //get id and title
      limit: 3, //get latest 3 posts
    },
  });
  return data.contents;
}



export default async function Home() {
  const posts = await getBlogPosts();
  return (
    <>
      <h1 className={s.title}>
        <span className={s.line1}>Lockhoda</span>
        <br />
        <span className={s.line2}>Martin</span>
      </h1>
      <section>
        <h2>Latest Articles</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}