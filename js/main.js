/* =============================================================
   NOUMENON — JavaScript Principal
   main.js
   
   1. Tela de Abertura (Splash) — exibe na primeira visita
   2. Relógio na barra de sistema
   3. Link ativo na navegação
   4. Filtro por categoria (abas)
   5. Busca simples nas listas
   ============================================================= */


/* -------------------------------------------------------------
   1. TELA DE ABERTURA
   Exibe o splash na primeira visita; salva flag no sessionStorage
   para não repetir na mesma sessão ao navegar entre páginas.
   Na home (index.html), o desktop fica oculto até o splash fechar.
   ------------------------------------------------------------- */

(function () {
  const splash   = document.getElementById('splash');
  const desktop  = document.getElementById('desktop');

  // Só existe splash na index.html
  if (!splash) return;

  // Se já viu nesta sessão, pula direto para o desktop
  if (sessionStorage.getItem('noumenon_splash_seen')) {
    splash.remove();
    if (desktop) desktop.style.display = 'flex';
    return;
  }

  // Mostra o desktop mas invisible até a animação acabar
  if (desktop) desktop.style.display = 'flex';

  // Função que fecha o splash com fade-out
  function fecharSplash () {
    splash.classList.add('splash--hidden');
    // Remove do DOM após a transição de 0.45s
    setTimeout(function () {
      splash.remove();
      sessionStorage.setItem('noumenon_splash_seen', '1');
    }, 480);
  }

  // Fechar ao clicar em qualquer lugar do splash
  splash.addEventListener('click', fecharSplash);

  // Fechar ao clicar no botão de fechar (caixa quadrada do Mac)
  var closeBtn = document.getElementById('splash-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation(); // já está dentro do splash; evita double-fire
      fecharSplash();
    });
  }

  // Fechar com tecla Enter ou Espaço (acessibilidade)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
      fecharSplash();
    }
  });
})();


/* -------------------------------------------------------------
   2. RELÓGIO NA BARRA DE SISTEMA
   Atualiza a cada minuto no formato "Mon Aug 26 14:03"
   Para remover: apague este bloco IIFE inteiro.
   ------------------------------------------------------------- */

(function () {
  var el = document.getElementById('relogio');
  if (!el) return;

  var dias   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var meses  = ['Jan','Feb','Mar','Apr','May','Jun',
                'Jul','Aug','Sep','Oct','Nov','Dec'];

  function atualizar () {
    var d = new Date();
    var dd  = String(d.getDate()).padStart(2, '0');
    var hh  = String(d.getHours()).padStart(2, '0');
    var mm  = String(d.getMinutes()).padStart(2, '0');
    el.textContent =
      dias[d.getDay()] + ' ' + meses[d.getMonth()] + ' ' + dd +
      ' ' + hh + ':' + mm;
  }

  atualizar();
  setInterval(atualizar, 30000); // atualiza a cada 30s
})();


/* -------------------------------------------------------------
   3. LINK ATIVO NA NAVEGAÇÃO
   Marca como .active o link que corresponde à página atual.
   Funciona tanto na barra de sistema quanto na janela de navegação.
   ------------------------------------------------------------- */

(function () {
  var pagina = window.location.pathname.split('/').pop() || 'index.html';

  // Links na barra de sistema
  var barLinks = document.querySelectorAll('.desktop__bar-link');
  barLinks.forEach(function (link) {
    var href = (link.getAttribute('href') || '').split('/').pop();
    link.classList.toggle('active', href === pagina);
  });

  // Links na janela de navegação
  var navLinks = document.querySelectorAll('.win__nav-item');
  navLinks.forEach(function (link) {
    var href = (link.getAttribute('href') || '').split('/').pop();
    link.classList.toggle('active', href === pagina);
  });
})();


/* -------------------------------------------------------------
   4. FILTRO POR CATEGORIA (ABAS)
   
   Como usar no HTML:
     <div class="abas">
       <button class="aba-btn ativo" data-categoria="todos">Todos</button>
       <button class="aba-btn" data-categoria="romance">Romance</button>
     </div>
   
   Nos cards:
     <article class="card-livro" data-categoria="romance">
   
   Para nova categoria: adicione um botão e marque os cards.
   ------------------------------------------------------------- */

(function () {
  var botoes = document.querySelectorAll('.aba-btn');
  if (!botoes.length) return;

  botoes.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = this.dataset.categoria;

      // Atualiza estado dos botões
      botoes.forEach(function (b) { b.classList.remove('ativo'); });
      this.classList.add('ativo');

      // Filtra cards em .grade-livros e .grade-lista
      var cards = document.querySelectorAll(
        '.grade-livros [data-categoria], .grade-lista [data-categoria]'
      );

      cards.forEach(function (card) {
        var visivel = cat === 'todos' || card.dataset.categoria === cat;
        card.style.display = visivel ? '' : 'none';
      });
    });
  });
})();


/* -------------------------------------------------------------
   5. BUSCA SIMPLES NAS LISTAS
   
   Adicione ao HTML:
     <div class="busca-secao">
       <input type="search" class="busca-input" placeholder="Buscar…" />
     </div>
   
   Os títulos de .card-item__titulo e .card-livro__titulo são pesquisados.
   ------------------------------------------------------------- */

(function () {
  var input = document.querySelector('.busca-input');
  if (!input) return;

  input.addEventListener('input', function () {
    var termo = this.value.toLowerCase().trim();

    var cards = document.querySelectorAll('.card-item, .card-livro');
    cards.forEach(function (card) {
      var titulo = card.querySelector('.card-item__titulo, .card-livro__titulo');
      if (!titulo) return;
      var texto = titulo.textContent.toLowerCase();
      card.style.display = (!termo || texto.includes(termo)) ? '' : 'none';
    });
  });
})();
