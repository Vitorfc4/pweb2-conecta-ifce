import useSWR, { useSWRConfig } from 'swr';
import { Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ComposerCard } from '@/features/feed/components/composer-card';
import { PostCard } from '@/features/feed/components/post-card';
import { useAuthStore } from '@/features/auth/auth.store';
import { feedService, type ServiceContext } from '@/features/feed/feed.service';
import { getInitials } from '@/lib/utils';
import type { FeedPost, SuggestionUser } from '@/types';

export function FeedPage() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const updateUser = useAuthStore((state) => state.updateUser);
  const { mutate } = useSWRConfig();

  const viewerId = user?.id;
  const swrContext: ServiceContext | null = viewerId
    ? {
        viewerId,
        token,
      }
    : null;

  const { data: posts, isLoading, error } = useSWR(
    swrContext ? ['feed', swrContext.viewerId] : null,
    () => feedService.list(swrContext as ServiceContext),
  );

  const { data: suggestions, mutate: mutateSuggestions } = useSWR(
    swrContext ? ['suggestions', swrContext.viewerId] : null,
    () => feedService.suggestions(swrContext as ServiceContext),
  );

  if (!user) {
    return null;
  }

  const currentUser = user;
  const currentUserId = currentUser.id;

  const serviceContext: ServiceContext = {
    viewerId: currentUserId,
    token,
  };

  async function handlePublish(payload: { content: string; image?: File | null }) {
    await feedService.create(serviceContext, payload);
    await mutate(['feed', currentUserId]);
  }

  async function handleSuggestionFollow(targetUserId: string) {
    if (!suggestions) {
      return;
    }

    const optimistic: SuggestionUser[] = suggestions.map((item) =>
      item.id === targetUserId
        ? {
            ...item,
            isFollowing: !item.isFollowing,
            followers: item.followers + (item.isFollowing ? -1 : 1),
          }
        : item,
    );

    await mutateSuggestions(
      async () => {
        const result = await feedService.toggleFollowSuggestion(serviceContext, targetUserId);

        if (result.viewer) {
          updateUser(result.viewer);
        }

        return optimistic.map((item) =>
          item.id === targetUserId
            ? {
                ...item,
                isFollowing: result.following,
                followers: item.followers,
              }
            : item,
        );
      },
      {
        optimisticData: optimistic,
        rollbackOnError: true,
        revalidate: false,
      },
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6">
        <Card className="p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            Área logada
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight">
            Feed da comunidade
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            O feed usa SWR para cache e revalidação, com suporte a criação de posts,
            curtidas, comentários e integração com API REST.
          </p>
        </Card>

        <ComposerCard initials={getInitials(currentUser.name)} onPublish={handlePublish} />

        <div className="space-y-5">
          {isLoading ? (
            <Card className="p-6 text-sm text-muted-foreground">
              Carregando publicações...
            </Card>
          ) : null}

          {error ? (
            <Card className="p-6 text-sm text-red-700">
              Não foi possível carregar o feed agora. Tente novamente em instantes.
            </Card>
          ) : null}

          {posts?.map((post: FeedPost) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">Sugestões para você</h2>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="space-y-4">
            {suggestions?.map((person) => (
              <div key={person.id} className="rounded-3xl border border-border bg-white p-4">
                <div className="flex items-center gap-3">
                  <Avatar initials={getInitials(person.name)} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{person.name}</div>
                    <div className="truncate text-sm text-muted-foreground">
                      {person.course}
                    </div>
                  </div>
                  <Badge>{person.role}</Badge>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="text-xs text-muted-foreground">
                    {person.followers} seguidores
                  </div>
                  <Button
                    size="sm"
                    variant={person.isFollowing ? 'outline' : 'default'}
                    onClick={() => handleSuggestionFollow(person.id)}
                  >
                    {person.isFollowing ? 'Seguindo' : 'Seguir'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Boas práticas aplicadas</p>
          <ul className="mt-3 space-y-2 leading-7">
            <li>• Componentes reutilizáveis em <code>src/components</code>.</li>
            <li>• Zustand para sessão e perfil do usuário autenticado.</li>
            <li>• SWR para feed, curtidas, comentários e revalidação.</li>
            <li>• Tratamento de erro e estados de carregamento na interface.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}