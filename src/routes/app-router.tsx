import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/app-layout';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { PublicLayout } from '@/components/layout/public-layout';
import { FeedPage } from '@/pages/feed-page';
import { GroupsPage } from '@/pages/groups-page';
import { LandingPage } from '@/pages/landing-page';
import { LoginPage } from '@/pages/login-page';
import { NotFoundPage } from '@/pages/not-found-page';
import { ProfilePage } from '@/pages/profile-page';
import { RegisterPage } from '@/pages/register-page';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'cadastro', element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/app',
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/app/feed" replace /> },
          { path: 'feed', element: <FeedPage /> },
          { path: 'groups', element: <GroupsPage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'profile/:userId', element: <ProfilePage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
