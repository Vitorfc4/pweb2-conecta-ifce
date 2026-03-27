import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function formatRelativeDate(value: string) {
  const date = new Date(value);
  const diffInMs = Date.now() - date.getTime();
  const diffInHours = Math.max(1, Math.round(diffInMs / (1000 * 60 * 60)));

  if (diffInHours < 24) {
    return `${diffInHours}h atrás`;
  }

  const diffInDays = Math.round(diffInHours / 24);
  return `${diffInDays}d atrás`;
}
