/* ==========================================================================
   dispense.js — ARCHIVIO DEGLI ARGOMENTI
   --------------------------------------------------------------------------
   QUESTO È L'UNICO FILE CHE DEVI MODIFICARE PER AGGIUNGERE UNA DISPENSA.

   Per ogni anno c'è un elenco piatto "argomenti": lo riempi tu, uno alla
   volta, nell'ordine in cui vuoi che compaiano.

   Struttura di un argomento:
     {
       num: '1',                 // il numero che vedi nell'elenco. È un testo,
                                  // quindi puoi anche usare numeri con il
                                  // punto per i sotto-argomenti: '1.1', '1.2'…
                                  // (compaiono leggermente rientrati)
       t:   'Titolo dell\'argomento',
       f:   'nome-file.html'     // il file dentro la cartella dell'anno.
                                  // Ometti questo campo (o metti null) se la
                                  // dispensa non è ancora pronta: comparirà
                                  // come "In preparazione", non cliccabile.
     }

   Esempio con un sotto-argomento:
     { num: '3',   t: 'La memoria virtuale', f: 'memoria-virtuale.html' },
     { num: '3.1', t: 'Esercitazione: paginazione', f: 'es-paginazione.html' },
     { num: '4',   t: 'Il file system' },
   ========================================================================== */

window.DISPENSE = {

  terzo: {
    argomenti: []
  },

  quarto: {
    argomenti: [
      { num: '0', t: 'Ripasso dell\'anno precedente: codici, sistemi operativi e memoria', f: 'ripasso-terzo-anno.html' },
      { num: '1', t: 'Il modello a processi', f: 'processi.html' }
    ]
  },

  quinto: {
    argomenti: [
      { num: '0', t: 'Ripasso dell\'anno precedente: processi, thread e concorrenza', f: 'ripasso-concorrenza.html' },
      { num: '1', t: 'Sistemi distribuiti e modelli architetturali', f: 'sistemi-distribuiti.html' }
    ]
  }

};
