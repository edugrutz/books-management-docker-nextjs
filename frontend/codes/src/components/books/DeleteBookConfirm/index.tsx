"use client"

import { useState } from "react"
import { Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteBookAction } from "@/actions/delete-book"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { DeleteBookConfirmProps } from "./types"

export function DeleteBookConfirm({ bookId, bookTitle }: DeleteBookConfirmProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const t_toast = useTranslations('toast')
    const t_confirm = useTranslations('confirm')
    const t_actions = useTranslations('actions')

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await deleteBookAction(bookId)
            toast.success(t_toast('book_deleted'))
        } catch (error) {
            console.error("Erro ao deletar livro:", error)
            toast.error(t_toast('error_deleting'))
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-destructive hover:text-white"
                    disabled={isDeleting}
                    aria-label={t_actions('delete')}
                    onClick={(e) => e.stopPropagation()}
                >
                    {isDeleting ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <Trash2 size={16} />
                    )}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t_confirm('delete_title')}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {t_confirm('delete_description')}
                        <span className="block mt-2 font-medium text-foreground">
                            "{bookTitle}"
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{t_confirm('delete_cancel')}</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {t_confirm('delete_confirm')}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
