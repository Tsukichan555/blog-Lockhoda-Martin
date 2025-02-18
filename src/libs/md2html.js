import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';
import remarkGfm from 'remark-gfm';

export async function md2html(mdContent) {
  const file = await unified()
    .use(remarkParse) // Markdownを解析
    .use(remarkGfm) // GFMサポート
    .use(remarkRehype) // MarkdownからHTML構造へ変換
    .use(rehypePrettyCode, { //code blockの装飾
      theme: 'one-dark-pro',
      keepBackground: true,
      transformers: [
        transformerCopyButton({
          feedbackDuration: 2_000,
          visibility: 'hover',
        }),
      ],
    })
    .use(rehypeStringify) // HTML文字列化
    .process(mdContent); // 文字列を直接入力

  return String(file); // HTMLとして出力
};
