"use client"

import { Book } from "@/types/book";
import { BookCard } from "@/components/BookCard";
import { BookCardSkeleton } from "@/components/BookCardSkeleton";
import { deleteBookAction } from "@/actions/delete-book";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface BookListProps {
    initialBooks: Book[];
}

export function BookList({ initialBooks }: BookListProps) {
    const [books, setBooks] = useState<Book[]>(initialBooks);
    const [isLoading, setIsLoading] = useState(false);
    const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
    const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const t_toast = useTranslations('toast');
    const t_confirm = useTranslations('confirm');

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
            toast.success(t_toast('book_deleted'));
            router.refresh();
        } catch (error) {
            console.error("Erro ao deletar livro:", error);
            toast.error(t_toast('error_deleting'));
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
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {books
                    .filter((book) => book.id !== null && book.id !== undefined)
                    .map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onDelete={(book) => setBookToDelete(book)}
                            isDeleting={deletingIds.has(book.id)}
                        />
                    ))}
            </div>

            <AlertDialog open={!!bookToDelete} onOpenChange={(open) => !open && setBookToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t_confirm('delete_title')}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {t_confirm('delete_description')}
                            {bookToDelete && (
                                <span className="block mt-2 font-medium text-foreground">
                                    "{bookToDelete.title}"
                                </span>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t_confirm('delete_cancel')}</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (bookToDelete) {
                                    handleDelete(bookToDelete.id);
                                    setBookToDelete(null);
                                }
                            }}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {t_confirm('delete_confirm')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
