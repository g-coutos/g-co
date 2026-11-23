---
id: "edd89df2-fd5c-46e4-9ec6-8639491850ce"
title: "TIL – Window Functions"
description: "Como window functions calculam agregações com OVER() sem agrupar linhas, evitando subqueries e reduzindo o tempo de processamento."
date: "2026-11-23"
tags: [til, sql, window-functions, subqueries]
published: true
---

- Uma limitação do SQL é a obrigatoriedade de agrupar os resultados ao utilizar aggregation functions.
- Ao tentar recuperar informações adicionais sem realizar o agrupamento em todos os valores que não fazem parte de uma agregação, a consulta retornará um erro.

```sql
SELECT country_id,
	   season,
	   date,
	   AVG(home_goal) AS avg_home
FROM match
GROUP BY country_id;
```

- As window functions podem ser utilizadas para realizar cálculos de agrupamento sem utilizar `GROUP BY`. 
- `GROUP BY` resume e reduz as linhas. Window functions calculam usando o grupo, mas devolvem uma linha para cada linha original. É por isso que ela é útil para criar rankings, totais acumulados e comparar cada linha.

A query a seguir utiliza uma subquery para retornar a média geral de gols numa determinada temporada:

```sql
SELECT
	date,
	(home_goal + away_goal) AS goals,
	(SELECT AVG(home_goal + away_goal)
		FROM match
		WHERE season = '2011/2012'
	) AS overall_avg
FROM match
WHERE season = '2011/2012';
```

Os mesmos resultados são gerados utilizando a cláusula comum a todas as window functions – a cláusula `OVER()`:

```sql
SELECT
	date,
	(home_goal + away_goal) AS goal,
	AVG(home_goal + away_goal) OVER () AS overall_avg
FROM match
WHERE season = '2011/2012';
```

Essa cláusula diz ao SQL: "passe esse valor agregado pra esse conjunto de dados já gerado". Os resultados são idênticos à declaração anterior, com a sintaxe mais simples e **tempo de processamento mais rápido**.