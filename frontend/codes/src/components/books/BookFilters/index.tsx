"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, User, Layers, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useBookFilters } from "@/hooks/useBookFilters";

interface BookFiltersProps {
    className?: string;
}

export function BookFilters({
    className
}: BookFiltersProps) {
    const t = useTranslations('filters');
    const { q, title: urlTitle, author: urlAuthor, setFilters } = useBookFilters();

    const [general, setGeneral] = useState(q);
    const [title, setTitle] = useState(urlTitle);
    const [author, setAuthor] = useState(urlAuthor);

    const debouncedGeneral = useDebounce(general, 500);
    const debouncedTitle = useDebounce(title, 500);
    const debouncedAuthor = useDebounce(author, 500);

    useEffect(() => {
        setFilters({
            q: debouncedGeneral,
            title: debouncedTitle,
            author_name: debouncedAuthor
        });
    }, [debouncedGeneral, debouncedTitle, debouncedAuthor]);

    useEffect(() => {
        setGeneral(q);
        setTitle(urlTitle);
        setAuthor(urlAuthor);
    }, [q, urlTitle, urlAuthor]);

    return (
        <div className={`flex flex-col gap-4 w-full ${className}`}>
            <div className="flex flex-col gap-1.5 w-full">
                <Label htmlFor="search-general" className="text-[10px] font-bold uppercase text-muted-foreground ml-1">
                    {t('general')}
                </Label>
                <div className="relative group">
                    <Layers className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
                    <Input
                        id="search-general"
                        placeholder={t('placeholder_general')}
                        value={general}
                        onChange={(e) => setGeneral(e.target.value)}
                        className="pl-10 pr-10 bg-secondary"
                    />
                    {general && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1 h-7 w-7 text-muted-foreground hover:text-foreground"
                            onClick={() => setGeneral("")}
                        >
                            <X size={14} />
                        </Button>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="search-title" className="text-[10px] font-bold uppercase text-muted-foreground ml-1">
                        {t('title')}
                    </Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
                        <Input
                            id="search-title"
                            placeholder={t('placeholder_title')}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="pl-10 pr-10 bg-secondary"
                        />
                        {title && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1 h-7 w-7 text-muted-foreground hover:text-foreground"
                                onClick={() => setTitle("")}
                            >
                                <X size={14} />
                            </Button>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="search-author" className="text-[10px] font-bold uppercase text-muted-foreground ml-1">
                        {t('author')}
                    </Label>
                    <div className="relative">
                        <User className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
                        <Input
                            id="search-author"
                            placeholder={t('placeholder_author')}
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="pl-10 pr-10 bg-secondary"
                        />
                        {author && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1 h-7 w-7 text-muted-foreground hover:text-foreground"
                                onClick={() => setAuthor("")}
                            >
                                <X size={14} />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
