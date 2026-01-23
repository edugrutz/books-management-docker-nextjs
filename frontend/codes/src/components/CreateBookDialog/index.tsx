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

export function CreateBookDialog() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        try {
            await createBookAction(formData)
            setOpen(false)
        } catch (e) {
            setError(e instanceof Error ? e.message : "Erro ao criar livro")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" size="lg">
                    <BookPlus className="mr-2 h-5 w-5" /> Add Book
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Criar novo livro</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para adicionar um novo livro à sua biblioteca.
                    </DialogDescription>
                </DialogHeader>

                <form action={handleSubmit} className="space-y-4 py-4">
                    {error && (
                        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md border border-destructive/20">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Título *</Label>
                            <Input id="title" name="title" placeholder="Ex: O Pequeno Príncipe" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="author">Autor *</Label>
                            <Input id="author" name="author" placeholder="Ex: Antoine de Saint-Exupéry" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="author_bio">Biografia do Autor</Label>
                        <Textarea id="author_bio" name="author_bio" placeholder="Breve resumo sobre o autor..." className="min-h-[80px]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="pubdate">Data de publicação *</Label>
                            <Input
                                id="pubdate"
                                name="pubdate"
                                type="date"
                                max={new Date().toISOString().split("T")[0]}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="publisher">Editora</Label>
                            <Input id="publisher" name="publisher" placeholder="Nome da editora" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="synopsis">Sinopse</Label>
                        <Textarea id="synopsis" name="synopsis" placeholder="Resumo do livro..." rows={5} className="min-h-[120px]" />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Criando...
                                </>
                            ) : (
                                "Criar Livro"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
