import Link from "next/link";

export function Header() {
    return (
        <header className="p-8 border-b">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
                <h1 className="text-2xl font-bold">Books Management</h1>
                <p className="text-muted-foreground">Manage your books here</p>
            </Link>
        </header>
    );
}