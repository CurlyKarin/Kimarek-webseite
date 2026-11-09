export type Saison = {
  year: number;
  /** Letzter Tag der Ferienwochen, als YYYY-MM-DD. */
  saisonEnde: string;
};

export type Phase =
  | { art: 'countdown'; ziel: number; beginn: number; jahr: number }
  | { art: 'offen'; seit: number; jahr: number };

const BERLIN = 'Europe/Berlin';

/** Minuten, die Europe/Berlin zum angegebenen UTC-Zeitpunkt vor UTC liegt. */
function berlinVersatzMinuten(utcMs: number): number {
  const teile = new Intl.DateTimeFormat('en-US', {
    timeZone: BERLIN,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(new Date(utcMs));
  const wert = Object.fromEntries(teile.map((teil) => [teil.type, teil.value]));
  const wanduhr = Date.UTC(
    Number(wert.year),
    Number(wert.month) - 1,
    Number(wert.day),
    Number(wert.hour),
    Number(wert.minute),
    Number(wert.second),
  );
  return Math.round((wanduhr - utcMs) / 60_000);
}

/** UTC-Zeitstempel für eine Uhrzeit in Europe/Berlin. */
export function berlinZeit(jahr: number, monat: number, tag: number, stunde = 0, minute = 0): number {
  const schaetzung = Date.UTC(jahr, monat - 1, tag, stunde, minute);
  const versatz = berlinVersatzMinuten(schaetzung);
  const utc = schaetzung - versatz * 60_000;
  const versatzAmZiel = berlinVersatzMinuten(utc);
  if (versatzAmZiel === versatz) return utc;
  return schaetzung - versatzAmZiel * 60_000;
}

/** Anmeldung startet immer am 1. Februar um 9 Uhr, Ortszeit Berlin. */
export function anmeldungStart(jahr: number): number {
  return berlinZeit(jahr, 2, 1, 9, 0);
}

/** Der Countdown darf erst am Tag nach dem letzten Ferientag neu beginnen. */
export function saisonVorbei(saisonEnde: string): number {
  const [jahr, monat, tag] = saisonEnde.split('-').map(Number);
  const naechsterTag = new Date(Date.UTC(jahr, monat - 1, tag + 1));
  return berlinZeit(naechsterTag.getUTCFullYear(), naechsterTag.getUTCMonth() + 1, naechsterTag.getUTCDate(), 0, 0);
}

/** Beginn des laufenden Countdowns: Tag nach der vorigen Saison, sonst derselbe Ferientag im Vorjahr. */
function countdownBeginn(zielJahr: number, sortiert: Saison[]): number {
  const vorher = [...sortiert].reverse().find((saison) => saison.year < zielJahr);
  if (vorher) return saisonVorbei(vorher.saisonEnde);
  const vorlage = sortiert.find((saison) => saison.year === zielJahr) ?? sortiert.at(-1);
  if (!vorlage) return anmeldungStart(zielJahr) - 180 * 86_400_000;
  const [, monat, tag] = vorlage.saisonEnde.split('-');
  return saisonVorbei(`${zielJahr - 1}-${monat}-${tag}`);
}

export function phase(jetzt: number, saisons: Saison[]): Phase {
  const sortiert = [...saisons].sort((a, b) => a.year - b.year);
  for (const saison of sortiert) {
    const start = anmeldungStart(saison.year);
    const ende = saisonVorbei(saison.saisonEnde);
    if (jetzt < start) {
      return { art: 'countdown', ziel: start, beginn: countdownBeginn(saison.year, sortiert), jahr: saison.year };
    }
    if (jetzt < ende) return { art: 'offen', seit: start, jahr: saison.year };
  }
  const letztesJahr = sortiert.at(-1)?.year ?? new Date(jetzt).getFullYear();
  const naechstesJahr = letztesJahr + 1;
  const start = anmeldungStart(naechstesJahr);
  if (jetzt < start) {
    return { art: 'countdown', ziel: start, beginn: countdownBeginn(naechstesJahr, sortiert), jahr: naechstesJahr };
  }
  return { art: 'offen', seit: start, jahr: naechstesJahr };
}

export function restzeit(ms: number) {
  const gesamt = Math.max(0, Math.floor(ms / 1000));
  return {
    tage: Math.floor(gesamt / 86_400),
    stunden: Math.floor((gesamt % 86_400) / 3600),
    minuten: Math.floor((gesamt % 3600) / 60),
    sekunden: gesamt % 60,
  };
}

export function uhrzeitText(zeit: number): string {
  const datum = new Intl.DateTimeFormat('de-DE', {
    timeZone: BERLIN,
    day: 'numeric',
    month: 'long',
  }).format(new Date(zeit));
  return `${datum}, 9 Uhr`;
}
