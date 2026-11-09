import type { APIRoute } from 'astro';
import { vorschau } from '../config';

export const GET: APIRoute = () => {
  const body = vorschau
    ? 'User-agent: *\nDisallow: /\n'
    : 'User-agent: *\nAllow: /\n';
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
