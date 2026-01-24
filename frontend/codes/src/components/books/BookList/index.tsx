import { Book } from "@/types/book";
import { BookCard } from "@/components/books/BookCard";

interface BookListProps {
    initialBooks: Book[];
}

export function BookList({ initialBooks }: BookListProps) {
    if (!initialBooks || initialBooks.length === 0) {
        return (
            <div className="col-span-full text-center text-muted-foreground py-10">
                Nenhum livro encontrado.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {initialBooks
                .filter((book) => book.id !== null && book.id !== undefined)
                .map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                    />
                ))}
        </div>
    );
}
