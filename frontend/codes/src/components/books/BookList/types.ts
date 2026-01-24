import { Book } from "@/types/book";

export interface BookListProps {
    books: Book[];
    headerSlot?: React.ReactNode;
    footerSlot?: React.ReactNode;
}