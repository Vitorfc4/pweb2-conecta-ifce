import { apiRequest } from '@/lib/api-client';
import { isRestMode } from '@/lib/api-config';
import { loginWithCredentials, registerUser } from '@/mocks/db';
import type { AuthSession, LoginPayload, RegisterPayload } from '@/types';

export const authService = {
  login: (payload: LoginPayload) => {
    if (!isRestMode()) {
      return loginWithCredentials(payload);
    }

    return apiRequest<AuthSession>('/auth/login', {
      method: 'POST',
      body: payload,
    });
  },

  register: (payload: RegisterPayload) => {
    if (!isRestMode()) {
      return registerUser(payload);
    }

    return apiRequest<AuthSession>('/auth/register', {
      method: 'POST',
      body: payload,
    });
  },
};
