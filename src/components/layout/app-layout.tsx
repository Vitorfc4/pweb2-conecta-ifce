import { Outlet } from 'react-router-dom';
import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#conteudo-app" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <AppHeader />
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        <AppSidebar />
        <main id="conteudo-app" className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
