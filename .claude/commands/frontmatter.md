---
description: Cria o frontmatter de um artigo novo (id, título, descrição, data, tags, published)
argument-hint: <caminho/do/artigo.md>
allowed-tools: Read, Edit, Bash(uuidgen:*), Bash(date:*)
---

Leia o arquivo @$ARGUMENTS e adicione um frontmatter no topo dele.

Valores gerados pelo sistema (use exatamente como estão):
- id: !`uuidgen` (escreva em minúsculas)
- date: !`date +%F`

Formato do frontmatter:

---
id: "<id acima>"
title: "<título>"
description: "<descrição>"
date: "<date acima>"
tags: [<tags>]
published: true
---

Regras:
- Se o artigo já tiver um frontmatter em uma dos idiomas [@articles/en/ | @articles/pt/], replique os dados comuns e altere apenas a description e o title conforme necessário, mantendo o mesmo id, date e published.
- Baseie `title`, `description` e `tags` somente no corpo do artigo (títulos de seção, texto e exemplos de código).
- `title`: se o artigo for da série TIL, use o padrão "TIL – <Assunto>" (ex.: "TIL – Subqueries"). Caso contrário, use um título curto e direto.
- `description`: uma frase no idioma do artigo, no máximo 160 caracteres, dizendo o que o artigo realmente cobre. Cite só conceitos que aparecem no corpo. Não prometa conteúdo que não esteja no texto e não use frases genéricas como "everything you need to know".
- `tags`: minúsculas, de 2 a 5, apenas assuntos tratados no corpo (ex.: `til`, `sql`).
- Não altere o corpo do artigo.
- Se o arquivo já começar com um frontmatter (`---`), não edite nada: avise que ele já existe e mostre-o.

Depois de editar, mostre o frontmatter criado.