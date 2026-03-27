import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-3xl px-6 py-16 lg:px-8">
      <Card className="w-full p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">404</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Página não encontrada</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          A rota que você tentou acessar não existe ou foi movida.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-2xl bg-brand-500 px-5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-600"
        >
          Voltar para o início
        </Link>
      </Card>
    </div>
  );
}
