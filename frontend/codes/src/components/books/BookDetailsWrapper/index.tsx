"use client"

import { useState } from "react"
import { Dialog } from "@/components/ui/dialog"
import { BookCardDialog } from "../BookCardDialog"
import { Book } from "@/types/book"

interface BookDetailsWrapperProps {
    book: Book
    children: React.ReactNode
}

export function BookDetailsWrapper({ book, children }: BookDetailsWrapperProps) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div onClick={() => setOpen(true)} className="h-full">
                {children}
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <BookCardDialog book={book} />
            </Dialog>
        </>
    )
}
