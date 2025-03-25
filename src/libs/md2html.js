import ReactMarkdown from 'react-markdown'
import rehypeStarryNight from 'rehype-starry-night'
import remarkGfm from 'remark-gfm'
import React from 'react'

const Md2html = ({ rawMd }) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {rawMd}
    </ReactMarkdown>
  )
}

export default Md2html