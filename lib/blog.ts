import { readFileSync, readdirSync, statSync, existsSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  author?: string
  tags?: string[]
  readTime?: string
  featured?: boolean
}

export function getAllPosts(): BlogPost[] {
  try {
    if (!existsSync(postsDirectory)) {
      return []
    }

    const fileNames = readdirSync(postsDirectory)
    const allPosts = fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '')
        const fullPath = join(postsDirectory, fileName)
        const fileContents = readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        const stats = statSync(fullPath)

        return {
          slug,
          title: data.title || slug,
          date: data.date || stats.birthtime.toISOString().split('T')[0],
          excerpt: data.excerpt || '',
          content,
          author: data.author,
          tags: data.tags || [],
          readTime: data.readTime || calculateReadTime(content),
          featured: data.featured || false,
        } as BlogPost
      })

    return allPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = join(postsDirectory, `${slug}.mdx`)
    if (!existsSync(fullPath)) {
      return null
    }

    const fileContents = readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const stats = statSync(fullPath)

    return {
      slug,
      title: data.title || slug,
      date: data.date || stats.birthtime.toISOString().split('T')[0],
      excerpt: data.excerpt || '',
      content,
      author: data.author,
      tags: data.tags || [],
      readTime: data.readTime || calculateReadTime(content),
      featured: data.featured || false,
    } as BlogPost
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getAllSlugs(): string[] {
  try {
    if (!existsSync(postsDirectory)) {
      return []
    }

    const fileNames = readdirSync(postsDirectory)
    return fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => fileName.replace(/\.mdx$/, ''))
  } catch (error) {
    console.error('Error reading blog slugs:', error)
    return []
  }
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((post) => post.featured)
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) => post.tags?.includes(tag))
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const tags = new Set<string>()

  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).sort()
}
