import { apiRequest } from '@/lib/api-client';
import { isRestMode } from '@/lib/api-config';
import { fetchProfile, toggleFollow } from '@/mocks/db';
import type { ProfileResponse, PublicUser } from '@/types';

export interface ProfileContext {
  token: string | null;
  viewerId: string;
}

interface ToggleFollowResponse {
  following: boolean;
  viewer?: PublicUser;
  profile?: PublicUser;
}

export const profileService = {
  get: async (context: ProfileContext, profileId: string) => {
    if (!isRestMode()) {
      return fetchProfile(context.viewerId, profileId);
    }

    return apiRequest<ProfileResponse>(`/users/${profileId}/profile`, {
      token: context.token,
    });
  },

  toggleFollow: async (context: ProfileContext, profileId: string): Promise<ToggleFollowResponse> => {
    if (!isRestMode()) {
      return toggleFollow(context.viewerId, profileId);
    }

    return apiRequest<ToggleFollowResponse>(`/users/${profileId}/follow`, {
      method: 'POST',
      token: context.token,
    });
  },
};