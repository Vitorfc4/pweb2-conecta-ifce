import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/features/auth/auth.store';
import { groupsService } from '@/features/groups/groups.service';

const categories = ['Todos', 'Tecnologia', 'Acadêmico', 'Idiomas'];

export function GroupsPage() {
  const token = useAuthStore((state) => state.token);
  const { data: groups, isLoading, error } = useSWR(['groups', token], () => groupsService.list(token));
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredGroups = useMemo(() => {
    if (!groups) {
      return [];
    }
    if (activeCategory === 'Todos') {
      return groups;
    }
    return groups.filter((group) => group.category === activeCategory);
  }, [activeCategory, groups]);

  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight">Grupos de estudo</h1>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Explore grupos acadêmicos, acompanhe atividades recentes e use a estrutura pronta para conectar filtros e detalhes reais da API.
            </p>
          </div>
          <div className="flex h-12 w-full max-w-sm items-center gap-3 rounded-2xl border border-border bg-muted px-4 text-sm text-muted-foreground">
            <Search className="h-4 w-4" /> Buscar grupos...
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeCategory === category ? 'bg-brand-500 text-white shadow-glow' : 'bg-muted text-muted-foreground hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </Card>

      {isLoading ? <Card className="p-6 text-sm text-muted-foreground">Carregando grupos...</Card> : null}
      {error ? <Card className="p-6 text-sm text-red-700">Não foi possível carregar os grupos.</Card> : null}

      <div className="space-y-5">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-black tracking-tight">{group.name}</h2>
                  <Badge>{group.category}</Badge>
                </div>
                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">{group.description}</p>
                <div className="mt-4 flex flex-wrap gap-5 text-sm text-muted-foreground">
                  <span>{group.members} membros</span>
                  <span>{group.lastActivity}</span>
                </div>
              </div>
              <button className="rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-glow">
                Participar
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
