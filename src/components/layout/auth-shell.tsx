import type { ReactNode } from 'react';
import { ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const highlights = [
  {
    icon: Users,
    title: 'Comunidade conectada',
    text: 'Participe da rede acadêmica do IFCE e encontre grupos, colegas e professores.',
  },
  {
    icon: Sparkles,
    title: 'Experiência moderna',
    text: 'Interface responsiva com componentes reutilizáveis, feedback de loading e tratamento de erros.',
  },
  {
    icon: ShieldCheck,
    title: 'Sessão com JWT',
    text: 'Estrutura pronta para armazenar o token, proteger rotas privadas e tratar respostas 401.',
  },
];

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <section className="bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.08),_transparent_24%)] px-6 py-8 lg:px-8 lg:py-12">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="hidden overflow-hidden border-0 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-400 text-white lg:block">
          <div className="flex h-full flex-col justify-between p-10">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
                Projeto acadêmico front-end
              </div>
              <h1 className="max-w-lg text-5xl font-black leading-tight">ConectaIFCE com arquitetura pronta para crescer.</h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/85">
                Além das telas, o projeto já está organizado com formulários tipados, store global, serviços centralizados, rotas protegidas e base para integração REST autenticada.
              </p>
            </div>
            <div className="grid gap-4">
              {highlights.map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <item.icon className="mb-3 h-5 w-5" />
                  <h2 className="font-bold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-white/80">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-8 lg:p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-black tracking-tight">{title}</h1>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{subtitle}</p>
          </div>
          {children}
        </Card>
      </div>
    </section>
  );
}
