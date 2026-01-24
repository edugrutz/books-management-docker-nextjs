"use client"

import { Book } from "@/types/book";
import { BookCard } from "@/components/BookCard";
import { deleteBookAction } from "@/actions/delete-book";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface BookListProps {
    initialBooks: Book[];
}

export function BookList({ initialBooks }: BookListProps) {
    const [books, setBooks] = useState<Book[]>(initialBooks);
    const router = useRouter();

    useEffect(() => {
        setBooks(initialBooks);
    }, [initialBooks]);

    const handleDelete = async (id: number) => {
        setBooks(prev => prev.filter(book => book.id !== id));

        try {
            await deleteBookAction(id);
            router.refresh();
        } catch (error) {
            console.error("Erro ao deletar livro:", error);
            router.refresh();
        }
    };

    if (!books || books.length === 0) {
        return (
            <div className="col-span-full text-center text-muted-foreground py-10">
                Nenhum livro encontrado.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {books.map((book) => (
                <BookCard key={book.id} book={book} onDelete={() => handleDelete(book.id)} />
            ))}
        </div>
    );
}
