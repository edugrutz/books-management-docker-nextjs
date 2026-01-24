"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { BookEditDialog } from "../BookEditDialog"
import { EditBookButtonProps } from "./types"

export function EditBookButton({ book }: EditBookButtonProps) {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-primary hover:text-white"
                    aria-label="Editar"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Pencil size={16} />
                </Button>
            </DialogTrigger>
            <BookEditDialog book={book} onSuccess={() => setOpen(false)} />
        </Dialog>
    )
}
