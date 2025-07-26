import type { MDXComponents } from 'mdx/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => (
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-2">
                {children}
            </h4>
        ),
        p: ({ children }) => (
            <p className="leading-7 [&:not(:first-child)]:mt-6 mb-4">
                {children}
            </p>
        ),
        ul: ({ children }) => (
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                {children}
            </ul>
        ),
        ol: ({ children }) => (
            <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
                {children}
            </ol>
        ),
        li: ({ children }) => (
            <li className="leading-7">
                {children}
            </li>
        ),
        blockquote: ({ children }) => (
            <blockquote className="mt-6 border-l-2 pl-6 italic">
                {children}
            </blockquote>
        ),
        code: ({ children }) => (
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                {children}
            </code>
        ),
        pre: ({ children }) => (
            <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900">
                {children}
            </pre>
        ),
        a: ({ href, children }) => (
            <a
                href={href}
                className="font-medium text-primary underline underline-offset-4"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
                {children}
            </a>
        ),
        hr: () => <Separator className="my-8" />,
        table: ({ children }) => (
            <div className="my-6 w-full overflow-y-auto">
                <table className="w-full">
                    {children}
                </table>
            </div>
        ),
        thead: ({ children }) => (
            <thead className="[&_tr]:border-b">
                {children}
            </thead>
        ),
        tbody: ({ children }) => (
            <tbody className="[&_tr:last-child]:border-0">
                {children}
            </tbody>
        ),
        tr: ({ children }) => (
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                {children}
            </tr>
        ),
        th: ({ children }) => (
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                {children}
            </th>
        ),
        td: ({ children }) => (
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                {children}
            </td>
        ),
        Card: ({ title, description, children, ...props }) => (
            <Card {...props}>
                {(title || description) && (
                    <CardHeader>
                        {title && <CardTitle>{title}</CardTitle>}
                        {description && <CardDescription>{description}</CardDescription>}
                    </CardHeader>
                )}
                <CardContent>{children}</CardContent>
            </Card>
        ),
        Badge,
        ...components,
    };
}
