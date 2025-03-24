//app/page.js
//トップページ

import s from '@/styles/index.module.css';
import Link from 'next/link';
import { client } from '@/libs/microcms';
import Image from 'next/image';
import dayjs from 'dayjs';

// iamges
//import FighterJetSilhouette from '/figher-jet-silhouette.png'; //public


// microCMSからブログ記事を取得
async function getBlogPosts() {
  const data = await client.get({
    endpoint: 'blog',
    queries: {
      fileds: 'id, title', //get id and title
      limit: 3, //get latest 3 posts
    },
  });
  return data.contents;
}



export default async function Home() {
  const posts = await getBlogPosts();

  //debug
  console.log(posts);
  return (
    <>
      <section className={s.hero}>

        <div className={s.heroContent}>

          <h1 className={s.title}>
            <span className={s.line1}>Lockhoda</span>
            <br />
            <span className={s.line2}>Martin</span>
          </h1>{/* title */}

          <div className="heroDescription">
            <p>はじめまして．コダマです．2002年生まれで現在は名古屋にいます．<br />これまで名古屋大学宇宙開発チームNAFT，飛行ロボットサークルNAVIXに所属し学生ロケットや飛行ロボコンに挑戦してきました．<br />現在は隠居しつつ自由に挑戦的な工作をしています．本ブログでは日々の開発の記録や過去を振り返った記事を投稿予定です．</p>
            <a href="about" className="btnPrimary">About me</a>
          </div>{/* heroDescription */}

        </div>{/* heroContent */}

        <div className="heroImage">
          <Image width={500} height={500} src='/figher-jet-silhouette.png' alt="Fighter Jet Silhouette" />
        </div>{/* heroImage */}

      </section>{/* hero */}

      <section className={s.latestArticles}>
        <h2>Latest Articles</h2>


        <div className={s.articlesGrid}>
          {/* 最新の３投稿のリンクカードを表示 */}

          {posts.slice(0, 3).map((post) => (
            <article className={s.articleCard}>

              <Link href={`/posts/${post.id}`} className={s.articleLink}>

                {post.pic && (<div className={s.articleImage}>
                  <Image width={50} height={50} src={post.pic.url} alt="article thumbnail" />
                </div>/* articleImage */
                )}

                <div className={s.articleInfo}>

                  <h3>{post.title}</h3>

                  <div className={s.articleMeta}>

                    <span className={s.date}>{dayjs(post.publishedAt).format('YYYY/MM/DD')}</span>
                    {post.tags && (
                      <div className={s.tags}>
                        {post.tags.split("/").map((tag) => (
                          <span className={s.tag}>{tag}</span>
                        ))}
                      </div> /* tags */
                    )}

                  </div>{/* articleMeta */}

                </div>{/* articleInfo */}

              </Link>
            </article>/* articleCard */
          ))}



        </div>{/* articleGrid */}
      </section>{/* latestArticles */}
    </>
  )
}