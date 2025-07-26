import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="mx-auto mb-4 text-6xl font-bold text-muted-foreground">
                        404
                    </div>
                    <CardTitle>Page Not Found</CardTitle>
                    <CardDescription>
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button asChild className="flex-1">
                            <Link href="/">
                                <Home className="h-4 w-4 mr-2" />
                                Go Home
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="flex-1">
                            <Link href="/blog">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Browse Blog
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
