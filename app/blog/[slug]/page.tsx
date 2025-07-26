import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { MDXContent } from "@/components/mdx-content";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const slugs = getAllSlugs();
    return slugs.map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | Sayfullah Eid`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="space-y-6">
                <Button variant="ghost" asChild>
                    <Link href="/blog" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Blog
                    </Link>
                </Button>

                <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                        </div>
                        {post.author && (
                            <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {post.author}
                            </div>
                        )}
                        <Button variant="ghost" size="sm" className="ml-auto">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                        </Button>
                    </div>

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, idx) => (
                                <Badge key={idx} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {post.excerpt && (
                        <p className="text-lg text-muted-foreground">
                            {post.excerpt}
                        </p>
                    )}
                </div>
            </div>

            <Separator />

            {/* Content */}
            <Card>
                <CardContent className="p-6">
                    {await MDXContent({ source: post.content })}
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="space-y-6">
                <Separator />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                        <p className="text-sm text-muted-foreground">
                            Thanks for reading! If you enjoyed this post, consider sharing it with others.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/blog">More Posts</Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
