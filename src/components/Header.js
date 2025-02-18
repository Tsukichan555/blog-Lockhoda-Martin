import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header>
      <nav  className="nav">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/posts">Blog</Link>
      </nav>
    </header>
  )
}

export default Header