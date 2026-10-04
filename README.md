# TPSsssIT

Una raccolta di dispense di TPSIT.

Per ogni anno (terzo, quarto, quinto) le dispense sono divise in due elenchi:

- **Teoria** — gli argomenti teorici;
- **Laboratorio** — le attività pratiche.

Un modulo può avere le sue **esercitazioni**, che compaiono subito sotto di lui.

## Come aggiungere una dispensa

1. Copia `_template/dispensa.html` nella cartella dell'anno (`terzo-anno/`, `quarto-anno/` o `quinto-anno/`) e rinominala.
2. Apri `assets/js/dispense.js` e aggiungi la voce in `teoria` o in `laboratorio` dell'anno giusto:

   ```js
   { num: '1', t: 'Titolo', f: 'nome-file.html',
     esercitazioni: [                       // facoltativo
       { t: 'Scheda di esercizi', f: 'nome-file-esercizi.html' }
     ]
   }
   ```

   Senza `f` la voce compare come "In preparazione".
