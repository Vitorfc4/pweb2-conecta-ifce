import { Bell, Search } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { useAuthStore } from '@/features/auth/auth.store';
import { getInitials } from '@/lib/utils';

export function AppHeader() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <div className="flex-1">
          <div className="flex h-12 max-w-xl items-center gap-3 rounded-2xl border border-border bg-muted/60 px-4 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            Busque por pessoas, grupos ou publicações...
          </div>
        </div>
        <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border text-muted-foreground">
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-white px-3 py-2">
          <Avatar initials={getInitials(user.name)} className="h-10 w-10" />
          <div className="hidden sm:block">
            <div className="text-sm font-bold">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
