import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { BookFilters } from "@/types/filters";

export function useBookFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const setFilters = (filters: BookFilters) => {
        const params = new URLSearchParams(searchParams);

        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });

        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
    };

    return {
        q: searchParams.get("q") || "",
        title: searchParams.get("title") || "",
        author: searchParams.get("author_name") || "",
        setFilters,
    };
}
