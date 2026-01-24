"use client"

import { Book } from "@/types/book";
import { BookCard } from "@/components/BookCard";
import { BookCardSkeleton } from "@/components/BookCardSkeleton";
import { deleteBookAction } from "@/actions/delete-book";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface BookListProps {
    initialBooks: Book[];
}

export function BookList({ initialBooks }: BookListProps) {
    const [books, setBooks] = useState<Book[]>(initialBooks);
    const [isLoading, setIsLoading] = useState(false);
    const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setBooks(initialBooks);
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [initialBooks, searchParams]);

    const handleDelete = async (id: number) => {
        setDeletingIds(prev => new Set(prev).add(id));
        setBooks(prev => prev.filter(book => book.id !== id));

        try {
            await deleteBookAction(id);
            router.refresh();
        } catch (error) {
            console.error("Erro ao deletar livro:", error);
            router.refresh();
        } finally {
            setDeletingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                    <BookCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (!books || books.length === 0) {
        return (
            <div className="col-span-full text-center text-muted-foreground py-10">
                Nenhum livro encontrado.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {books
                .filter((book) => book.id !== null && book.id !== undefined)
                .map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                        onDelete={() => handleDelete(book.id)}
                        isDeleting={deletingIds.has(book.id)}
                    />
                ))}
        </div>
    );
}
