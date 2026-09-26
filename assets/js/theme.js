/* ==========================================================================
   theme.js — gestione tema chiaro/scuro
   Va incluso nel <head> PRIMA del <body> per evitare il "flash" di tema.
   Dark mode = predefinita. La scelta viene salvata in localStorage.
   ========================================================================== */
(function () {
  var KEY = 'tpsit-theme';
  var saved = null;

  try { saved = localStorage.getItem(KEY); } catch (e) { /* storage non disponibile */ }

  // Dark è il default: applichiamo l'attributo solo se l'utente ha scelto "light".
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  // API globale usata dal bottone nell'header
  window.TPSITTheme = {
    get: function () {
      return document.documentElement.getAttribute('data-theme') || 'dark';
    },
    set: function (mode) {
      document.documentElement.setAttribute('data-theme', mode);
      try { localStorage.setItem(KEY, mode); } catch (e) {}
      document.querySelectorAll('.theme-toggle').forEach(function (btn) {
        btn.setAttribute('aria-label', mode === 'light' ? 'Passa al tema scuro' : 'Passa al tema chiaro');
        btn.setAttribute('aria-pressed', String(mode === 'light'));
      });
    },
    toggle: function () {
      this.set(this.get() === 'light' ? 'dark' : 'light');
    }
  };
})();
