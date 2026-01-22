"use server"

import { revalidatePath } from "next/cache"

const API_URL = process.env.NEXT_PUBLIC_API_URL!

export async function createBookAction(formData: FormData) {
    const title = formData.get("title") as string
    const author = formData.get("author") as string

    const payload = {
        title,
        author,
        author_slug: author.toLowerCase().replace(/\s+/g, "-"),
        author_bio: "",
        authors: author,
        publisher: "",
        synopsis: "",
    }

    const res = await fetch(`${API_URL}/api/v1/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })

    if (!res.ok) {
        throw new Error("Erro ao criar livro")
    }

    revalidatePath("/")
}
