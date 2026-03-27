import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Image, Link as LinkIcon, X } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import type { CreatePostPayload } from '@/types';

interface ComposerCardProps {
  initials: string;
  onPublish: (payload: CreatePostPayload) => Promise<void>;
}

export function ComposerCard({ initials, onPublish }: ComposerCardProps) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const previewUrl = useMemo(() => {
    if (!image) {
      return '';
    }
    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  async function handlePublish() {
    const value = content.trim();
    if (!value) {
      setFormError('Escreva algo antes de publicar.');
      return;
    }

    setSubmitting(true);
    setFormError('');

    try {
      await onPublish({ content: value, image });
      setContent('');
      setImage(null);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Não foi possível publicar agora.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="p-5">
      <div className="flex items-start gap-4">
        <Avatar initials={initials} />
        <div className="min-w-0 flex-1 space-y-4">
          <Textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="O que você gostaria de compartilhar hoje?"
            aria-label="Escreva sua publicação"
          />

          {previewUrl ? (
            <div className="relative overflow-hidden rounded-3xl border border-border bg-white">
              <img src={previewUrl} alt="Prévia da imagem do post" className="max-h-72 w-full object-cover" />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/75 text-white"
                aria-label="Remover imagem selecionada"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : null}

          {formError ? (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" aria-live="polite">
              {formError}
            </p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-muted px-3 py-2 transition hover:bg-slate-200">
                <Image className="h-4 w-4" /> Foto
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(event) => setImage(event.target.files?.[0] ?? null)}
                />
              </label>
              <span className="inline-flex items-center gap-2 rounded-2xl bg-muted px-3 py-2">
                <LinkIcon className="h-4 w-4" /> Link
              </span>
              <span className="inline-flex items-center gap-2 rounded-2xl bg-muted px-3 py-2">
                <CalendarDays className="h-4 w-4" /> Evento
              </span>
            </div>
            <Button onClick={handlePublish} disabled={submitting || !content.trim()}>
              {submitting ? 'Publicando...' : 'Publicar'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
