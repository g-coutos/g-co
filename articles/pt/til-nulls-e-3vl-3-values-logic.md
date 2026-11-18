---
id: "d22d4b0a-b266-40af-8180-e32e1e69f7f6"
title: "TIL – NULLs e 3VL (3 Values Logic)"
description: "Como o SQL lida com NULL através da lógica de três valores (3VL), e por que isso afeta WHERE, HAVING e os operadores AND, OR e NOT."
date: "2026-11-17"
tags: ["til", "sql"]
published: true
---

Bem-vindo(a) a essa nova série de artigos **TIL** (Today I Learned), onde compartilho mini-aprendizados sobre tópicos
que estou aprendendo diáriamente pra migrar pra Data Engineering.

## NULL
- O valor `NULL` é amplamente utilizado em bancos de dados relacionais e representa a ausência de valor em um registro.
- `NULL` pode ser utilizado independentemente do data type da coluna.

## 3VL
- Enquanto a lógica binária tem dois valores (`TRUE` ou `FALSE`), a lógica tridimensional (3VL ou lógica ternária) tem um terceiro valor: `UNKNOWN`.
- Quando temos um valor NULL em uma condição, o resultado desta condição será `UNKNOWN`.

### Cláusula WHERE e HAVING
- O motor do banco de dados retorna apenas as linhas em que a condição seja estritamente `TRUE`. Se a condição resultar em `FALSE` ou `UNKNOWN`, a linha é descartada.
- Para encontrar nulos, é obrigatório o uso dos predicados `IS NULL` ou `IS NOT NULL`.

### UNKNOWN em AND, OR E NOT
Veja como o SQL combina `TRUE`, `FALSE` e `UNKNOWN` nas operações **`AND`**, **`OR`** e **`NOT`**:

**Operador `AND`**
- `TRUE AND TRUE` → `TRUE`
- `TRUE AND FALSE` → `FALSE`
- `TRUE AND UNKNOWN` → **`UNKNOWN`**
- `FALSE AND UNKNOWN` → **`FALSE`** _(o falso "puxa" o resultado)_
- `UNKNOWN AND UNKNOWN` → **`UNKNOWN`**

**Operador `OR`**
- `TRUE OR UNKNOWN` → **`TRUE`** _(o verdadeiro "puxa" o resultado)_
- `FALSE OR FALSE` → `FALSE`
- `FALSE OR UNKNOWN` → **`UNKNOWN`**
- `UNKNOWN OR UNKNOWN` → **`UNKNOWN`**

**Operador `NOT`**
- `NOT TRUE` → `FALSE`
- `NOT FALSE` → `TRUE`
- `NOT UNKNOWN` → **`UNKNOWN`**

### Como lidar com `UNKNOWN`?

- `COALESCE(val1, val2, ...)`: Retorna o primeiro valor da lista que não for `NULL`. Exemplo:
```sql
SELECT COALESCE(
	phone_number, 
	mobile_phone_number, 
	'Not provided'
) AS contact
FROM users;
```
- `ISNULL(val, replacement)`: Substitui o `NULL` por um valor padrão.
- `NULLIF(val1, val2)`: Retorna `NULL` se `val1` for igual a `val2`.