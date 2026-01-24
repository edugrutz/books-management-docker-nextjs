import { Book } from "@/types/book";
import { BookCard } from "@/components/books/BookCard";
import React from "react";

interface BookListProps {
    books: Book[];
    headerSlot?: React.ReactNode;
    footerSlot?: React.ReactNode;
}

export function BookList({ books, headerSlot, footerSlot }: BookListProps) {
    if (!books || books.length === 0) {
        return (
            <div className="col-span-full text-center text-muted-foreground py-10">
                Nenhum livro encontrado.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {headerSlot}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {books
                    .filter((book) => book.id !== null && book.id !== undefined)
                    .map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                        />
                    ))}
            </div>
            {footerSlot}
        </div>
    );
}
