import { Book } from "@/types/book";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { User, Calendar, BookOpen } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { DeleteBookConfirm } from "@/components/books/DeleteBookConfirm";
import { EditBookButton } from "@/components/books/EditBookButton";
import { BookDetailsWrapper } from "@/components/books/BookDetailsWrapper";

export async function BookCard({
    book
}: {
    book: Book;
}) {
    const t = await getTranslations('book');

    return (
        <BookDetailsWrapper book={book}>
            <Card
                className="flex flex-col justify-between cursor-pointer hover:bg-accent/5 h-full group transition-all hover:shadow-lg hover:scale-[1.02]"
            >
                <CardHeader>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors flex items-start justify-between">
                        <span className="line-clamp-2">{book.title}</span>
                        <div className="flex gap-1">
                            <EditBookButton book={book} />
                            <DeleteBookConfirm bookId={book.id} bookTitle={book.title} />
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground flex items-center gap-2 font-medium mb-1">
                        <User size={14} className="text-primary shrink-0" />
                        <span className="truncate">{book.author}</span>
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                        <Calendar size={14} />
                        <span>{formatDate(book.pubdate)}</span>
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-end border-t border-muted/20 pt-4 mt-auto">
                    {book.pages && book.pages > 0 && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground px-2 py-1 bg-secondary rounded-full">
                            <BookOpen size={14} />
                            <span>{book.pages} {t('pages')}</span>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </BookDetailsWrapper>
    );
}