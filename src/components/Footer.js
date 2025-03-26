import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <div className={styles.footerContent}>
          <div className={styles.socialLinks}>
            <div className={styles.linkItem}>
              <a href="https://x.com/lockhoda_martin" target="_blank" rel="noopener noreferrer">
                X (旧Twitter) <Image src="/airplane.svg" alt="airplane" width={16} height={16} className={styles.icon} />
              </a>
            </div>
            <div className={styles.linkItem}>
              <a href="https://mail.example.com" target="_blank" rel="noopener noreferrer">
                Mail <Image src="/airplane.svg" alt="airplane" width={16} height={16} className={styles.icon} />
              </a>
            </div>
          </div>
          
          <div className={styles.partnerLinks}>
            <div className={styles.linkItem}>
              <a href="https://naft.space/" target="_blank" rel="noopener noreferrer">
                NAFT <Image src="/airplane.svg" alt="airplane" width={16} height={16} className={styles.icon} />
              </a>
            </div>
            <div className={styles.linkItem}>
              <a href="https://nagoyaunivnavix.blog.fc2.com/" target="_blank" rel="noopener noreferrer">
                NAVIX <Image src="/airplane.svg" alt="airplane" width={16} height={16} className={styles.icon} />
              </a>
            </div>
          </div>
          
          <div className={styles.navLinks}>
            <div className={styles.linkItem}>
              <Link href="/">HOME</Link>
            </div>
            <div className={styles.linkItem}>
              <Link href="/about">ABOUT</Link>
            </div>
            <div className={styles.linkItem}>
              <Link href="/posts">BLOGS</Link>
            </div>
            <div className={styles.linkItem}>
              <Link href="/search">SEARCH</Link>
            </div>
            <div className={styles.linkItem}>
              <Link href="/contact">CONTACT</Link>
            </div>
          </div>
        </div>
        
        <div className={styles.copyright}>
          <p>©Kodama 2025</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
