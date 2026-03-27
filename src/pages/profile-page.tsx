import useSWR, { useSWRConfig } from 'swr';
import {
  Briefcase,
  CalendarDays,
  GraduationCap,
  Link as LinkIcon,
  MapPin,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PostCard } from '@/features/feed/components/post-card';
import { useAuthStore } from '@/features/auth/auth.store';
import { profileService, type ProfileContext } from '@/features/profile/profile.service';
import { getInitials } from '@/lib/utils';

export function ProfilePage() {
  const params = useParams();
  const sessionUser = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const updateUser = useAuthStore((state) => state.updateUser);
  const { mutate } = useSWRConfig();

  if (!sessionUser) {
    return null;
  }

  const currentUser = sessionUser;
  const currentUserId = currentUser.id;
  const profileId = params.userId ?? currentUserId;

  const context: ProfileContext = {
    viewerId: currentUserId,
    token,
  };

  const { data, error, isLoading } = useSWR(
    ['profile', profileId, currentUserId],
    () => profileService.get(context, profileId),
  );

  if (isLoading) {
    return (
      <Card className="p-6 text-sm text-muted-foreground">
        Carregando perfil...
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="p-6 text-sm text-red-700">
        Não foi possível carregar o perfil.
      </Card>
    );
  }

  const profileData = data;
  const isFollowingNow = profileData.isFollowing;

  async function handleToggleFollow() {
    const result = await profileService.toggleFollow(context, profileId);

    if (result.viewer) {
      updateUser(result.viewer);
    } else {
      updateUser({
        ...currentUser,
        following: currentUser.following + (isFollowingNow ? -1 : 1),
      });
    }

    await mutate(['profile', profileId, currentUserId]);
    await mutate(['suggestions', currentUserId]);
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-brand-500 to-brand-200" />
        <div className="px-6 pb-6 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Avatar
                initials={getInitials(profileData.user.name)}
                className="-mt-14 h-28 w-28 border-4 border-white text-3xl"
              />
              <h1 className="mt-4 text-4xl font-black tracking-tight">
                {profileData.user.name}
              </h1>

              <div className="mt-3 flex flex-wrap gap-4 text-sm text-brand-700">
                <span>{profileData.user.email}</span>
                <span>{profileData.user.campus}</span>
              </div>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">
                {profileData.user.bio}
              </p>

              {profileData.user.link ? (
                <a
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700"
                  href={`https://${profileData.user.link}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkIcon className="h-4 w-4" /> {profileData.user.link}
                </a>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-6 text-sm">
                <span>
                  <strong>{profileData.user.followers}</strong> seguidores
                </span>
                <span>
                  <strong>{profileData.user.following}</strong> seguindo
                </span>
                <span>
                  <strong>{profileData.posts.length}</strong> posts
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge>{profileData.user.role}</Badge>
              {!profileData.isOwnProfile ? (
                <Button
                  variant={profileData.isFollowing ? 'outline' : 'default'}
                  onClick={handleToggleFollow}
                >
                  {profileData.isFollowing ? 'Seguindo' : 'Seguir'}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          {profileData.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          {profileData.posts.length === 0 ? (
            <Card className="p-6 text-sm text-muted-foreground">
              Este perfil ainda não possui publicações.
            </Card>
          ) : null}
        </div>

        <Card className="p-5">
          <h2 className="text-lg font-black tracking-tight">Sobre</h2>
          <div className="mt-4 space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <GraduationCap className="mt-1 h-4 w-4 text-slate-400" />
              {profileData.user.course}
            </div>
            <div className="flex items-start gap-3">
              <Briefcase className="mt-1 h-4 w-4 text-slate-400" />
              {profileData.user.role} no IFCE
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 text-slate-400" />
              Campus {profileData.user.campus}
            </div>
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-1 h-4 w-4 text-slate-400" />
              Perfil preparado para integração com API autenticada
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}