import { Book } from "@/types/book"

type BooksResponse = {
    data: Book[]
    pagination: {
        page: number
        page_size: number
        total: number
        total_pages: number
    }
}

export async function getBooks(page: number, pageSize: number): Promise<BooksResponse> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/books?page=${page}&page_size=${pageSize}`, {
        cache: "no-store",
    })

    if (!res.ok) {
        throw new Error("Erro ao buscar livros")
    }

    return res.json()
}