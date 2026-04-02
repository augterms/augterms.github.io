/* ==========================================================
   BLOG MINIMALISTA — JavaScript Principal
   main.js
   
   Funções:
   1. Menu mobile (hambúrguer)
   2. Link ativo na navegação
   3. Filtro de cards por categoria
   ========================================================== */


/* ----------------------------------------------------------
   1. MENU MOBILE
   Alterna a classe 'aberto' na lista de navegação
   ---------------------------------------------------------- */

(function () {
  const toggle = document.querySelector('.nav__toggle');
  const lista  = document.querySelector('.nav__lista');

  if (!toggle || !lista) return;

  toggle.addEventListener('click', function () {
    const estaAberto = lista.classList.toggle('aberto');

    // Atualiza atributo de acessibilidade
    toggle.setAttribute('aria-expanded', estaAberto);

    // Anima as três linhas do hambúrguer para um "X"
    const linhas = toggle.querySelectorAll('span');
    if (estaAberto) {
      linhas[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      linhas[1].style.opacity   = '0';
      linhas[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      linhas[0].style.transform = '';
      linhas[1].style.opacity   = '';
      linhas[2].style.transform = '';
    }
  });

  // Fecha menu ao clicar em qualquer link dentro dele
  lista.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      lista.classList.remove('aberto');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* ----------------------------------------------------------
   2. LINK ATIVO NA NAVEGAÇÃO
   Marca o link do menu que corresponde à página atual
   ---------------------------------------------------------- */

(function () {
  const links = document.querySelectorAll('.nav__link');
  // Pega só o nome do arquivo (ex: "livros.html")
  const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(function (link) {
    const href = link.getAttribute('href').split('/').pop();
    if (href === paginaAtual) {
      link.classList.add('ativo');
    }
  });
})();


/* ----------------------------------------------------------
   3. FILTRO DE CARDS POR CATEGORIA
   
   Como usar:
   - Adicione data-categoria="nome" nos botões de filtro
   - Adicione data-categoria="nome" nos cards correspondentes
   - Inclua a classe 'filtros' no contêiner dos botões
   - Inclua a classe 'grade-cards' no contêiner dos cards
   
   Exemplo de HTML:
   <div class="filtros">
     <button class="filtro-btn ativo" data-categoria="todos">Todos</button>
     <button class="filtro-btn" data-categoria="romance">Romance</button>
   </div>
   <div class="grade-cards">
     <article class="card" data-categoria="romance">...</article>
   </div>
   ---------------------------------------------------------- */

(function () {
  const botoes = document.querySelectorAll('.filtro-btn');

  if (botoes.length === 0) return; // Sai se não houver filtros na página

  botoes.forEach(function (botao) {
    botao.addEventListener('click', function () {
      const categoriaSelecionada = this.dataset.categoria;

      // Atualiza estado visual dos botões
      botoes.forEach(function (b) { b.classList.remove('ativo'); });
      this.classList.add('ativo');

      // Mostra/oculta cards conforme a categoria
      const cards = document.querySelectorAll('.grade-cards .card');
      cards.forEach(function (card) {
        const categoriaCard = card.dataset.categoria;

        if (categoriaSelecionada === 'todos' || categoriaCard === categoriaSelecionada) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });

      // Atualiza o contador de itens visíveis (se existir)
      const contador = document.querySelector('.contador');
      if (contador) {
        const visiveis = document.querySelectorAll('.grade-cards .card:not([style*="none"])').length;
        contador.textContent = visiveis + (visiveis === 1 ? ' item' : ' itens');
      }
    });
  });
})();
