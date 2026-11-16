/** Heutiges Datum in Europa/Berlin, als JJJJ-MM-TT. */
export function berlinHeute(jetzt = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(jetzt);
}

/** Sichtbar, wenn heute im Fenster liegt. Leeres von: sofort. Leeres bis: bleibt stehen. */
export function imZeitraum(von: string | undefined, bis: string | undefined, heute = berlinHeute()) {
  if (von && heute < von) return false;
  if (bis && heute > bis) return false;
  return true;
}
