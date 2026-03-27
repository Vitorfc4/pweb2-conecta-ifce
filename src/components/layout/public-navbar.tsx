import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/auth.store';
import { Logo } from '@/components/common/logo';

export function PublicNavbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const itemClass = 'text-sm font-medium text-muted-foreground transition hover:text-foreground';

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          <Link to="/" className={itemClass}>
            Início
          </Link>

          {isHome ? (
            <>
              <a href="#recursos" className={itemClass}>
                Recursos
              </a>
              <a href="#comunidade" className={itemClass}>
                Comunidade
              </a>
              <a href="#faq" className={itemClass}>
                FAQ
              </a>
            </>
          ) : (
            <>
              <a href="/#recursos" className={itemClass}>
                Recursos
              </a>
              <a href="/#comunidade" className={itemClass}>
                Comunidade
              </a>
              <a href="/#faq" className={itemClass}>
                FAQ
              </a>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Link
              to="/app/feed"
              className="hidden h-11 items-center rounded-2xl border border-border bg-white px-5 text-sm font-semibold text-foreground transition hover:bg-muted sm:inline-flex"
            >
              Ir para o feed
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden h-11 items-center rounded-2xl px-4 text-sm font-semibold text-foreground transition hover:bg-muted sm:inline-flex"
              >
                Entrar
              </Link>
              <Link
                to="/cadastro"
                className="inline-flex h-11 items-center rounded-2xl bg-brand-500 px-5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-600"
              >
                Criar conta
              </Link>
            </>
          )}

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border text-muted-foreground lg:hidden"
            aria-label="Abrir menu"
            type="button"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
