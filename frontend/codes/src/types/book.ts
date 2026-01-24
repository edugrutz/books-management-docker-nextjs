export interface Book {
    id: number;
    title: string;
    author: string;
    synopsis?: string;
    biography?: string;
    authors?: string;
    publisher?: string;
    pubdate?: string;
    pages?: number;
}

export type BooksResponse = {
    data: Book[]
    meta: {
        pagination: {
            page: number
            page_size: number
            total: number
            total_pages: number
        }
    }
}