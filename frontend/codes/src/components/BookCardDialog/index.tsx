"use client"

import { BookCardDialogProps } from "./types";
import { Info, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export function BookCardDialog({ book }: BookCardDialogProps) {
    return (
        <DialogContent className="sm:max-w-4xl max-w-[95vw] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold tracking-tight">{book.title}</DialogTitle>
                <DialogDescription className="text-lg font-medium text-primary/80">
                    {book.author}
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
                {(book.publisher || book.pubdate || (book.authors && book.authors.trim() !== book.author.trim())) && (
                    <div className="grid gap-4 bg-muted/30 p-4 rounded-lg sm:grid-cols-3 grid-cols-1">
                        {book.publisher && (
                            <div>
                                <h4 className="text-xs uppercase font-bold text-muted-foreground mb-1">Editora</h4>
                                <p className="text-sm font-medium">{book.publisher}</p>
                            </div>
                        )}
                        {book.pubdate && (
                            <div>
                                <h4 className="text-xs uppercase font-bold text-muted-foreground mb-1">Publicação</h4>
                                <p className="text-sm font-medium">{formatDate(book.pubdate)}</p>
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
    );
}
