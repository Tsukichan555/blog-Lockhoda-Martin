import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <div className={styles.headerContent}>
          
          <nav className={styles.navLinks}>
            <div className={styles.linkItem}>
              <Link href="/">HOME</Link>
            </div>
            <div className={styles.linkItem}>
              <Link href="/about">ABOUT</Link>
            </div>
            <div className={styles.linkItem}>
              <Link href="/posts">BLOG</Link>
            </div>
            <div className={styles.linkItem}>
              <Link href="/search">SEARCH</Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
