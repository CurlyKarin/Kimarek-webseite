# Kinderzirkus Kimarek

Neue Website für [kimarek.de](https://www.kimarek.de), gebaut mit [Astro](https://astro.build). Die Texte stammen aus der bisherigen Seite. Die Fotos der Jahresgalerien sind bewusst nicht in diesem Repository.

Solange in `src/config.ts` der Wert `vorschau` auf `true` steht, weist die Seite Suchmaschinen ab. Eine `CNAME`-Datei gibt es hier nicht: Die Domain bleibt beim bisherigen GitHub-Pages-Account, bis der Verein dieses Repository übernimmt. Die öffentliche Vorschau liegt unter [curlykarin.github.io/Kimarek-webseite](https://curlykarin.github.io/Kimarek-webseite/).

## Lokal ansehen

```sh
npm install
npm run dev
```

Die Vorschau läuft danach auf [http://localhost:4321](http://localhost:4321).

## Bausteine

Inhaltsseiten bestehen aus wenigen festen Bausteinen. Der Vorstand soll später Beiträge dieser Art anlegen, entfernen und umsortieren können. Überschrift, Menü, Fußzeile, Countdown, Impressum, Datenschutz und die Galerie-Jahre bleiben fest.

| Baustein | Was er zeigt | Wo er heute liegt |
| --- | --- | --- |
| **Abschnitt** | Nur Text, Text und Foto, oder Foto und Text. Text und Foto sitzen in einem Kasten, der Abstand dazwischen hat dieselbe Fläche. | `src/components/Abschnitte.astro`, Beiträge in `src/content/geschichte`, `ablauf` und `vorstand` |
| **Fotoreihe** | Ein Foto bleibt stehen. Mehrere wechseln alle drei Sekunden. Ein Klick öffnet dieselbe Ansicht wie in der Galerie, nur mit den Fotos dieser Reihe. | `src/components/Fotoreihe.astro`. Die Listen stehen noch in `src/data/gruppenfotos.json` und `betreuer.json`; das Zelt hat vorerst ein einzelnes Foto. |
| **Collage** | Viele kleine Fotos unter dem Text. Ein Klick öffnet dieselbe Ansicht, nur für diese Fotos. Als eigener Baustein im Code noch nicht herausgelöst. | Direkt auf den Seiten Betreuer, Zelt, Kinderwoche und Jugendwoche. Die Dateinamen stehen in `src/data/betreuer.json`, `zelt.json`, `kinder.json` und `jugend.json`. |
| **Video** | Titel und Standbild. Der Film startet erst beim Abspielen, über `youtube-nocookie.com`. Das Standbild kommt von YouTube. | `src/components/Video.astro`, Beiträge in `src/content/videos` |

Zum Foto gehört ein Alt-Text. Bei einem Abschnitt legt `zuerst` fest, ob der Text oder das Foto zuerst kommt.

## Inhalte ändern

Alles, was der Vorstand später pflegen soll, liegt als Markdown unter `src/content/`:

| Ordner | Inhalt |
| --- | --- |
| `termine` | Jahreszahlen, Wochen, Link zum Anmeldeportal und `saisonEnde`, der letzte Ferientag. Die Anmeldung startet immer am 1. Februar um 9 Uhr; der Countdown läuft bis dahin und beginnt erst nach `saisonEnde` neu. Solange die Anmeldung offen ist, steht das anstelle der Zahlen. |
| `seiten` | Titel, Kurzbeschreibung und die kleine Zeile über der Überschrift |
| `geschichte`, `ablauf`, `vorstand` | Abschnitte dieser Seiten |
| `jahre` | Galerie-Jahre und die Anzahl der vorhandenen Fotos |
| `videos` | YouTube-Filme |

Nach dem Speichern baut der Entwicklungsserver die Seite neu. Auf GitHub Pages passiert das nach einem Push auf `main` über die Action in `.github/workflows/deploy.yml`. Dafür muss in den Repository-Einstellungen GitHub Pages auf „GitHub Actions“ stehen.

## Fotos

Jahresfotos, Vorstands- und Teambilder kommen nicht in dieses Repository. Sie sollen in einen Speicher des Vereins, zum Beispiel Cloudflare R2, und von den Galerieseiten nur verlinkt werden. Das Quell-Zip der alten Seite liegt lokal im Ordner `_quelle` und wird nicht mitversioniert.

## Übernahme durch den Verein

1. Der Verein legt eine GitHub-Organisation an, kein persönliches Konto.
2. Dieses Repository wird an die Organisation übertragen.
3. Die Vorstandsleute werden Mitglieder und können die Markdown-Dateien ändern. Ein Redaktionssystem kommt als nächster Schritt dazu.
4. Erst danach wird `www.kimarek.de` per DNS und `CNAME` auf das neue Repository gelegt. Gleichzeitig `vorschau` in `src/config.ts` auf `false` setzen.
