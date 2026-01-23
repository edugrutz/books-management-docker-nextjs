import { Book } from "@/types/book"
import { BooksResponse } from "@/types/book"

export async function getBooks(page: number, pageSize: number): Promise<BooksResponse> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/books?page=${page}&page_size=${pageSize}`, {
        cache: "no-store",
    })

    if (!res.ok) {
        throw new Error("Erro ao buscar livros")
    }

    return res.json()
}

export async function searchBooks(title: string, page: number, pageSize: number): Promise<BooksResponse> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/books/search?title=${title}&page=${page}&page_size=${pageSize}`, {
        cache: "no-store",
    })

    if (!res.ok) {
        throw new Error("Erro ao buscar livros")
    }

    return res.json()
}
