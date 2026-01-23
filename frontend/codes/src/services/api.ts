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

export async function searchBooks(
    params: { title?: string; author?: string; subject?: string },
    page: number,
    pageSize: number
): Promise<BooksResponse> {
    const queryParams = new URLSearchParams()
    if (params.title) queryParams.set("title", params.title)
    if (params.author) queryParams.set("author_name", params.author)
    if (params.subject) queryParams.set("subject", params.subject)
    queryParams.set("page", page.toString())
    queryParams.set("page_size", pageSize.toString())

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/books/search?${queryParams.toString()}`, {
        cache: "no-store",
    })

    if (!res.ok) {
        throw new Error("Erro ao buscar livros")
    }

    return res.json()
}