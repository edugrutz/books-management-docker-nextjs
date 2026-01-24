"use client"

import { Book } from "@/types/book";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, User, Calendar, Pencil, BookOpen, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import {
    Dialog,
} from "@/components/ui/dialog";
import { BookCardDialog } from "../BookCardDialog";
import { BookEditDialog } from "../BookEditDialog";
import { useTranslations } from "next-intl";

export function BookCard({
    book,
    onDelete,
    isDeleting = false
}: {
    book: Book;
    onDelete?: (id: number) => void;
    isDeleting?: boolean;
}) {
    const t = useTranslations('book');
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <>
            <Card
                className={`flex flex-col justify-between cursor-pointer hover:bg-accent/5 transition-colors h-full group transition-all hover:shadow-lg hover:scale-[1.02] ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() => !isDeleting && setIsDetailsOpen(true)}
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
                                disabled={isDeleting}
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
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <Trash2 size={16} />
                                )}
                            </Button>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground line-clamp-1 flex items-center gap-2 font-medium bg-muted/20 p-2 rounded-md mb-2">
                        <User size={14} className="text-primary" /> {book.author}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                        <Calendar size={14} />
                        <span>{formatDate(book.pubdate)}</span>
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-end border-t border-muted/20 pt-4 mt-auto">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground px-2 py-1 bg-secondary rounded-full">
                        <BookOpen size={14} />
                        <span>{book.pages} {t('pages')}</span>
                    </div>
                </CardFooter>
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