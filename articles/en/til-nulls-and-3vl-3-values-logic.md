---
id: "941ae6e0-feea-4935-a38a-cab826ff053c"
title: "TIL – NULLs and 3VL (3 Values Logic)"
description: "How SQL handles NULL through three-valued logic (3VL), and why it quietly affects WHERE, HAVING, and the AND, OR and NOT operators."
date: "2026-11-17"
tags: ["til", "sql"]
published: true
---

Welcome to this new **TIL** (Today I Learned) series, where I share mini-learnings on topics
I'm studying daily to migrate into Data Engineering.

## NULL
- The `NULL` value is widely used in relational databases and represents the absence of a value in a record.
- `NULL` can be used regardless of the column's data type.

## 3VL
- While binary logic has two values (`TRUE` or `FALSE`), three-valued logic (3VL or ternary logic) has a third value: `UNKNOWN`.
- When a condition involves a NULL value, the result of that condition will be `UNKNOWN`.

### WHERE and HAVING clauses
- The database engine only returns rows where the condition is strictly `TRUE`. If the condition evaluates to `FALSE` or `UNKNOWN`, the row is discarded.
- To find nulls, you must use the `IS NULL` or `IS NOT NULL` predicates.

### UNKNOWN in AND, OR and NOT
See how SQL combines `TRUE`, `FALSE` and `UNKNOWN` in the **`AND`**, **`OR`** and **`NOT`** operations:

**`AND` operator**
- `TRUE AND TRUE` → `TRUE`
- `TRUE AND FALSE` → `FALSE`
- `TRUE AND UNKNOWN` → **`UNKNOWN`**
- `FALSE AND UNKNOWN` → **`FALSE`** _(the false "pulls" the result)_
- `UNKNOWN AND UNKNOWN` → **`UNKNOWN`**

**`OR` operator**
- `TRUE OR UNKNOWN` → **`TRUE`** _(the true "pulls" the result)_
- `FALSE OR FALSE` → `FALSE`
- `FALSE OR UNKNOWN` → **`UNKNOWN`**
- `UNKNOWN OR UNKNOWN` → **`UNKNOWN`**

**`NOT` operator**
- `NOT TRUE` → `FALSE`
- `NOT FALSE` → `TRUE`
- `NOT UNKNOWN` → **`UNKNOWN`**

### How to handle `UNKNOWN`?

- `COALESCE(val1, val2, ...)`: Returns the first value in the list that is not `NULL`. Example:
```sql
SELECT COALESCE(
	phone_number, 
	mobile_phone_number, 
	'Not provided'
) AS contact
FROM users;
```
- `ISNULL(val, replacement)`: Replaces `NULL` with a default value.
- `NULLIF(val1, val2)`: Returns `NULL` if `val1` equals `val2`.
