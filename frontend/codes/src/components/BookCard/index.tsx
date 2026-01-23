"use client"

import { Book } from "@/types/book";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Info } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function BookCard({ book, onDelete }: { book: Book, onDelete?: (id: number) => void }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="flex flex-col justify-between cursor-pointer hover:bg-accent/5 transition-colors h-full group">
                    <CardHeader>
                        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">{book.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground line-clamp-1">{book.author}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center mt-auto">
                        <div className="text-xs text-muted-foreground flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                            <Info size={14} /> Clique para detalhes
                        </div>
                        <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete?.(book.id);
                            }}
                        >
                            <Trash2 size={16} />
                        </Button>
                    </CardFooter>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl max-w-[95vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold tracking-tight">{book.title}</DialogTitle>
                    <DialogDescription className="text-lg font-medium text-primary/80">
                        {book.author}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    {(book.publisher || (book.authors && book.authors.trim() !== book.author.trim())) && (
                        <div className={`grid gap-4 bg-muted/30 p-4 rounded-lg ${book.publisher && (book.authors && book.authors.trim() !== book.author.trim())
                            ? "grid-cols-2"
                            : "grid-cols-1"
                            }`}>
                            {book.publisher && (
                                <div>
                                    <h4 className="text-xs uppercase font-bold text-muted-foreground mb-1">Editora</h4>
                                    <p className="text-sm font-medium">{book.publisher}</p>
                                </div>
                            )}
                            {book.authors && book.authors.trim() !== book.author.trim() && (
                                <div>
                                    <h4 className="text-xs uppercase font-bold text-muted-foreground mb-1">Outros Autores</h4>
                                    <p className="text-sm font-medium">{book.authors}</p>
                                </div>
                            )}
                        </div>
                    )}
                    {book.synopsis && (
                        <div>
                            <h4 className="flex items-center gap-2 text-sm font-semibold mb-2 border-b pb-1">
                                <Info size={16} className="text-primary" /> Sinopse
                            </h4>
                            <div
                                className="text-sm text-muted-foreground leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: book.synopsis }}
                            />
                        </div>
                    )}
                    {book.biography && (
                        <div className="mt-2">
                            <h4 className="text-sm font-semibold mb-2 border-b pb-1">Sobre o Autor</h4>
                            <div className="relative">
                                <span className="absolute -left-2 top-0 text-3xl text-primary/20 leading-none">"</span>
                                <div
                                    className="text-sm text-muted-foreground italic pl-4 pr-2"
                                    dangerouslySetInnerHTML={{ __html: book.biography }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}