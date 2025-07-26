'use client';

import React from 'react';
import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { useMDXComponents } from '@/components/mdx-components';
import 'highlight.js/styles/github-dark.css';

interface MDXRendererProps {
    source: string;
}

export function MDXRenderer({ source }: MDXRendererProps) {
    const [MDXContent, setMDXContent] = React.useState<React.ComponentType<Record<string, unknown>> | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function compileMDX() {
            try {
                setIsLoading(true);
                setError(null);

                // Compile the MDX source
                const compiled = await compile(source, {
                    outputFormat: 'function-body',
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                        rehypeHighlight,
                        rehypeSlug,
                        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                    ],
                });

                // Run the compiled MDX to get the component
                const { default: Component } = await run(compiled, {
                    ...runtime,
                    baseUrl: import.meta.url,
                });

                setMDXContent(() => Component);
            } catch (err) {
                console.error('Error compiling MDX:', err);
                setError(err instanceof Error ? err.message : 'Unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        }

        compileMDX();
    }, [source]);

    const components = useMDXComponents({});

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-800 dark:text-red-200 font-medium">
                    Error rendering content:
                </p>
                <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                    {error}
                </p>
            </div>
        );
    }

    if (!MDXContent) {
        return (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200">
                    No content to render.
                </p>
            </div>
        );
    }

    return <MDXContent components={components} />;
}
