import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Ir para a página inicial do ConectaIFCE">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-glow">
        <GraduationCap className="h-5 w-5" />
      </div>
      <span className="text-xl font-black tracking-tight text-foreground">
        Conecta<span className="text-brand-500">IFCE</span>
      </span>
    </Link>
  );
}
