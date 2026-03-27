import { AuthShell } from '@/components/layout/auth-shell';
import { LoginForm } from '@/features/auth/components/login-form';

export function LoginPage() {
  return (
    <AuthShell title="Bem-vindo de volta" subtitle="Entre com seu e-mail institucional para acessar a comunidade.">
      <LoginForm />
    </AuthShell>
  );
}
