import { Outlet } from 'react-router-dom';
import { PublicFooter } from '@/components/layout/public-footer';
import { PublicNavbar } from '@/components/layout/public-navbar';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <PublicNavbar />
      <main id="conteudo" className="min-h-[calc(100vh-164px)]">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
