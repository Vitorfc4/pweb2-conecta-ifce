import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Informe um e-mail válido.'),
  password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres.')
    .max(32, 'A senha deve ter no máximo 32 caracteres.'),
});

export const registerSchema = z.object({
  name: z.string().min(3, 'Informe seu nome completo.'),
  email: z.string().email('Informe um e-mail institucional válido.'),
  password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres.')
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, 'Use pelo menos uma letra e um número.'),
  role: z.enum(['Aluno', 'Professor', 'Servidor']),
  campus: z.string().min(2, 'Selecione o campus.'),
  course: z.string().min(2, 'Informe seu curso ou setor.'),
  bio: z.string().min(10, 'Escreva uma bio curta com pelo menos 10 caracteres.'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
