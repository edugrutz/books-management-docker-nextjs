"use server"

import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL!

export async function updateBookAction(id: number, data: any) {
    const response = await fetch(`${API_URL}/api/v1/books/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to update book");
    }

    revalidatePath("/");
}
