import galerie from '../data/galerie.json';
import { dateienAusBestand } from './bestand';

/** Öffentliche Lesadresse des R2-Buckets. Die Dateien selbst liegen nicht im Repository. */
export const bilderBasis = 'https://pub-e20229a8e04e4004b947e52e6c094b45.r2.dev';

const albenOrdner: Record<string, string> = {
  'Woche 1': 'woche-1',
  'Woche 2': 'woche-2',
  Jugendwoche: 'jugendwoche',
};

type Galerie = Record<string, Record<string, string[]>>;

export function albumAnker(titel: string) {
  return titel
    .trim()
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function bild(path: string) {
  const clean = path.replace(/^\/+/, '');
  return `${bilderBasis}/${clean.split('/').map(encodeURIComponent).join('/')}`;
}

export async function albumDateien(year: number, titel: string) {
  const ordner = albenOrdner[titel];
  if (!ordner) return [];
  const ausBestand = await dateienAusBestand(`galerie/${year}/${ordner}`);
  if (ausBestand) return ausBestand;
  return (galerie as Galerie)[String(year)]?.[ordner] ?? [];
}

export async function albumBilder(year: number, titel: string) {
  const ordner = albenOrdner[titel];
  if (!ordner) return [];
  const namen = await albumDateien(year, titel);
  return namen.map((name) => bild(`galerie/${year}/${ordner}/${name}`));
}

export async function jahresCover(year: number, alben: { titel: string }[], cover?: string) {
  if (cover && cover.trim()) return bild(cover.trim());
  for (const album of alben) {
    const [erstes] = await albumBilder(year, album.titel);
    if (erstes) return erstes;
  }
  return undefined;
}
