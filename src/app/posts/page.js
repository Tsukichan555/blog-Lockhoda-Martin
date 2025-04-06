// app/posts/page.js
//投稿一覧ページ

import React from 'react';
import Link from 'next/link'
import { client } from '@/libs/microcms'
import styles from '@/styles/posts.module.css';

import Image from 'next/image';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

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



export default async function PostsPage() {
    const posts = await getBlogPosts();
    //debug
    console.log(posts);

    return (
        <>
          <section className={styles.pageContainer}>
            <div className={styles.titleSection}>
              <h1 className={styles.pageTitle}>記事一覧</h1>
            </div>{/* titleSection */}

            <div className={styles.container}>

              <div className={styles.tagSelectorContainer}>
                <div className={styles.tagSelectorTitle}>
                  <h2>Filter by Tags</h2>
                </div>{/* tagSelectorTitle */}

                <div className={styles.tagList}>
                  <span className={styles.tag}></span>{/*tag*/}
                </div>{/* tagList */}

              </div>{/* tagSelectorContainer */}
          <div className={styles.articlesList}>
         
            {posts.map((post, index) => (
            <article key={post.id || index} className={styles.articleCard}>

              <Link href={`/posts/${post.id}`} className={styles.articleLink}>

                <div className={styles.articleImage}>
                  {post.pic && post.pic.url ? (
                    <Image width={50} height={50} src={post.pic.url} alt="article thumbnail" />
                  ) : (
                    <div className={styles.gradientPlaceholder} />
                  )}
                </div>{/* articleImage */}

                <div className={styles.articleInfo}>

                  <h3 className={styles.articleTitle}>{post.title}</h3>

                  <div className={styles.articleMeta}>
                    {post.publishedAt && (
                      <span className={styles.date}>{dayjs(post.publishedAt).locale('ja').format('YYYY/MM/DD')}</span>
                    )}
                    {post.tags && (
                      <div className={styles.tags}>
                        {post.tags.split("/").map((tag, index) => (
                          <span key={index} className={styles.tag}>{tag}</span>
                        ))}
                      </div> /* tags */
                    )}

                  </div>{/* articleMeta */}

                </div>{/* articleInfo */}

              </Link>
            </article> /* articleCard */
            ))}

            </div>{/* articlesList */}
            </div>{/* container */}
          </section>
        </>
    );
};

