export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:3000';
export const API_MODE = (import.meta.env.VITE_API_MODE?.trim() || 'mock') as 'mock' | 'rest';

export function isRestMode() {
  return API_MODE === 'rest';
}
