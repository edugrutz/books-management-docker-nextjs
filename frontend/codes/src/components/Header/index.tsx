import Link from "next/link";
import { Library } from "lucide-react";

export function Header() {
    return (
        <header className="p-8">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-2">
                    <Library size={32} />
                    <h1 className="text-4xl font-bold">Biblioteca Digital</h1>
                </div>
                <p className="text-muted-foreground text-lg">Gerencie sua coleção de livros</p>
            </Link>
        </header>
    );
}