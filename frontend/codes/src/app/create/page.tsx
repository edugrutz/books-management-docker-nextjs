import { createBookAction } from "@/actions/create-book"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CreatePage() {
    return (
        <main className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Criar livro</h1>

            <form action={createBookAction} className="space-y-4">
                <div>
                    <Label htmlFor="title">Título</Label>
                    <Input id="title" name="title" required />
                </div>

                <div>
                    <Label htmlFor="author">Autor</Label>
                    <Input id="author" name="author" required />
                </div>

                <Button type="submit" variant="outline">Criar</Button>
            </form>
        </main>
    )
}
