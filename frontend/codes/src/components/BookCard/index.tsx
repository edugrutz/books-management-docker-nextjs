"use client"

import { Book } from "@/types/book";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Info, User, Calendar, Pencil } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import {
    Dialog,
} from "@/components/ui/dialog";
import { BookCardDialog } from "../BookCardDialog";
import { BookEditDialog } from "../BookEditDialog";

export function BookCard({ book, onDelete }: { book: Book, onDelete?: (id: number) => void }) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <>
            <Card
                className="flex flex-col justify-between cursor-pointer hover:bg-accent/5 transition-colors h-full group transition-all hover:shadow-lg hover:scale-[1.02]"
                onClick={() => setIsDetailsOpen(true)}
            >
                <CardHeader>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors flex items-start justify-between">
                        <span className="line-clamp-2">{book.title}</span>
                        <div className="flex gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-primary hover:text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsEditOpen(true);
                                }}
                            >
                                <Pencil size={16} />
                            </Button>

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
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground line-clamp-1 flex items-center gap-2"><User size={14} />{book.author}</p>
                    <p className="line-clamp-1 flex items-center gap-2"><Calendar size={14} />{formatDate(book.pubdate)}</p>
                </CardContent>
            </Card>

            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <BookCardDialog book={book} />
            </Dialog>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <BookEditDialog book={book} onSuccess={() => setIsEditOpen(false)} />
            </Dialog>
        </>
    );
}