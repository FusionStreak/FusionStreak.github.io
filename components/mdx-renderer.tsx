'use client'

import React from 'react'
import { compile, run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { useMDXComponents } from '@/components/mdx-components'
import 'highlight.js/styles/github-dark.css'

interface MDXRendererProps {
  source: string
}

export function MDXRenderer({ source }: MDXRendererProps) {
  const [MDXContent, setMDXContent] = React.useState<React.ComponentType<
    Record<string, unknown>
  > | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function compileMDX() {
      try {
        setIsLoading(true)
        setError(null)

        // Compile the MDX source
        const compiled = await compile(source, {
          outputFormat: 'function-body',
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeHighlight,
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          ],
        })

        // Run the compiled MDX to get the component
        const { default: Component } = await run(compiled, {
          ...runtime,
        })

        setMDXContent(() => Component)
      } catch (err) {
        console.error('Error compiling MDX:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    compileMDX()
  }, [source])

  const components = useMDXComponents({})

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
        <p className="font-medium text-red-800 dark:text-red-200">
          Error rendering content:
        </p>
        <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
      </div>
    )
  }

  if (!MDXContent) {
    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
        <p className="text-yellow-800 dark:text-yellow-200">
          No content to render.
        </p>
      </div>
    )
  }

  return <MDXContent components={components} />
}
