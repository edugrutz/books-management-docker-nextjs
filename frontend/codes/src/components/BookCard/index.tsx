"use client"

import { Book } from "@/types/book";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function BookCard({ book, onDelete }: { book: Book, onDelete?: (id: number) => void }) {
    return (
        <Card className="flex flex-col justify-between">
            <CardHeader>
                <CardTitle>{book.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{book.author}</p>
            </CardContent>
            <CardFooter>
                <Button variant="destructive" onClick={() => onDelete?.(book.id)}><Trash2 /></Button>
            </CardFooter>
        </Card>
    );
}