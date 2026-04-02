# Blog — Guia de Uso (Design v2)

Design inspirado em apps de leitura: sidebar lateral, paleta laranja/âmbar,
capas de livros, fichamentos individuais com layout em duas colunas.

---

## Estrutura de pastas

```
blog/
├── index.html                      → Página inicial
├── livros.html                     → Grade de livros (com capas)
├── fichamentos.html                → Lista de fichamentos
├── posts.html                      → Lista de posts
│
├── fichamentos/
│   ├── vigiar-e-punir.html         → Fichamento individual (2 colunas)
│   ├── a-condicao-humana.html      → Fichamento individual (corpo simples)
│   └── [NOVO-FICHAMENTO].html      → Duplique um dos dois modelos acima
│
├── posts/
│   └── exemplo-post.html           → Post individual (duplique para novos)
│
├── img/
│   └── capas/                      → Coloque aqui as capas dos livros (.jpg/.png)
│
├── css/
│   └── style.css                   → Todo o estilo (12 seções comentadas)
│
└── js/
    └── main.js                     → Sidebar mobile + filtros + link ativo
```

---

## Como adicionar capas de livros

1. Salve a imagem da capa em `img/capas/nome-do-livro.jpg`
2. Em `livros.html`, dentro do `.card-livro__capa`, descomente a tag `<img>`:
   ```html
   <div class="card-livro__capa">
     <img src="img/capas/nome-do-livro.jpg" alt="Capa: Título do Livro" />
   </div>
   ```
3. Pode usar URL externa também:
   ```html
   <img src="https://..." alt="Capa" />
   ```
   Se não houver imagem, o emoji de livro aparece como fallback.

---

## Como adicionar um novo fichamento

1. Copie `fichamentos/vigiar-e-punir.html` (layout em 2 colunas)
   ou `fichamentos/a-condicao-humana.html` (corpo simples)
2. Renomeie o arquivo (ex: `fichamentos/nome-da-obra.html`)
3. Edite: título, autor, categoria, tópicos/tags, corpo do texto
4. Abra `fichamentos.html` e duplique um card `.card-item`,
   atualizando o `href`, título, subtítulo, resumo e data

---

## Como adicionar um novo post

1. Duplique `posts/exemplo-post.html`
2. Renomeie (ex: `posts/titulo-do-post.html`)
3. Edite o conteúdo
4. Abra `posts.html` e duplique um card `.card-item`

---

## Como adicionar um novo livro

1. Abra `livros.html`
2. Localize o bloco `<!-- MODELO VAZIO -->` e copie o trecho comentado
3. Remova os `<!--` e `-->`
4. Preencha: `data-categoria`, capa, título, autor, descrição, nota, avaliação

---

## Personalização rápida (variáveis CSS)

Todas as cores estão em `css/style.css` no início do arquivo:

```css
:root {
  --bege:    #ede3cf;   /* Fundo geral */
  --laranja: #e06c1a;   /* Cor de destaque */
  --amarelo: #f5c842;   /* Barra de busca */
  --fonte-corpo: 'Courier New', monospace;
}
```

---

## Visualizar localmente

Abra qualquer `.html` diretamente no navegador, ou use
a extensão **Live Server** no VS Code para reload automático.

Sem dependências. Sem build. Sem instalação.
