# augterms.github.io
# Blog Minimalista — Guia de Uso

Estrutura simples de blog em HTML, CSS e JavaScript puro.
Nenhuma dependência externa. Tudo editado diretamente no código.

---

## Estrutura de pastas

```
blog/
├── index.html           → Página inicial
├── livros.html          → Lista de livros lidos
├── fichamentos.html     → Resumos e anotações de leitura
├── posts.html           → Lista de posts
│
├── posts/
│   └── exemplo-post.html  → Modelo de post individual
│       (duplique este arquivo para cada novo post)
│
├── css/
│   └── style.css          → Todo o estilo visual
│
└── js/
    └── main.js            → Menu mobile + filtros + link ativo
```

---

## Como adicionar conteúdo

### Novo livro (livros.html)
1. Abra `livros.html`
2. Localize o bloco `<!-- MODELO VAZIO -->` ao final da lista
3. Copie o trecho comentado, remova os comentários `<!--` e `-->`
4. Preencha: `data-categoria`, título, autor, descrição, avaliação e data

### Nova categoria de filtro
1. Adicione um `<button class="filtro-btn" data-categoria="nova">Nova</button>`
2. Adicione `data-categoria="nova"` nos cards correspondentes

### Novo post
1. Duplique o arquivo `posts/exemplo-post.html`
2. Renomeie o arquivo (ex: `posts/titulo-do-post.html`)
3. Edite: título, data, categoria, corpo do texto e navegação entre posts
4. Abra `posts.html` e duplique um card `<article class="card">` na lista
5. Atualize o link, título, data e resumo do card

### Novo fichamento (fichamentos.html)
Mesmo processo do livro — localize o `<!-- MODELO VAZIO -->` e duplique.

---

## Personalizações rápidas

Todas as cores, fontes e tamanhos ficam nas **variáveis CSS**,
no topo de `css/style.css`:

```css
:root {
  --cor-fundo:       #f9f7f4;   /* Fundo da página */
  --cor-destaque:    #3d5a47;   /* Verde musgo — cor de acento */
  --fonte-titulo:    Georgia, serif;
  --largura-max:     720px;     /* Largura ideal para leitura */
}
```

Altere apenas esses valores para mudar a identidade visual inteira.

---

## Como visualizar localmente

Abra qualquer `.html` diretamente no navegador, ou use uma extensão
como **Live Server** (VS Code) para recarregar automaticamente ao salvar.
