'use client';

import { useState, useEffect } from 'react';
import s from '@/styles/LikeButton.module.css';

export default function LikeButton({ postId, initialLikeCount }) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // マウント時に最新のlikeCountといいね済み状態を取得
  // （ページはSSGなので、クライアントサイドで最新値に上書きする）
  useEffect(() => {
    fetch(`/api/like/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setLikeCount(data.likeCount);
        setIsLiked(data.isLiked);
      })
      .catch((err) => console.error('Failed to fetch like status:', err))
      .finally(() => setIsLoading(false));
  }, [postId]);

  const handleLike = async () => {
    if (isLiked || isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/like/${postId}`, { method: 'POST' });

      if (res.ok) {
        const data = await res.json();
        setLikeCount(data.likeCount);
        setIsLiked(true);
      } else if (res.status === 409) {
        // 別タブなどで既にいいね済みだった場合
        setIsLiked(true);
      }
    } catch (err) {
      console.error('Failed to like:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`${s.likeButton} ${isLiked ? s.liked : ''}`}
      onClick={handleLike}
      disabled={isLiked || isLoading}
      aria-label={isLiked ? 'いいね済み' : 'いいねする'}
    >
      <span className={s.heart} aria-hidden="true">♥</span>
      <span className={s.count}>{likeCount}</span>
    </button>
  );
}
