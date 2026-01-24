"use client"

import { useState } from "react"
import { createBookAction } from "@/actions/create-book"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { BookPlus, Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

export function CreateBookDialog() {
    const t_actions = useTranslations('actions')
    const t_book = useTranslations('book')
    const t_filters = useTranslations('filters')
    const t_toast = useTranslations('toast')

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        try {
            await createBookAction(formData)
            toast.success(t_toast('book_created'))
            setOpen(false)
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : t_toast('error_creating')
            toast.error(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" size="lg">
                    <BookPlus className="mr-2 h-5 w-5" /> {t_actions('create_book')}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{t_book('new_book_title')}</DialogTitle>
                    <DialogDescription>
                        {t_book('new_book_desc')}
                    </DialogDescription>
                </DialogHeader>

                <form action={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">{t_book('title_label')} *</Label>
                            <Input id="title" name="title" placeholder={t_filters('placeholder_title')} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="author">{t_book('author_label')} *</Label>
                            <Input id="author" name="author" placeholder={t_filters('placeholder_author')} required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="author_bio">{t_book('author_bio')}</Label>
                        <Textarea id="author_bio" name="author_bio" placeholder="..." className="min-h-[80px]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="pubdate">{t_book('pubdate')} *</Label>
                            <Input
                                id="pubdate"
                                name="pubdate"
                                type="date"
                                max={new Date().toISOString().split("T")[0]}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="publisher">{t_book('publisher')}</Label>
                            <Input id="publisher" name="publisher" placeholder="..." />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="pages">{t_book('pages')}</Label>
                            <Input
                                id="pages"
                                name="pages"
                                type="number"
                                inputMode="numeric"
                                placeholder="0"
                                min="0"
                                max="1000000"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="synopsis">{t_book('synopsis')}</Label>
                        <Textarea id="synopsis" name="synopsis" placeholder="..." rows={5} className="min-h-[120px]" />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                            {t_actions('cancel')}
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {t_actions('creating')}
                                </>
                            ) : (
                                t_actions('create')
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
