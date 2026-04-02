/* ==========================================================
   BLOG — JavaScript Principal
   main.js
   
   1. Sidebar mobile (toggle)
   2. Link ativo na sidebar
   3. Filtro/abas por categoria
   ========================================================== */


/* ----------------------------------------------------------
   1. SIDEBAR MOBILE
   ---------------------------------------------------------- */

(function () {
  const toggle  = document.querySelector('.sidebar__toggle');
  const sidebar = document.querySelector('.sidebar');
  if (!toggle || !sidebar) return;

  // Abre/fecha a sidebar
  toggle.addEventListener('click', function () {
    const aberta = sidebar.classList.toggle('aberta');
    toggle.setAttribute('aria-expanded', aberta);

    const linhas = toggle.querySelectorAll('span');
    if (aberta) {
      linhas[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      linhas[1].style.opacity   = '0';
      linhas[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      linhas[0].style.transform = '';
      linhas[1].style.opacity   = '';
      linhas[2].style.transform = '';
    }
  });

  // Fecha ao clicar fora da sidebar
  document.addEventListener('click', function (e) {
    if (sidebar.classList.contains('aberta') &&
        !sidebar.contains(e.target) &&
        !toggle.contains(e.target)) {
      sidebar.classList.remove('aberta');
    }
  });
})();


/* ----------------------------------------------------------
   2. LINK ATIVO NA SIDEBAR
   Marca o link que corresponde à página atual
   ---------------------------------------------------------- */

(function () {
  const links = document.querySelectorAll('.sidebar__link');
  const pagina = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(function (link) {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href === pagina) link.classList.add('ativo');
  });
})();


/* ----------------------------------------------------------
   3. FILTRO POR CATEGORIA (abas)
   
   Como usar no HTML:
   <div class="abas">
     <button class="aba-btn ativo" data-categoria="todos">Todos</button>
     <button class="aba-btn" data-categoria="romance">Romance</button>
   </div>
   
   Nos cards: data-categoria="romance"
   ---------------------------------------------------------- */

(function () {
  const botoes = document.querySelectorAll('.aba-btn');
  if (!botoes.length) return;

  botoes.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const cat = this.dataset.categoria;

      botoes.forEach(function (b) { b.classList.remove('ativo'); });
      this.classList.add('ativo');

      // Suporta .grade-livros e .grade-lista
      const cards = document.querySelectorAll(
        '.grade-livros [data-categoria], .grade-lista [data-categoria]'
      );

      cards.forEach(function (card) {
        card.style.display =
          (cat === 'todos' || card.dataset.categoria === cat) ? '' : 'none';
      });
    });
  });
})();
