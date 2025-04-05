'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Header.module.css'


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.headerContent}>

          <nav className={styles.navLinks}>

            <div className={styles.linkItem}>
              <Link href="/" className={styles.Link}>HOME</Link>
            </div>
            <div className={styles.linkItem}>
              <Link href="/about" className={styles.Link}>ABOUT</Link>
            </div>
            <div className={styles.linkItem}>
              <Link href="/posts" className={styles.Link}>BLOG</Link>
            </div>
            <div className={styles.linkItem}>
              <Link href="/search" className={styles.Link}>SEARCH</Link>
            </div>

          </nav> {/* navLinks */}

          <svg className={styles.humburgerMenu} onClick={toggleMenu} xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24">
            <path className={styles.path} d="M5 8H13.75M5 12H19M10.25 16L19 16"  strokeLinecap="round" strokeLinejoin="round" fill="red" />
          </svg>{/* humburgerMenu */}
          
          
        </div> {/* headerContent */}
      
        {/* オーバーレイ */}
        {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}

        
        <nav className={`${styles.navLinksMobile} ${isMenuOpen ? styles.showMenu : ''}`}>
            <Link onClick={closeMenu} className={styles.Link} href='/'>HOME</Link>
            <Link onClick={closeMenu} className={styles.Link} href='/about'>ABOUT</Link>
            <Link onClick={closeMenu} className={styles.Link} href='/posts'>BLOG</Link>
            <Link onClick={closeMenu} className={styles.Link} href='/search'>SEARCH</Link>
          </nav> {/* navLinksMobile */}

      </div> {/*headerInner*/}
    </header>
  )
}

export default Header
