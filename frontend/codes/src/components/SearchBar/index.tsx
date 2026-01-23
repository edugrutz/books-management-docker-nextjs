import { Input } from "../ui/input";
import { Search } from "lucide-react";

export function SearchBar({ onSearch, placeholder, className }: { onSearch: (title: string) => void, placeholder: string, className?: string }) {

    return (
        <div className={`relative w-full ${className}`}>
            <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
            <Input placeholder={placeholder} onChange={(e) => onSearch(e.target.value)} className="pl-10 bg-secondary" />
        </div>
    );
}