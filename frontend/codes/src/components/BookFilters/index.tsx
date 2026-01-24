"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, User, Layers, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface BookFiltersProps {
    general: string;
    title: string;
    author: string;
    onGeneralChange: (value: string) => void;
    onTitleChange: (value: string) => void;
    onAuthorChange: (value: string) => void;
    className?: string;
}

export function BookFilters({
    general,
    title,
    author,
    onGeneralChange,
    onTitleChange,
    onAuthorChange,
    className
}: BookFiltersProps) {
    const { t } = useTranslation();

    return (
        <div className={`flex flex-col gap-4 w-full ${className}`}>
            <div className="flex flex-col gap-1.5 w-full">
                <Label htmlFor="search-general" className="text-[10px] font-bold uppercase text-muted-foreground ml-1">
                    {t('filters.general')}
                </Label>
                <div className="relative group">
                    <Layers className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
                    <Input
                        id="search-general"
                        placeholder={t('filters.placeholder_general')}
                        value={general}
                        onChange={(e) => onGeneralChange(e.target.value)}
                        className="pl-10 pr-10 bg-secondary"
                    />
                    {general && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1 h-7 w-7 text-muted-foreground hover:text-foreground"
                            onClick={() => onGeneralChange("")}
                        >
                            <X size={14} />
                        </Button>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="search-title" className="text-[10px] font-bold uppercase text-muted-foreground ml-1">
                        {t('filters.title')}
                    </Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
                        <Input
                            id="search-title"
                            placeholder={t('filters.placeholder_title')}
                            value={title}
                            onChange={(e) => onTitleChange(e.target.value)}
                            className="pl-10 pr-10 bg-secondary"
                        />
                        {title && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1 h-7 w-7 text-muted-foreground hover:text-foreground"
                                onClick={() => onTitleChange("")}
                            >
                                <X size={14} />
                            </Button>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="search-author" className="text-[10px] font-bold uppercase text-muted-foreground ml-1">
                        {t('filters.author')}
                    </Label>
                    <div className="relative">
                        <User className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
                        <Input
                            id="search-author"
                            placeholder={t('filters.placeholder_author')}
                            value={author}
                            onChange={(e) => onAuthorChange(e.target.value)}
                            className="pl-10 pr-10 bg-secondary"
                        />
                        {author && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1 h-7 w-7 text-muted-foreground hover:text-foreground"
                                onClick={() => onAuthorChange("")}
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
