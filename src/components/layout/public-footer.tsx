export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 text-sm text-muted-foreground lg:grid-cols-3 lg:px-8">
        <div>
          <h2 className="mb-3 text-base font-bold text-foreground">ConectaIFCE</h2>
          <p className="max-w-md leading-7">
            Plataforma acadêmica para aproximar estudantes, professores e servidores do IFCE.
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-foreground">Tecnologias</h3>
          <p className="leading-7">React, Vite, TypeScript, Tailwind CSS, Zustand, React Hook Form, Zod e SWR.</p>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-foreground">Contato</h3>
          <p className="leading-7">Projeto didático para Programação Web II — IFCE Campus Tauá.</p>
        </div>
      </div>
    </footer>
  );
}
