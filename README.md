# Kinderzirkus Kimarek

Neue Website für [kimarek.de](https://www.kimarek.de), gebaut mit [Astro](https://astro.build). Die Texte stammen aus der bisherigen Seite. Die Fotos der Jahresgalerien sind bewusst nicht in diesem Repository.

Solange in `src/config.ts` der Wert `vorschau` auf `true` steht, weist die Seite Suchmaschinen ab. Eine `CNAME`-Datei gibt es hier nicht: Die Domain bleibt beim bisherigen GitHub-Pages-Account, bis der Verein dieses Repository übernimmt.

## Lokal ansehen

```sh
npm install
npm run dev
```

Die Vorschau läuft danach auf [http://localhost:4321](http://localhost:4321).

## Inhalte ändern

Alles, was der Vorstand später pflegen soll, liegt als Markdown unter `src/content/`:

| Ordner | Inhalt |
| --- | --- |
| `termine` | Jahreszahlen, Wochen und Link zum Anmeldeportal |
| `seiten` | Texte der Unterseiten |
| `aufstellungen` | Vorstandsfotos und die Zeile „von links nach rechts“ |
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
