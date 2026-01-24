"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export function LanguageToggle() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLanguageChange = (value: string) => {
        if (value && value !== locale) {
            router.replace(pathname, { locale: value as any });
        }
    };

    return (
        <ToggleGroup
            type="single"
            value={locale}
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
