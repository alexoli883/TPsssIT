# TPSsssIT · Dispense di TPSIT

Sito statico per la pubblicazione delle dispense di TPSIT (terzo, quarto e quinto anno).

Solo HTML, CSS e JavaScript: **nessuna build, nessuna dipendenza da installare**.
Si pubblica su GitHub Pages così com'è.

---

## 1. Struttura delle cartelle

```
TPSIT/
├── index.html              ← homepage con i tre anni
├── 404.html                ← pagina di errore (trova da sola la cartella del sito)
├── .nojekyll               ← dice a GitHub Pages di pubblicare i file così come sono
├── .gitignore              ← esclude PDF (libri di testo) e CLAUDE.md: non vanno mai su GitHub
│
├── assets/
│   ├── css/style.css       ← UNICO foglio di stile, usato da tutte le pagine
│   ├── js/theme.js         ← tema scuro/chiaro (va nel <head>)
│   ├── js/dispense.js      ← ⭐ ELENCO DEGLI ARGOMENTI: è il file che modifichi
│   ├── js/app.js           ← comportamenti comuni (menu, indice, copia codice)
│   ├── fonts/              ← caratteri in locale + licenze OFL
│   └── img/                ← favicon (il pitone)
│
├── terzo-anno/
│   └── index.html          ← elenco argomenti del terzo anno
│
├── quarto-anno/
│   ├── index.html
│   ├── ripasso-terzo-anno.html
│   └── processi.html       ← dispensa con simulatore del ciclo di vita dei processi
│
├── quinto-anno/
│   ├── index.html
│   ├── ripasso-concorrenza.html  ← con simulatore di race condition
│   └── sistemi-distribuiti.html  ← con simulatore di un cluster
│
└── _template/
    └── dispensa.html       ← modello da copiare per ogni nuova dispensa
```

Le pagine di elenco (`terzo-anno/index.html` e le altre) **non contengono l'elenco**:
lo generano leggendo `assets/js/dispense.js`. Aggiungere un argomento significa quindi
modificare un solo file di dati, non l'HTML.

---

## 2. Aggiungere una nuova dispensa

### Passo 1 — crea la pagina

Copia `_template/dispensa.html` nella cartella dell'anno e rinominalo.
Usa nomi in minuscolo, senza spazi né accenti:

```
_template/dispensa.html  →  terzo-anno/gerarchia-memorie.html
```

Apri il file e cerca la parola `SOSTITUISCI`: titolo, descrizione, percorso in alto.
Se la dispensa non è del terzo anno, correggi anche la voce di menu con
`class="is-active"` e i link del percorso (breadcrumb).

Poi scrivi il contenuto dentro `<article class="prose"> … </article>`.
**L'indice laterale si costruisce da solo** leggendo i tuoi `<h2>` e `<h3>`.

### Passo 2 — registra l'argomento nell'elenco

Apri `assets/js/dispense.js`, trova l'anno giusto e aggiungi una riga nell'elenco
`argomenti`, nel punto in cui vuoi che compaia:

```js
{ num: '3', t: 'La gerarchia delle memorie', f: 'gerarchia-memorie.html' }
```

