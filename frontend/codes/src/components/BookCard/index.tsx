"use client"

import { Book } from "@/types/book";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Info, User } from "lucide-react";
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog";
import { BookCardDialog } from "../BookCardDialog";

export function BookCard({ book, onDelete }: { book: Book, onDelete?: (id: number) => void }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="flex flex-col justify-between cursor-pointer hover:bg-accent/5 transition-colors h-full group">
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
                    </CardContent>
                    <CardFooter className="flex justify-between items-center mt-auto">
                        <div className="text-xs text-muted-foreground flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                            <Info size={14} /> Clique para detalhes
                        </div>
                    </CardFooter>
                </Card>
            </DialogTrigger>
            <BookCardDialog book={book} />
        </Dialog>
    );
}