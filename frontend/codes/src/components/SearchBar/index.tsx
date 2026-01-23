import { Input } from "../ui/input";

export function SearchBar({ onSearch, placeholder }: { onSearch: (title: string) => void, placeholder: string }) {
    return (
        <Input placeholder={placeholder} onChange={(e) => onSearch(e.target.value)} />
    );
}