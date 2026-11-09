import { defineConfig } from 'astro/config';

// Die Seite soll später unter www.kimarek.de laufen.
// Keine CNAME-Datei: die Domain bleibt beim bisherigen GitHub-Pages-Account,
// bis der Verein dieses Repository übernimmt.
// BASE_PATH setzt nur der GitHub-Action-Lauf, damit die Vorschau unter
// curlykarin.github.io/Kimarek-webseite erreichbar ist. Lokal bleibt der Pfad /.
const base = process.env.BASE_PATH || '/';

function interneLinks() {
  const prefix = base.replace(/\/$/, '');
  return (tree) => {
    const gehen = (knoten) => {
      if (!knoten || typeof knoten !== 'object') return;
      const href = knoten.properties?.href;
      if (
        knoten.type === 'element' &&
        knoten.tagName === 'a' &&
        typeof href === 'string' &&
        href.startsWith('/') &&
        !href.startsWith('//')
      ) {
        knoten.properties.href = `${prefix}${href}`;
      }
      for (const kind of knoten.children ?? []) gehen(kind);
    };
    gehen(tree);
  };
}

export default defineConfig({
  site: 'https://www.kimarek.de',
  base,
  compressHTML: true,
  markdown: {
    rehypePlugins: [interneLinks],
  },
});
