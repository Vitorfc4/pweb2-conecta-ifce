import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/features/auth/auth.store';
import { type LoginSchema, loginSchema } from '@/features/auth/auth.schemas';
import { isRestMode } from '@/lib/api-config';

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'ana.silva@ifce.edu.br',
      password: '12345678',
    },
  });

  async function onSubmit(values: LoginSchema) {
    try {
      setFormError('');
      await login(values);
      const target = (location.state as { from?: string } | null)?.from ?? '/app/feed';
      navigate(target, { replace: true });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Não foi possível entrar.');
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-2">
        <Label htmlFor="email">E-mail institucional</Label>
        <Input id="email" type="email" placeholder="seu.nome@ifce.edu.br" {...register('email')} />
        {errors.email ? <p className="text-sm text-red-600">{errors.email.message}</p> : null}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="password">Senha</Label>
          <span className="text-sm font-medium text-brand-700">Esqueceu a senha?</span>
        </div>
        <Input id="password" type="password" placeholder="Digite sua senha" {...register('password')} />
        {errors.password ? <p className="text-sm text-red-600">{errors.password.message}</p> : null}
      </div>

      {!isRestMode() ? (
        <div className="rounded-3xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-800">
          Use o acesso de demonstração: <strong>ana.silva@ifce.edu.br</strong> / <strong>12345678</strong>
        </div>
      ) : null}

      {formError ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" aria-live="polite">
          {formError}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </Button>

      <p className="text-sm text-muted-foreground">
        Ainda não tem conta?{' '}
        <Link to="/cadastro" className="font-semibold text-brand-700">
          Criar conta
        </Link>
      </p>
    </form>
  );
}
