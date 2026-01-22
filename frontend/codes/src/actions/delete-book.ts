"use server"

import { revalidatePath } from "next/cache";

export async function deleteBookAction(id: number) {
    const response = await fetch(`${process.env.API_URL}/api/v1/books/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete book");
    }

    revalidatePath("/");
}