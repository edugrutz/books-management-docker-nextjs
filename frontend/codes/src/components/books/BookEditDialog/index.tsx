"use client"

import { useState } from "react";
import { Book } from "@/types/book";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldContent } from "@/components/ui/field";
import { useTranslations } from "next-intl";
import { updateBookAction } from "@/actions/update-book";
import { Pencil, Loader2 } from "lucide-react";
import { stripHtml } from "@/lib/utils";
import { toast } from "sonner";

interface BookEditDialogProps {
    book: Book;
    onSuccess?: () => void;
}

export function BookEditDialog({ book, onSuccess }: BookEditDialogProps) {
    const t_book = useTranslations('book');
    const t_actions = useTranslations('actions');
    const t_toast = useTranslations('toast');

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: book.title,
        author: book.author,
        publisher: book.publisher || "",
        pubdate: book.pubdate || "",
        synopsis: stripHtml(book.synopsis),
        pages: book.pages || 0,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateBookAction(book.id, formData);
            toast.success(t_toast('book_updated'));
            onSuccess?.();
        } catch (error) {
            console.error(error);
            toast.error(t_toast('error_updating'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <Pencil size={20} /> {t_book('edit_book_title')}
                </DialogTitle>
                <DialogDescription>
                    {t_book('edit_book_desc')}
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                    <Field>
                        <FieldLabel>{t_book('title_label')}</FieldLabel>
                        <FieldContent>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                disabled={loading}
                            />
                        </FieldContent>
                    </Field>

                    <Field>
                        <FieldLabel>{t_book('author_label')}</FieldLabel>
                        <FieldContent>
                            <Input
                                value={formData.author}
                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                required
                                disabled={loading}
                            />
                        </FieldContent>
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel>{t_book('publisher')}</FieldLabel>
                            <FieldContent>
                                <Input
                                    value={formData.publisher}
                                    onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                                    disabled={loading}
                                />
                            </FieldContent>
                        </Field>

                        <Field>
                            <FieldLabel>{t_book('pubdate')}</FieldLabel>
                            <FieldContent>
                                <Input
                                    value={formData.pubdate}
                                    onChange={(e) => setFormData({ ...formData, pubdate: e.target.value })}
                                    disabled={loading}
                                />
                            </FieldContent>
                        </Field>

                        <Field>
                            <FieldLabel>{t_book('pages')}</FieldLabel>
                            <FieldContent>
                                <Input
                                    type="number"
                                    value={formData.pages}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value) || 0;
                                        setFormData({ ...formData, pages: Math.min(val, 1000000) });
                                    }}
                                    min="0"
                                    max="1000000"
                                    disabled={loading}
                                />
                            </FieldContent>
                        </Field>
                    </div>

                    <Field>
                        <FieldLabel>{t_book('synopsis')}</FieldLabel>
                        <FieldContent>
                            <Textarea
                                value={formData.synopsis}
                                onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                                rows={5}
                                disabled={loading}
                            />
                        </FieldContent>
                    </Field>

                </div>
                <DialogFooter>
                    <Button type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {t_actions('saving')}
                            </>
                        ) : (
                            t_actions('save')
                        )}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
