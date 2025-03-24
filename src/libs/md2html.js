import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Md2html({ rawMd }) {
    return (
        <Markdown remarkPlugins={[remarkGfm]}>
            {rawMd}
        </Markdown>
    )
}