import { Book } from "@/types/book"

export async function getBooks(): Promise<Book[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/books`, {
        cache: "no-store",
    })

    if (!res.ok) {
        throw new Error("Erro ao buscar livros")
    }

    return res.json()
}