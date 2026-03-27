import { AuthShell } from '@/components/layout/auth-shell';
import { RegisterForm } from '@/features/auth/components/register-form';

export function RegisterPage() {
  return (
    <AuthShell title="Criar sua conta" subtitle="Preencha seus dados para entrar na comunidade ConectaIFCE.">
      <RegisterForm />
    </AuthShell>
  );
}
