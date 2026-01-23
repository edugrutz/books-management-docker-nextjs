"use client";

import { useTranslation } from "react-i18next";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import "@/lib/i18n";

export function LanguageToggle() {
    const { i18n } = useTranslation();

    const handleLanguageChange = (value: string) => {
        if (value) {
            i18n.changeLanguage(value);
        }
    };

    return (
        <ToggleGroup
            type="single"
            value={i18n.language?.substring(0, 2) || "pt"}
            onValueChange={handleLanguageChange}
            variant="outline"
            className="p-2 bg-background"
        >
            <ToggleGroupItem value="pt" aria-label="Português" className="px-2 py-1 h-7 text-xs font-bold uppercase">
                PT
            </ToggleGroupItem>
            <ToggleGroupItem value="en" aria-label="English" className="px-2 py-1 h-7 text-xs font-bold uppercase">
                EN
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
