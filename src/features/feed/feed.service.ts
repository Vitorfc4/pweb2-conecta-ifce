import { apiRequest } from '@/lib/api-client';
import { isRestMode } from '@/lib/api-config';
import {
  createComment,
  createPost,
  fetchComments,
  fetchFeed,
  fetchSuggestions,
  toggleFollow,
  togglePostLike,
} from '@/mocks/db';
import type {
  Comment,
  CreateCommentPayload,
  CreatePostPayload,
  FeedPost,
  PublicUser,
  SuggestionUser,
} from '@/types';

export interface ServiceContext {
  token: string | null;
  viewerId: string;
}

interface ToggleFollowResponse {
  following: boolean;
  viewer?: PublicUser;
  profile?: PublicUser;
}

export const feedService = {
  list: async (context: ServiceContext) => {
    if (!isRestMode()) {
      return fetchFeed(context.viewerId);
    }

    const data = await apiRequest<{ items?: FeedPost[]; data?: FeedPost[]; posts?: FeedPost[] }>('/posts', {
      token: context.token,
    });
    return data.items ?? data.data ?? data.posts ?? [];
  },

  create: async (context: ServiceContext, payload: CreatePostPayload) => {
    if (!isRestMode()) {
      return createPost(context.viewerId, payload);
    }

    const formData = new FormData();
    formData.append('content', payload.content);
    if (payload.image) {
      formData.append('image', payload.image);
    }

    return apiRequest<{ item: FeedPost; message?: string }>('/posts', {
      method: 'POST',
      token: context.token,
      body: formData,
    });
  },

  toggleLike: async (context: ServiceContext, postId: string) => {
    if (!isRestMode()) {
      return togglePostLike(postId, context.viewerId);
    }

    return apiRequest<{ liked: boolean; likes: number }>(`/posts/${postId}/like`, {
      method: 'POST',
      token: context.token,
    });
  },

  listComments: async (context: ServiceContext, postId: string) => {
    if (!isRestMode()) {
      return fetchComments(postId);
    }

    const data = await apiRequest<{ items?: Comment[]; data?: Comment[]; comments?: Comment[] }>(`/posts/${postId}/comments`, {
      token: context.token,
    });
    return data.items ?? data.data ?? data.comments ?? [];
  },

  addComment: async (context: ServiceContext, postId: string, payload: CreateCommentPayload) => {
    if (!isRestMode()) {
      return createComment(postId, context.viewerId, payload);
    }

    return apiRequest<Comment>(`/posts/${postId}/comments`, {
      method: 'POST',
      token: context.token,
      body: payload,
    });
  },

  suggestions: async (context: ServiceContext) => {
    if (!isRestMode()) {
      return fetchSuggestions(context.viewerId);
    }

    const data = await apiRequest<{ items?: SuggestionUser[]; data?: SuggestionUser[] }>('/users/suggestions', {
      token: context.token,
    });
    return data.items ?? data.data ?? [];
  },

  toggleFollowSuggestion: async (context: ServiceContext, userId: string): Promise<ToggleFollowResponse> => {
    if (!isRestMode()) {
      return toggleFollow(context.viewerId, userId);
    }

    return apiRequest<ToggleFollowResponse>(`/users/${userId}/follow`, {
      method: 'POST',
      token: context.token,
    });
  },
};