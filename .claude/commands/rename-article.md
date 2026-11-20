---
description: Renomeia arquivo(s) de artigo usando a slug do campo title do frontmatter
argument-hint: <caminho/do/artigo.md> [outro/artigo.md ...]
allowed-tools: Read, Bash(git mv:*), Bash(mv:*), Bash(git status:*)
---

Para cada caminho em `$ARGUMENTS`:

1. Leia o frontmatter do arquivo e extraia o campo `title`.
2. Gere a slug do `title`:
   - minúsculas;
   - remova acentos/diacríticos (á→a, ã→a, ç→c, é→e, etc.);
   - substitua qualquer sequência de caracteres que não seja `a-z0-9` por um único hífen (`-`);
   - remova hífens do início e do fim.
3. Renomeie o arquivo para `<slug>.md`, mantendo o mesmo diretório:
   - use `git mv` se o arquivo estiver rastreado pelo git;
   - use `mv` se não estiver (ex.: arquivo novo/untracked).
4. Se o nome atual já for igual ao novo nome, não faça nada.

Regras:
- Não altere o conteúdo do arquivo, apenas o nome.
- Se `$ARGUMENTS` estiver vazio, pergunte ao usuário quais arquivos renomear.
- Não invente slug a partir de outra coisa que não seja o campo `title`.

Ao final, liste os renomes feitos (`antigo → novo`) ou informe que nenhum era necessário.
