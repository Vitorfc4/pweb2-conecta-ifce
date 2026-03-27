import { apiRequest } from '@/lib/api-client';
import { isRestMode } from '@/lib/api-config';
import { fetchGroups } from '@/mocks/db';
import type { Group } from '@/types';

export const groupsService = {
  list: async (token: string | null) => {
    if (!isRestMode()) {
      return fetchGroups();
    }

    const data = await apiRequest<{ items?: Group[]; data?: Group[]; groups?: Group[] }>('/groups', {
      token,
    });

    return data.items ?? data.data ?? data.groups ?? [];
  },
};
