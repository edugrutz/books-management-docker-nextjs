"use server"

import { revalidateTag } from "next/cache"

const API_URL = process.env.NEXT_PUBLIC_API_URL!

export async function createBookAction(formData: FormData) {
    const title = formData.get("title") as string
    const author = formData.get("author") as string
    const author_bio = formData.get("author_bio") as string
    const publisher = formData.get("publisher") as string
    const synopsis = formData.get("synopsis") as string
    const pages = formData.get("pages") as string
    const pubdate = formData.get("pubdate") as string

    const payload = {
        title,
        author,
        author_slug: author.toLowerCase().replace(/\s+/g, "-"),
        author_bio: author_bio || "",
        authors: author,
        publisher: publisher || "",
        synopsis: synopsis || "",
        pubdate: pubdate || "",
        pages: pages ? parseInt(pages) : 0,
    }

    const res = await fetch(`${API_URL}/api/v1/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        const errorMessage = errorData.meta?.error || "Erro ao criar livro"
        throw new Error(errorMessage)
    }

    revalidateTag("books", "max")
}
