"use server"

import { revalidateTag } from "next/cache";

const API_URL = process.env.API_URL!

export async function deleteBookAction(id: number) {
    const response = await fetch(`${API_URL}/api/v1/books/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete book");
    }

    revalidateTag("books", "max");
}