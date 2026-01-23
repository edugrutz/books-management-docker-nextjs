"use client";

import Link from "next/link";
import { Library } from "lucide-react";
import { CreateBookDialog } from "@/components/CreateBookDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";

export function Header() {
    const { t } = useTranslation();
    return (
        <header className="pt-12 px-14 flex justify-between">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-2">
                    <Library size={32} />
                    <h1 className="text-4xl font-bold">{t('header.title')}</h1>
                </div>
                <p className="text-muted-foreground text-lg">{t('header.description')}</p>
            </Link>
            <div className="flex justify-end items-center gap-4">
                <LanguageToggle />
                <ThemeToggle />
                <CreateBookDialog />
            </div>
        </header>
    );
}