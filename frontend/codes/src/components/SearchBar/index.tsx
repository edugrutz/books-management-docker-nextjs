import { Input } from "../ui/input";

export function SearchBar({ onSearch }: { onSearch: (title: string) => void }) {
    return (
        <Input placeholder="Search..." onChange={(e) => onSearch(e.target.value)} />
    );
}