import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllPosts, getFeaturedPosts } from "@/lib/blog";

export default function BlogPage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const recentPosts = allPosts.filter((post) => !post.featured).slice(0, 6);

  return (
    <div className="space-y-8">
      {featuredPosts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Featured Posts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredPosts.slice(0, 2).map((post) => (
              <Card
                key={post.slug}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
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
                  </div>
                  <CardTitle className="line-clamp-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                  <Button variant="ghost" asChild className="p-0 h-auto">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-2"
                    >
                      Read more
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {recentPosts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Recent Posts</h2>
          <div className="space-y-6">
            {recentPosts.map((post, index) => (
              <div key={post.slug}>
                <article className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
                  <div className="md:col-span-1 space-y-2">
                    <div className="text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {post.readTime}
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <h3 className="text-xl font-semibold">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <Button variant="ghost" asChild className="p-0 h-auto">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-2 text-sm"
                      >
                        Read more
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </article>
                {index < recentPosts.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </div>
      )}

      {allPosts.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">No blog posts yet</h3>
              <p className="text-muted-foreground">
                Stay tuned for upcoming articles about web development,
                programming, and technology.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
