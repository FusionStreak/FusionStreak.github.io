import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';

export async function renderMDXToHTML(source: string): Promise<string> {
    const processor = remark()
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeHighlight)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
        .use(rehypeStringify, { allowDangerousHtml: true });

    const result = await processor.process(source);
    return String(result);
}

interface MDXContentProps {
    source: string;
    className?: string;
}

export async function MDXContent({ source, className = "prose prose-gray dark:prose-invert max-w-none" }: MDXContentProps) {
    const htmlContent = await renderMDXToHTML(source);

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
}
