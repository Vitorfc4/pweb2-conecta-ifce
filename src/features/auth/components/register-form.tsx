import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore } from '@/features/auth/auth.store';
import { type RegisterSchema, registerSchema } from '@/features/auth/auth.schemas';

const campuses = ['Tauá', 'Fortaleza', 'Quixadá', 'Sobral'];
const roles = ['Aluno', 'Professor', 'Servidor'] as const;

export function RegisterForm() {
  const navigate = useNavigate();
  const registerUser = useAuthStore((state) => state.register);
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'Aluno',
      campus: 'Tauá',
      course: 'Análise e Desenvolvimento de Sistemas',
      bio: 'Quero colaborar com projetos acadêmicos e tecnologia aplicada no IFCE.',
    },
  });

  async function onSubmit(values: RegisterSchema) {
    try {
      setFormError('');
      await registerUser(values);
      navigate('/app/feed', { replace: true });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Não foi possível criar a conta.');
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input id="name" placeholder="Digite seu nome" {...register('name')} />
          {errors.name ? <p className="text-sm text-red-600">{errors.name.message}</p> : null}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="email">E-mail institucional</Label>
          <Input id="email" type="email" placeholder="seu.nome@ifce.edu.br" {...register('email')} />
          {errors.email ? <p className="text-sm text-red-600">{errors.email.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Vínculo</Label>
          <select id="role" className="input-select" {...register('role')}>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role ? <p className="text-sm text-red-600">{errors.role.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="campus">Campus</Label>
          <select id="campus" className="input-select" {...register('campus')}>
            {campuses.map((campus) => (
              <option key={campus} value={campus}>
                {campus}
              </option>
            ))}
          </select>
          {errors.campus ? <p className="text-sm text-red-600">{errors.campus.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="course">Curso ou setor</Label>
          <Input id="course" placeholder="Ex.: ADS, Gestão Acadêmica..." {...register('course')} />
          {errors.course ? <p className="text-sm text-red-600">{errors.course.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" placeholder="Crie uma senha forte" {...register('password')} />
          {errors.password ? <p className="text-sm text-red-600">{errors.password.message}</p> : null}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" placeholder="Conte um pouco sobre você" {...register('bio')} />
          {errors.bio ? <p className="text-sm text-red-600">{errors.bio.message}</p> : null}
        </div>
      </div>

      {formError ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" aria-live="polite">
          {formError}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Criando conta...' : 'Criar conta'}
      </Button>

      <p className="text-sm text-muted-foreground">
        Já tem conta?{' '}
        <Link to="/login" className="font-semibold text-brand-700">
          Entrar agora
        </Link>
      </p>
    </form>
  );
}
