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
import { useTranslation } from "react-i18next";
import { updateBookAction } from "@/actions/update-book";
import { Pencil } from "lucide-react";
import { stripHtml } from "@/lib/utils";

interface BookEditDialogProps {
    book: Book;
    onSuccess?: () => void;
}

export function BookEditDialog({ book, onSuccess }: BookEditDialogProps) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: book.title,
        author: book.author,
        publisher: book.publisher || "",
        pubdate: book.pubdate || "",
        synopsis: stripHtml(book.synopsis),
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateBookAction(book.id, formData);
            onSuccess?.();
            window.dispatchEvent(new CustomEvent("book-created"));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <Pencil size={20} /> {t('book.edit_book_title')}
                </DialogTitle>
                <DialogDescription>
                    {t('book.edit_book_desc')}
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                    <Field>
                        <FieldLabel>{t('book.title_label')}</FieldLabel>
                        <FieldContent>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </FieldContent>
                    </Field>

                    <Field>
                        <FieldLabel>{t('book.author_label')}</FieldLabel>
                        <FieldContent>
                            <Input
                                value={formData.author}
                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                required
                            />
                        </FieldContent>
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel>{t('book.publisher')}</FieldLabel>
                            <FieldContent>
                                <Input
                                    value={formData.publisher}
                                    onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                                />
                            </FieldContent>
                        </Field>

                        <Field>
                            <FieldLabel>{t('book.pubdate')}</FieldLabel>
                            <FieldContent>
                                <Input
                                    value={formData.pubdate}
                                    onChange={(e) => setFormData({ ...formData, pubdate: e.target.value })}
                                />
                            </FieldContent>
                        </Field>
                    </div>

                    <Field>
                        <FieldLabel>{t('book.synopsis')}</FieldLabel>
                        <FieldContent>
                            <Textarea
                                value={formData.synopsis}
                                onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                                rows={5}
                            />
                        </FieldContent>
                    </Field>

                </div>
                <DialogFooter>
                    <Button type="submit" disabled={loading}>
                        {loading ? t('actions.saving') : t('actions.save')}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
