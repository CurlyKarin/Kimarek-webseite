import { defineConfig } from 'astro/config';

// Die Seite soll später unter www.kimarek.de laufen.
// Kein `base` und keine CNAME-Datei: die Domain bleibt beim bisherigen
// GitHub-Pages-Account, bis der Verein dieses Repository übernimmt.
export default defineConfig({
  site: 'https://www.kimarek.de',
  compressHTML: true,
});
