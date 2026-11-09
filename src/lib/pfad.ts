/** Hängt den Astro-`base` davor. Lokal ist das `/`, auf GitHub Pages der Repository-Pfad. */
export function pfad(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (path === '/' || path === '') return base === '' ? '/' : `${base}/`;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}
