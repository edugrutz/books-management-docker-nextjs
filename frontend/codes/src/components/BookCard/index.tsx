"use client"

import { Book } from "@/types/book";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteBookAction } from "@/actions/book-actions";

export function BookCard({ book }: { book: Book }) {
    return (
        <Card className="flex flex-col justify-between">
            <CardHeader>
                <CardTitle>{book.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{book.author}</p>
            </CardContent>
            <CardFooter>
                <Button variant="outline" onClick={() => deleteBookAction(book.id)}>Delete</Button>
            </CardFooter>
        </Card>
    );
}