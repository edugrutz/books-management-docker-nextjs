import { BooksResponse } from "@/types/book"

const API_URL = process.env.API_URL

export async function getBooks(page: number, pageSize: number): Promise<BooksResponse> {
    const res = await fetch(`${API_URL}/api/v1/books?page=${page}&page_size=${pageSize}`, {
        next: { tags: ["books"] },
    })

    if (!res.ok) {
        throw new Error("Erro ao buscar livros")
    }

    return res.json()
}

export async function searchBooks(
    params: { title?: string; author?: string; subject?: string; general?: string; pubdate?: string },
    page: number,
    pageSize: number
): Promise<BooksResponse> {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (!value) return
        const map: Record<string, string> = {
            author: "author_name",
            general: "q",
        }
        queryParams.set(map[key] ?? key, value)
    })
    queryParams.set("page", page.toString())
    queryParams.set("page_size", pageSize.toString())

    const res = await fetch(`${API_URL}/api/v1/books/search?${queryParams.toString()}`, {
        next: { tags: ["books"] },
    })

    if (!res.ok) {
        throw new Error("Erro ao buscar livros")
    }

    return res.json()
}