import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

import rehypePrettyCode from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';

import remarkGfm from 'remark-gfm';
/* import rehypeKatex from 'rehype-katex'; */
/* import 'katex/dist/katex.min.css'; */
/* import remarkCustomBlocks from 'remark-custom-blocks'; */
//import rehypeMermaid from 'rehype-mermaid'



export async function Md2html(mdContent) {
  const file = await unified()
    .use(remarkParse) // Markdownを解析
    //.use(remarkMermaid) // mermaid記法
    .use(remarkGfm) // GitHub Flavored Markdown
    /* .use(remarkCustomBlocks, {
      alert: 'div.alert',
      info: 'div.info',
      warning: 'div.warning',
    }) */
    .use(remarkRehype) 
    //.use(rehypeMermaid) //mermaid記法
    // MarkdownからHTML構造へ変換
    .use(rehypePrettyCode, { // code blockの装飾
      theme: 'one-dark-pro',
      keepBackground: true,
      transformers: [ //コードブロックのコピーボタン
        transformerCopyButton({
          feedbackDuration: 2_000,
          visibility: 'hover',
        }),
      ],
    })
    /* .use(rehypeKatex) */ // 数式
    .use(rehypeStringify) // HTML文字列化
    .process(mdContent); // 文字列を直接入力

  return String(file); // HTMLとして出力
}