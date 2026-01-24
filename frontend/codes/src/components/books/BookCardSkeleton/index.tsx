import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BookCardSkeleton() {
    return (
        <Card className="flex flex-col justify-between h-full">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <Skeleton className="h-6 w-3/4" />
                    <div className="flex gap-1">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-10 w-full rounded-md mb-2" />
                <div className="flex items-center gap-2 mt-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-end border-t border-muted/20 pt-4 mt-auto">
                <Skeleton className="h-6 w-20 rounded-full" />
            </CardFooter>
        </Card>
    );
}
