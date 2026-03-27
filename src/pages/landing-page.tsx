import {
  BookOpen,
  Compass,
  MessageSquare,
  ShieldCheck,
  Trophy,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const features = [
  {
    icon: Users,
    title: 'Construa sua rede acadêmica',
    text: 'Conecte-se com colegas, professores e servidores do IFCE em um só lugar.',
  },
  {
    icon: Compass,
    title: 'Encontre parceiros de estudo',
    text: 'Descubra pessoas com objetivos parecidos para projetos, monitorias e pesquisas.',
  },
  {
    icon: Trophy,
    title: 'Compartilhe conquistas',
    text: 'Publique certificações, resultados de hackathons, artigos e atividades de extensão.',
  },
  {
    icon: BookOpen,
    title: 'Explore oportunidades',
    text: 'Acompanhe grupos, iniciativas e vagas em laboratórios e projetos institucionais.',
  },
];

const communityHighlights = [
  {
    icon: MessageSquare,
    title: 'Troca de conhecimento',
    text: 'Participe de discussões, publique aprendizados e acompanhe atualizações da comunidade acadêmica.',
  },
  {
    icon: ShieldCheck,
    title: 'Ambiente institucional',
    text: 'A proposta da plataforma é fortalecer a interação entre alunos, professores e servidores do IFCE.',
  },
  {
    icon: Users,
    title: 'Grupos e conexões',
    text: 'Entre em grupos de estudo, encontre colegas com interesses em comum e fortaleça sua rede.',
  },
];

const faqs = [
  {
    question: 'O que é o ConectaIFCE?',
    answer:
      'É uma plataforma acadêmica pensada para aproximar estudantes, professores e servidores, permitindo conexões, publicações e participação em grupos.',
  },
  {
    question: 'Quem pode criar conta?',
    answer:
      'A ideia do projeto é atender a comunidade institucional do IFCE, com cadastro por e-mail institucional.',
  },
  {
    question: 'Já existe integração com back-end?',
    answer:
      'Esta versão foi estruturada para funcionar em modo mock e também em modo REST, com uma camada centralizada para ligação a uma API real.',
  },
  {
    question: 'Quais tecnologias foram utilizadas?',
    answer:
      'React, Vite, TypeScript, Tailwind CSS, React Hook Form, Zod, Zustand e SWR, entre outras bibliotecas de apoio.',
  },
];

export function LandingPage() {
  return (
    <div>
      <section
        id="inicio"
        className="overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.12),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.08),_transparent_28%)] px-6 py-12 scroll-mt-28 lg:px-8 lg:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
              Rede social acadêmica do IFCE
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl">
              Conecte-se, colabore e cresça junto com a comunidade IFCE.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Projeto front-end com foco em componentização, acessibilidade, formulários validados e arquitetura pronta para integração com back-end.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/cadastro"
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-brand-500 px-6 text-base font-semibold text-white shadow-glow transition hover:bg-brand-600"
              >
                Participar agora
              </Link>

              <Link
                to="/login"
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-border bg-white px-6 text-base font-semibold text-foreground transition hover:bg-muted"
              >
                Entrar na plataforma
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                ['2.500+', 'Estudantes'],
                ['32', 'Campi'],
                ['50+', 'Grupos'],
              ].map(([value, label]) => (
                <Card key={label} className="p-6 text-center">
                  <div className="text-3xl font-black">{value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{label}</div>
                </Card>
              ))}
            </div>
          </div>

          <Card className="overflow-hidden border-0 bg-white p-0">
            <div className="h-40 bg-gradient-to-r from-brand-500 to-brand-200" />

            <div className="p-6">
              <div className="-mt-14 flex items-end gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-brand-500 text-3xl font-black text-white shadow-glow">
                  AS
                </div>

                <div>
                  <div className="text-2xl font-black">Ana Silva</div>
                  <div className="text-sm text-muted-foreground">
                    Análise e Desenvolvimento de Sistemas
                  </div>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                Apaixonada por tecnologia, interação humano-computador e design de interfaces acessíveis.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  ['1.234', 'Seguidores'],
                  ['450', 'Seguindo'],
                  ['42', 'Posts'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-3xl bg-muted p-4 text-center">
                    <div className="text-xl font-black">{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section
        id="recursos"
        className="mx-auto max-w-7xl px-6 py-14 scroll-mt-28 lg:px-8"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-600">
            Por que participar
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">
            Tudo o que você precisa para crescer na vida acadêmica.
          </h2>
          <p className="mt-4 text-muted-foreground">
            A base do projeto já segue uma arquitetura pensada para evolução contínua em sala de aula.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <item.icon className="h-5 w-5" />
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.text}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="comunidade"
        className="bg-muted/40 px-6 py-14 scroll-mt-28 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-600">
              Comunidade
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Uma plataforma pensada para colaboração acadêmica.
            </h2>
            <p className="mt-4 text-muted-foreground">
              O projeto busca reunir pessoas, interesses e oportunidades em um só ambiente, com foco em usabilidade, acessibilidade e evolução futura.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {communityHighlights.map((item) => (
              <Card key={item.title} className="h-full">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.text}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="mx-auto max-w-7xl px-6 py-14 scroll-mt-28 lg:px-8"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-600">
            FAQ
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">
            Perguntas frequentes
          </h2>
          <p className="mt-4 text-muted-foreground">
            Algumas respostas rápidas sobre a proposta e a implementação do projeto.
          </p>
        </div>

        <div className="mt-8 grid gap-4">
          {faqs.map((item) => (
            <Card key={item.question} className="p-6">
              <h3 className="text-lg font-bold">{item.question}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.answer}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
