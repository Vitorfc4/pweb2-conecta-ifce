import { Home, LogOut, User, Users } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/features/auth/auth.store';
import { cn, getInitials } from '@/lib/utils';

const items = [
  { label: 'Feed', to: '/app/feed', icon: Home },
  { label: 'Grupos', to: '/app/groups', icon: Users },
  { label: 'Perfil', to: '/app/profile', icon: User },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  if (!user) {
    return null;
  }

  return (
    <aside className="space-y-6">
      <Card className="p-5">
        <div className="flex items-center gap-4">
          <Avatar initials={getInitials(user.name)} className="h-14 w-14 text-base" />
          <div>
            <div className="font-bold">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.course}</div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
          <div>
            <div className="text-lg font-black">42</div>
            <div className="text-muted-foreground">Posts</div>
          </div>
          <div>
            <div className="text-lg font-black">{user.following}</div>
            <div className="text-muted-foreground">Seguindo</div>
          </div>
          <div>
            <div className="text-lg font-black">{user.followers}</div>
            <div className="text-muted-foreground">Seguidores</div>
          </div>
        </div>
      </Card>

      <Card className="p-3">
        <nav className="space-y-2" aria-label="Navegação da área logada">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-muted',
                  isActive && 'bg-brand-50 text-brand-700',
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </Card>

      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={() => {
          logout();
          navigate('/login');
        }}
      >
        <LogOut className="h-4 w-4" />
        Sair
      </Button>
    </aside>
  );
}
