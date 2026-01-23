export interface Book {
    id: number;
    title: string;
    author: string;
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