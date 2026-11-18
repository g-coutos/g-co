---
id: "8444f7be-6445-420e-977e-ea21443e8d8e"
title: "TIL – Subqueries"
description: "O que são subqueries, os tipos existentes (escalar, de linha, de tabela, correlacionada) e quando usar cada uma."
date: "2026-11-18"
tags: ["til", "sql"]
published: true
---

Seguindo a nova série **TIL** aqui do blog, nos últimos dias estou aprofundando meus conhecimentos em SQL e saindo do básico para conceitos mais avançados.

## Subqueries
- Uma subquery é uma query dentro de outra query, geralmente utilizada para transformação de dados.
- Subqueries podem aparecer nas cláusulas `SELECT`, `FROM`, `WHERE` ou `GROUP BY`.
- Elas ajudam a comparar valores sumarizados, reformatar dados e combinar dados de tabelas não relacionáveis.

```sql
-- USE CASE: Find matches where home goals exceed the average
SELECT match_id
FROM match
WHERE home_goals > (
	SELECT AVG(home_goals)
	FROM match
);
```
### `FROM` 
Subqueries no `FROM` possibilitam:
- Reestruturar dados para queries complexas.
- Pré-filtrar dados antes de cálculos.
- Calcular agregações de informações agregadas.

```sql
SELECT team,
       home_avg
FROM (
	SELECT t.long_name      AS team, 
	       AVG(m.home_goal) AS home_avg
	FROM team AS t
	LEFT JOIN match m ON t.team_id = m.hometeam_id
	WHERE m.season = '2011/2012'
	GROUP BY t.long_name
) AS subquery
ORDER BY home_avg DESC
LIMIT 3;
```

### `SELECT`
- Subqueries no `SELECT` retornam um valor agregado único.
- São úteis para incorporar summary values em datasets detalhados.
- Ideais para cálculos complexos, como comparar pontuações individuais com médias.
- Garantia de que a subquery retorna apenas um valor para evitar erros.
- Posiciona corretamente os filtros, tanto nas queries principais quanto nas subqueries.

```sql
-- USE CASE: This query calculates how much each match's goals deviate from the average.
SELECT 
	match_id,
	goals_scored - (SELECT AVG(goals_scored) FROM matches) AS deviation_from_avg
FROM
	matches
WHERE 
	season = '2011/2012';
```
