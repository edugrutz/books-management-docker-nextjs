import { createBookAction } from "@/actions/create-book"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function CreatePage() {
    return (
        <main className="p-6 max-w-2xl mx-auto border rounded-md my-12 shadow">
            <h1 className="text-2xl font-bold mb-4">Criar livro</h1>

            <form action={createBookAction} className="space-y-4">
                <div>
                    <Label htmlFor="title">Título *</Label>
                    <Input id="title" name="title" required />
                </div>

                <div>
                    <Label htmlFor="author">Autor *</Label>
                    <Input id="author" name="author" required />
                </div>

                <div>
                    <Label htmlFor="author_bio">Biografia do Autor</Label>
                    <Textarea id="author_bio" name="author_bio" placeholder="Informações sobre o autor..." />
                </div>

                <div>
                    <Label htmlFor="publisher">Editora</Label>
                    <Input id="publisher" name="publisher" placeholder="Nome da editora" />
                </div>

                <div>
                    <Label htmlFor="synopsis">Sinopse</Label>
                    <Textarea id="synopsis" name="synopsis" placeholder="Resumo do livro..." rows={5} />
                </div>

                <Button type="submit" variant="outline">Criar</Button>
            </form>
        </main>
    )
}
