"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, User, Layers } from "lucide-react";

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
    return (
        <div className={`flex flex-col gap-4 w-full ${className}`}>
            <div className="flex flex-col gap-1.5 w-full">
                <Label htmlFor="search-general" className="text-[10px] font-bold uppercase text-muted-foreground ml-1">
                    Busca geral
                </Label>
                <div className="relative">
                    <Layers className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
                    <Input
                        id="search-general"
                        placeholder="General Search"
                        value={general}
                        onChange={(e) => onGeneralChange(e.target.value)}
                        className="pl-10 bg-secondary"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="search-title" className="text-[10px] font-bold uppercase text-muted-foreground ml-1">
                        Busca por título
                    </Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
                        <Input
                            id="search-title"
                            placeholder="Search by title"
                            value={title}
                            onChange={(e) => onTitleChange(e.target.value)}
                            className="pl-10 bg-secondary"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="search-author" className="text-[10px] font-bold uppercase text-muted-foreground ml-1">
                        Busca por autor
                    </Label>
                    <div className="relative">
                        <User className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
                        <Input
                            id="search-author"
                            placeholder="Search by author"
                            value={author}
                            onChange={(e) => onAuthorChange(e.target.value)}
                            className="pl-10 bg-secondary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
