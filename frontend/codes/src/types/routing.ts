export interface HomeProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{
        page?: string;
        page_size?: string;
        q?: string;
        title?: string;
        author_name?: string;
    }>;
}