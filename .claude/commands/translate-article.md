---
description: Traduz um artigo técnico do blog de pt-BR para en-US, sem alterar o conteúdo e preservando blocos de código byte a byte
argument-hint: <caminho-do-artigo-pt-br.md>
allowed-tools: Read, Write, Bash(python3:*), Bash(diff:*)
---

Traduza o artigo em `$1` de português do Brasil (pt-BR) para inglês americano (en-US).

Arquivo de saída: deve ser salvo na em @articles/en/ com o nome traduzido do arquivo original.

## Regra principal

Você é um **tradutor, não um editor**. Traduza apenas o texto; não altere, adicione, remova, reordene, resuma, explique nem "melhore" nenhuma informação.

## Regras

### Conteúdo
- Mantenha exatamente o mesmo número de títulos, parágrafos, itens de lista e blocos de código, na mesma ordem e com o mesmo nível de hierarquia.
- Não adicione exemplos, contexto, observações do tradutor, introduções ou conclusões.
- Não corrija nem reescreva o conteúdo técnico do original. Se achar um erro factual ou de digitação no original, traduza o sentido como está e liste o problema no relatório final. Não corrija no arquivo.
- Mantenha o tom do original: direto, didático e informal-técnico, em primeira pessoa quando o original estiver em primeira pessoa.
- Use a terminologia técnica padrão em inglês (ex.: "subquery", "CTE", "join", "query" permanecem como estão; "linha" → "row", "tabela" → "table", "filtragem" → "filtering").
- Termos que já estão em inglês no original permanecem iguais.

### Blocos de código (regra crítica)
- Todo conteúdo entre cercas de código (``` ou ~~~), incluindo a linha da cerca com o identificador de linguagem, deve ser copiado com **fidelidade exata, byte a byte**: mesma indentação (tabs continuam tabs), espaços no fim de linha, linhas em branco, maiúsculas/minúsculas, aliases, pontuação e quebras de linha.
- Isso inclui comentários e strings dentro do código: **não traduza**, mesmo que estejam em português.
- Não reformate, não "arrume" a indentação e não normalize espaços.
- **Código inline** (entre crases, como `FROM`) também não é traduzido nem alterado.
- Nomes de funções, colunas, tabelas, variáveis, comandos, flags, URLs e caminhos de arquivo nunca são traduzidos.

### Frontmatter (YAML)
- Preserve a estrutura, a ordem e as chaves exatamente como estão.
- Traduza apenas os valores de `title` e `description`.
- Mantenha **idênticos** os valores de `id`, `date`, `tags` e `published` (e qualquer outra chave não citada aqui).
- Mantenha as aspas e o formato originais dos valores.
- Em `title`, preserve prefixos e separadores (ex.: "TIL – ...") e traduza só o restante.

### Markdown
- Preserve toda a sintaxe: níveis de título (`##`), marcadores de lista, indentação de listas aninhadas (inclusive tabs), negrito, itálico, links, imagens e linhas em branco.
- Em links e imagens, traduza apenas o texto visível/alt text. Mantenha as URLs intactas.
- Mantenha o fim de arquivo igual ao original (com ou sem newline final).

## Procedimento

1. Leia o arquivo original com `Read`.
2. Escreva a tradução no arquivo de saída com `Write`.
3. **Verifique os blocos de código** rodando o script abaixo (substitua `ORIG` e `TRAD` pelos caminhos reais). Ele extrai os blocos de ambos os arquivos e compara byte a byte, além de comparar a estrutura (nº de títulos, itens de lista e blocos) e as chaves do frontmatter:

```bash
python3 - ORIG TRAD <<'PY'
import re, sys

def load(p):
    with open(p, encoding="utf-8", newline="") as f:
        return f.read()

orig, trad = load(sys.argv[1]), load(sys.argv[2])
fence = re.compile(r"^(```|~~~)[^\n]*\n.*?^\1[ \t]*$", re.S | re.M)
ok = True

# 1) Blocos de código idênticos
a, b = [m.group(0) for m in fence.finditer(orig)], [m.group(0) for m in fence.finditer(trad)]
if len(a) != len(b):
    print(f"ERRO: {len(a)} blocos no original vs {len(b)} na tradução"); ok = False
else:
    for i, (x, y) in enumerate(zip(a, b), 1):
        if x != y:
            print(f"ERRO: bloco {i} difere"); ok = False

# 2) Estrutura fora dos blocos
def outside(t): return fence.sub("", t)
def count(pat, t): return len(re.findall(pat, outside(t), re.M))
for name, pat in [("títulos", r"^#{1,6} "), ("itens de lista", r"^\s*[-*+] "), ("itens numerados", r"^\s*\d+\. ")]:
    x, y = count(pat, orig), count(pat, trad)
    if x != y:
        print(f"ERRO: {name}: {x} vs {y}"); ok = False

# 3) Frontmatter: chaves e valores que não devem mudar
def fm(t):
    m = re.match(r"^---\n(.*?)\n---\n", t, re.S)
    return dict(re.findall(r"^(\w+):\s*(.*)$", m.group(1), re.M)) if m else {}
fo, ft = fm(orig), fm(trad)
if list(fo) != list(ft):
    print("ERRO: chaves do frontmatter diferem"); ok = False
for k in fo:
    if k not in ("title", "description") and fo[k] != ft.get(k):
        print(f"ERRO: frontmatter '{k}' mudou"); ok = False

# 4) Código inline idêntico
inline = lambda t: re.findall(r"`[^`\n]+`", outside(t))
if inline(orig) != inline(trad):
    print("ERRO: código inline difere"); ok = False

print("OK" if ok else "FALHOU")
sys.exit(0 if ok else 1)
PY
```

4. Se o script apontar qualquer erro, corrija o arquivo de saída e rode a verificação de novo. Repita até aparecer `OK`.

## Relatório final

Responda de forma curta, só com:
- o caminho do arquivo gerado;
- o resultado da verificação;
- uma lista de problemas encontrados no original (erros de digitação, gramática ou conteúdo), se houver, para o autor decidir o que corrigir. Não os corrija na tradução.