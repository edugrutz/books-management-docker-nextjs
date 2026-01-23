"use client"

import { Book } from "@/types/book";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Info, User, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog";
import { BookCardDialog } from "../BookCardDialog";

export function BookCard({ book, onDelete }: { book: Book, onDelete?: (id: number) => void }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="flex flex-col justify-between cursor-pointer hover:bg-accent/5 transition-colors h-full group cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]">
                    <CardHeader>
                        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors flex items-start justify-between">
                            <span className="line-clamp-2">{book.title}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-destructive hover:text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete?.(book.id);
                                }}
                            >
                                <Trash2 size={16} />
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground line-clamp-1 flex items-center gap-2"><User size={14} />{book.author}</p>
                        <p className="line-clamp-1 flex items-center gap-2"><Calendar size={14} />{formatDate(book.pubdate)}</p>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <BookCardDialog book={book} />
        </Dialog >
    );
}