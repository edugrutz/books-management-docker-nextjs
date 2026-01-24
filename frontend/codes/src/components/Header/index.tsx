import Link from "next/link";
import { Library } from "lucide-react";
import { CreateBookDialog } from "@/components/CreateBookDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { getTranslations } from "next-intl/server";

export async function Header() {
    const t = await getTranslations('header');

    return (
        <header className="pt-8 md:pt-12 px-4 md:px-14 flex flex-col sm:flex-row justify-between gap-4 md:gap-0">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-2">
                    <Library size={32} className="shrink-0" />
                    <h1 className="text-2xl md:text-4xl font-bold pb-1">{t('title')}</h1>
                </div>
                <p className="text-muted-foreground text-sm md:text-lg">{t('description')}</p>
            </Link>
            <div className="flex justify-end items-center gap-2 md:gap-4 shrink-0">
                <LanguageToggle />
                <ThemeToggle />
                <CreateBookDialog />
            </div>
        </header>
    );
}