/* ==========================================================================
   app.js — comportamenti comuni a tutto il sito
   Ogni blocco si attiva solo se trova gli elementi di cui ha bisogno,
   così lo stesso file può essere incluso in qualunque pagina.
   ========================================================================== */
(function () {
  'use strict';

  var d = document;
  var $  = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  var ICON_ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---------------------------------------------------------------- TEMA */
  $$('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (window.TPSITTheme) window.TPSITTheme.toggle();
    });
  });
  if (window.TPSITTheme) window.TPSITTheme.set(window.TPSITTheme.get());

  /* -------------------------------------------------------------- HEADER */
  var header = $('.site-header');
  var burger = $('.nav-burger');
  var links  = $('.nav-links');

  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        links.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('is-open')) {
        links.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
  }

  /* ------------------------------------------- SCROLL: ombra, progresso */
  var progress = $('.read-progress');
  var toTop    = $('.to-top');

  function onScroll() {
    var y = window.scrollY || d.documentElement.scrollTop;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (toTop)  toTop.classList.toggle('is-visible', y > 500);
    if (progress) {
      var h = d.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? Math.min(100, (y / h) * 100) : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------- RIVELAZIONE AL SCROLL */
  var revealables = $$('.reveal');
  if (revealables.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            io.unobserve(en.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
      revealables.forEach(function (el, i) {
        el.style.transitionDelay = Math.min(i, 6) * 60 + 'ms';
        io.observe(el);
      });
    } else {
      revealables.forEach(function (el) { el.classList.add('is-in'); });
    }
  }

  /* ------------------------------------------------- GLOW SULLE CARD ANNI */
  $$('.year-card').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  /* ----------------------------------------------------- COPIA IL CODICE */
  $$('.code-block').forEach(function (block) {
    var head = $('.code-head', block);
    if (!head || $('.code-copy', head)) return;
    var btn = d.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy';
    btn.textContent = 'Copia';
    head.appendChild(btn);
    btn.addEventListener('click', function () {
      var pre = $('pre', block);
      if (!pre) return;
      var text = pre.innerText;
      var done = function () {
        btn.textContent = 'Copiato ✓';
        btn.classList.add('done');
        setTimeout(function () { btn.textContent = 'Copia'; btn.classList.remove('done'); }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var ta = d.createElement('textarea');
        ta.value = text; d.body.appendChild(ta); ta.select();
        try { d.execCommand('copy'); done(); } catch (e) {}
        d.body.removeChild(ta);
      }
    });
  });

  /* ------------------------------------- INDICE AUTOMATICO + SCROLLSPY */
  var tocBox = $('#toc');
  var article = $('.prose');
  if (tocBox && article) {
    var heads = $$('h2, h3', article).filter(function (h) { return h.textContent.trim(); });
    if (heads.length > 1) {
      var used = {};
      var ul = d.createElement('ul');
      heads.forEach(function (h) {
        if (!h.id) {
          var base = h.textContent.trim().toLowerCase()
            .normalize('NFD').replace(/[̀-ͯ]/g, '')
            .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'sez';
          used[base] = (used[base] || 0) + 1;
          h.id = used[base] > 1 ? base + '-' + used[base] : base;
        }
        var li = d.createElement('li');
        li.className = 'lvl-' + h.tagName.charAt(1);
        var a = d.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent.trim();
        li.appendChild(a);
        ul.appendChild(li);
      });
      tocBox.appendChild(ul);

      if ('IntersectionObserver' in window) {
        var anchors = {};
        $$('a', tocBox).forEach(function (a) { anchors[a.getAttribute('href').slice(1)] = a; });
        var visible = [];
        var spy = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            var id = en.target.id;
            var i = visible.indexOf(id);
            if (en.isIntersecting && i === -1) visible.push(id);
            if (!en.isIntersecting && i !== -1) visible.splice(i, 1);
          });
          if (!visible.length) return;
          var order = heads.map(function (h) { return h.id; });
          var current = visible.slice().sort(function (a, b) { return order.indexOf(a) - order.indexOf(b); })[0];
          Object.keys(anchors).forEach(function (k) { anchors[k].classList.toggle('is-active', k === current); });
        }, { rootMargin: '-90px 0px -65% 0px' });
        heads.forEach(function (h) { spy.observe(h); });
      }
    } else {
      tocBox.classList.add('hidden');
    }
  }

  // Tutte le dispense di un elenco, esercitazioni comprese
  function conEsercitazioni(list) {
    var out = [];
    (list || []).forEach(function (a) { out.push(a); out.push.apply(out, a.esercitazioni || []); });
    return out;
  }
  function pubblicate(list) { return conEsercitazioni(list).filter(function (a) { return !!a.f; }).length; }

  /* ------------------------ HOME: dispense pubblicate per ogni anno */
  if (window.DISPENSE) {
    $$('[data-count]').forEach(function (el) {
      var y = window.DISPENSE[el.getAttribute('data-count')];
      var n = y ? pubblicate(y.teoria) + pubblicate(y.laboratorio) : 0;
      el.textContent = n === 0 ? 'In preparazione'
        : n === 1 ? '1 dispensa pubblicata'
        : n + ' dispense pubblicate';
      el.classList.toggle('is-empty', n === 0);
    });
  }

  /* ====================================================================== */
  /* ========================= PAGINA ANNO: elenco ========================= */
  /* ====================================================================== */
  var host = $('#modules');
  if (!host || !window.DISPENSE) return;

  var yearKey = host.getAttribute('data-year');
  var year = window.DISPENSE[yearKey];
  if (!year) {
    host.innerHTML = '<div class="empty-state"><b>Anno non trovato</b>Controlla l\'attributo data-year in questa pagina.</div>';
    return;
  }

  var SEZIONI = [
    { key: 'teoria',      titolo: 'Teoria' },
    { key: 'laboratorio', titolo: 'Laboratorio' }
  ];
  // --- statistiche: un contatore per sezione
  var statsBox = $('#stats');
  if (statsBox) {
    statsBox.innerHTML = SEZIONI.map(function (s) {
      return '<span class="stat-pill"><b>' + pubblicate(year[s.key]) + '</b> ' + s.titolo.toLowerCase() + '</span>';
    }).join('');
  }

  function rowHtml(a, num, es) {
    var cls = 'arg-row' + (es ? ' is-sub is-es' : /\./.test(String(num)) ? ' is-sub' : '');
    var inner =
      '<span class="arg-num">' + esc(num) + '</span>' +
      '<span class="arg-title">' + esc(a.t) +
        (es ? ' <span class="badge-es">Esercitazione</span>' : '') +
        (a.f ? '' : ' <span class="badge-soon">In preparazione</span>') +
      '</span>' +
      (a.f ? '<span class="arg-arrow">' + ICON_ARROW + '</span>' : '');

    return a.f
      ? '<li><a class="' + cls + '" href="' + esc(a.f) + '">' + inner + '</a></li>'
      : '<li><div class="' + cls + ' is-draft" aria-disabled="true">' + inner + '</div></li>';
  }

  // Un modulo seguito dalle sue esercitazioni, numerate 1.1, 1.2…
  function argHtml(a) {
    return rowHtml(a, a.num, false) + (a.esercitazioni || []).map(function (e, i) {
      return rowHtml(e, a.num + '.' + (i + 1), true);
    }).join('');
  }

  // Messaggi per gli studenti (per aggiungere argomenti: assets/js/dispense.js)
  host.innerHTML = SEZIONI.map(function (s) {
    var items = year[s.key] || [];
    var body = items.length
      ? '<ul class="arg-list reveal">' + items.map(argHtml).join('') + '</ul>'
      : '<div class="empty-state"><b>Le dispense di ' + s.titolo.toLowerCase() + ' sono in preparazione</b>' +
        'Torna a trovarci: compariranno qui man mano che vengono pubblicate.</div>';
    return '<section class="arg-section" id="' + s.key + '" aria-labelledby="h-' + s.key + '">' +
      '<h2 class="arg-section-title" id="h-' + s.key + '">' + s.titolo + '</h2>' + body + '</section>';
  }).join('');
  $$('.reveal', host).forEach(function (el) { el.classList.add('is-in'); });
})();
