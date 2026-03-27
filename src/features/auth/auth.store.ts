import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { authService } from '@/features/auth/auth.service';
import type { AuthSession, LoginPayload, PublicUser, RegisterPayload } from '@/types';

interface AuthState {
  token: string | null;
  user: PublicUser | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<AuthSession>;
  register: (payload: RegisterPayload) => Promise<AuthSession>;
  logout: () => void;
  setSession: (session: AuthSession) => void;
  updateUser: (user: PublicUser) => void;
}

function applySession(session: AuthSession, set: (partial: Partial<AuthState>) => void) {
  set({
    token: session.token,
    user: session.user,
    isAuthenticated: true,
  });
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: async (payload) => {
        const session = await authService.login(payload);
        applySession(session, set);
        return session;
      },
      register: async (payload) => {
        const session = await authService.register(payload);
        applySession(session, set);
        return session;
      },
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },
      setSession: (session) => applySession(session, set),
      updateUser: (user) => {
        set({ user, isAuthenticated: true });
      },
    }),
    {
      name: 'conecta-ifce-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
