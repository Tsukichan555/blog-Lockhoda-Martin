import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Search = () => {
  return (
    <>
      <h1>ご迷惑をおかけします</h1>
      <h2>ただいま工事中です</h2>
      <Image src='/underconstruction.png' width={300} height={300} alt='工事中' />
    </>
)
}

export default Search
