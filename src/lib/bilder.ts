import galerie from '../data/galerie.json';

/** Öffentliche Lesadresse des R2-Buckets. Die Dateien selbst liegen nicht im Repository. */
export const bilderBasis = 'https://pub-e20229a8e04e4004b947e52e6c094b45.r2.dev';

const albenOrdner: Record<string, string> = {
  'Woche 1': 'woche-1',
  'Woche 2': 'woche-2',
  Jugendwoche: 'jugendwoche',
};

type Galerie = Record<string, Record<string, string[]>>;

export function bild(path: string) {
  const clean = path.replace(/^\/+/, '');
  return `${bilderBasis}/${clean.split('/').map(encodeURIComponent).join('/')}`;
}

export function albumDateien(year: number, titel: string) {
  const ordner = albenOrdner[titel];
  if (!ordner) return [];
  return (galerie as Galerie)[String(year)]?.[ordner] ?? [];
}

export function albumBilder(year: number, titel: string) {
  const ordner = albenOrdner[titel];
  if (!ordner) return [];
  return albumDateien(year, titel).map((name) => bild(`galerie/${year}/${ordner}/${name}`));
}

export function jahresCover(year: number, alben: { titel: string }[]) {
  for (const album of alben) {
    const [erstes] = albumBilder(year, album.titel);
    if (erstes) return erstes;
  }
  return undefined;
}