- `num` è il numero che vedi nell'elenco: è testo libero, quindi puoi anche
  scrivere `'3.1'` per un sotto-argomento (un'esercitazione, un approfondimento…),
  che comparirà leggermente rientrato sotto il `3`.
- `f` è il nome del file appena creato. **Ometti questo campo** (o scrivi `f: null`)
  se la dispensa non è ancora pronta: comparirà nell'elenco con l'etichetta
  *In preparazione*, non cliccabile.
- L'ordine con cui compaiono nell'elenco è l'ordine in cui li scrivi nell'array:
  mettili tu nell'ordine che preferisci.

---

## 3. I componenti già pronti per il contenuto

Sono tutti documentati e mostrati dentro `_template/dispensa.html`. In breve:

| Componente | Come si scrive |
|---|---|
| Riquadro di evidenza | `<div class="callout info \| ok \| warn"> … </div>` |
| Blocco di codice | `<div class="code-block"><div class="code-head"><span class="lang">Java</span></div><pre><code>…</code></pre></div>` |
| Tabella | `<div class="table-wrap"><table>…</table></div>` |
| Citazione | `<blockquote>…</blockquote>` |
| Immagine | `<figure><img …><figcaption>…</figcaption></figure>` |
| Animazione / demo | `<div class="demo"><div class="demo-head">…</div><div class="demo-stage">…</div><div class="demo-controls">…</div></div>` |

Il bottone **Copia** sui blocchi di codice viene aggiunto automaticamente.
Per colorare il codice usa gli `<span>` con classi `tok-key`, `tok-str`, `tok-com`,
`tok-fn`, `tok-num` (facoltativo).

### Animazioni

Il riquadro `.demo` è pensato apposta: intestazione, palcoscenico e barra dei comandi.
Dentro `.demo-stage` puoi mettere SVG, canvas o semplici `<div>` animati via CSS,
e il JavaScript della demo va in un `<script>` in fondo alla pagina.

Esempi completi e commentati:

- `quarto-anno/processi.html` — ciclo di vita dei processi su un solo processore
- `quinto-anno/ripasso-concorrenza.html` — race condition su una variabile condivisa
- `quinto-anno/sistemi-distribuiti.html` — un calcolo diviso su un cluster di PC

Nei colori usa sempre le variabili CSS (`var(--gold)`, `var(--accent)`, `var(--surface-2)`…):
così l'animazione resta leggibile anche in tema chiaro.

---

## 4. I colori

Definiti una sola volta in cima a `assets/css/style.css`.

| Ruolo | Dark (predefinito) | Light |
|---|---|---|
| Sfondo | `#08172A` | `#F4F7FB` |
| Superficie | `#0F233D` | `#FFFFFF` |
| Superficie 2 | `#152C4A` | `#E8EEF6` |
| Testo | `#FFFFFF` | `#08172A` |
| Accento principale (`--gold`) | `#D1FF61` | `#4A7A00` |
| Accento secondario (`--accent`) | `#4DA3FF` | `#1D64C4` |

La variabile dell'accento principale si chiama ancora `--gold` per compatibilità con le
dispense già scritte, ma il colore è il lime `#D1FF61`. Va usato sui dettagli (nodi, link,
stato attivo, icone): testo e titoli restano bianchi. Nel tema chiaro il lime su fondo
bianco non sarebbe leggibile, quindi `--gold` diventa un verde oliva scuro della stessa
tinta; il lime pieno resta disponibile come `var(--brand-gold)` per i riempimenti.

Caratteri: **Bricolage Grotesque** per i titoli, **Atkinson Hyperlegible Next** per il
testo, **JetBrains Mono** per il codice (variabili `--font-display`, `--font-sans`,
`--font-mono`). Sono ospitati **in locale** in `assets/fonts/` (licenza SIL OFL, file
`OFL-*.txt` accanto): il sito non fa nessuna richiesta a Google Fonts o ad altri server
esterni. Non aggiungere `<link>` a fonts.googleapis.com nelle nuove pagine.

Per cambiare la palette basta modificare i blocchi `:root` e `[data-theme="light"]`:
tutto il sito si adegua.

Il tema scuro è quello di partenza; la scelta dell'utente viene salvata nel browser
(`localStorage`) e ricordata alla visita successiva.

---

## 5. Provare il sito in locale

Puoi semplicemente fare doppio clic su `index.html`: tutti i percorsi sono relativi,
quindi funziona anche aperto come file.

Per un ambiente più fedele a quello online, da terminale nella cartella del progetto:

```bash
npx serve .
```

e apri l'indirizzo che compare (di solito `http://localhost:3000`).

---

## 6. Pubblicare su GitHub Pages

1. Crea un repository su GitHub (pubblico, se usi il piano gratuito) e caricaci il
   contenuto di questa cartella: `index.html` deve stare nella radice del repository.
2. Nel repository vai su **Settings → Pages**.
3. In **Build and deployment** scegli **Source: Deploy from a branch**, poi il branch
   `main` e la cartella `/ (root)`. Salva.
4. Dopo un minuto circa il sito è online all'indirizzo `https://<utente>.github.io/<repository>/`.

Da quel momento **ogni push ripubblica il sito**. Non serve nient'altro: niente build,
niente Node, niente variabili d'ambiente.

- Il file `.nojekyll` evita che GitHub rielabori il sito con Jekyll: i file vengono
  pubblicati esattamente come sono.
- I PDF dei libri di testo e i file `CLAUDE.md` sono esclusi da `.gitignore`: tienili pure nelle cartelle
  mentre scrivi le dispense, non finiranno online.
- Il sito non usa cookie né servizi esterni (i font sono in locale): l'unica cosa salvata
  nel browser dello studente è la scelta del tema chiaro o scuro.

---

## 7. Piccoli dettagli utili

- **Stampa**: ogni dispensa è impaginata per la stampa (menu, indice e comandi delle
  demo spariscono). Gli studenti possono salvarla in PDF con `Ctrl/Cmd + P`.
- **Accessibilità**: contrasti verificati nei due temi, navigazione da tastiera,
  link "Vai al contenuto", e le animazioni si fermano se il sistema ha attivo
  *riduci movimento*.
- **Responsive**: layout a colonna singola sotto gli 800 px, indice laterale a partire
  dai 1024 px. Tabelle e blocchi di codice scorrono in orizzontale senza rompere la pagina.
