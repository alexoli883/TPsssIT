/* ==========================================================================
   dispense.js — ARCHIVIO DEGLI ARGOMENTI
   --------------------------------------------------------------------------
   QUESTO È L'UNICO FILE CHE DEVI MODIFICARE PER AGGIUNGERE UNA DISPENSA.

   Per ogni anno ci sono due elenchi separati, ognuno con la sua numerazione:
     teoria:      le dispense degli argomenti teorici
     laboratorio: le dispense delle attività pratiche
   Li riempi tu, uno alla volta, nell'ordine in cui vuoi che compaiano.
   Se un elenco è vuoto, nella pagina compare "In preparazione".

   Struttura di un argomento:
     {
       num: '1',                 // il numero che vedi nell'elenco. È un testo,
                                  // quindi puoi anche usare numeri con il
                                  // punto per i sotto-argomenti: '1.1', '1.2'…
       t:   'Titolo dell\'argomento',
       f:   'nome-file.html',    // il file dentro la cartella dell'anno.
                                  // Ometti questo campo (o metti null) se la
                                  // dispensa non è ancora pronta: comparirà
                                  // come "In preparazione", non cliccabile.
       esercitazioni: [ … ]      // FACOLTATIVO: le esercitazioni di questo
                                  // modulo. Compaiono rientrate sotto di lui,
                                  // con l'etichetta "Esercitazione" e numerate
                                  // in automatico (1.1, 1.2…). Ognuna ha solo
                                  // t e f, con le stesse regole di sopra.
     }

   Esempio con le esercitazioni:
     { num: '3', t: 'La memoria virtuale', f: 'memoria-virtuale.html',
       esercitazioni: [
         { t: 'La paginazione', f: 'es-paginazione.html' },
         { t: 'Algoritmi di sostituzione' }            // in preparazione
       ]
     },
     { num: '4', t: 'Il file system' },
   ========================================================================== */

window.DISPENSE = {

  terzo: {
    teoria: [],
    laboratorio: []
  },

  quarto: {
    teoria: [
      { num: '0', t: 'Ripasso dell\'anno precedente: codici, sistemi operativi e memoria', f: 'ripasso-terzo-anno.html' },
      { num: '1', t: 'Il modello a processi', f: 'processi.html' }
    ],
    laboratorio: [
      { num: '1', t: 'Introduzione a Python: variabili, numeri, stringhe, input e output', f: 'python-introduzione.html',
        esercitazioni: [
          { t: 'Scheda di esercizi 1', f: 'python-esercizi-1.html' }
        ]
      },
      { num: '2', t: 'Le strutture condizionali', f: 'python-condizioni.html',
        esercitazioni: [
          { t: 'Scheda di esercizi 2', f: 'python-esercizi-2.html' }
        ]
      }
    ]
  },

  quinto: {
    teoria: [
      { num: '0', t: 'Ripasso dell\'anno precedente: processi, thread e concorrenza', f: 'ripasso-concorrenza.html' },
      { num: '1', t: 'Sistemi distribuiti e modelli architetturali', f: 'sistemi-distribuiti.html' }
    ],
    laboratorio: [
      { num: '0', t: 'Ripasso HTML', f: 'ripasso-html.html' }
    ]
  }

};
