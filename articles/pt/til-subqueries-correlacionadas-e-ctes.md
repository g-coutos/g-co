---
id: "c30d2c0a-7d3e-472f-a3b6-b1b9142f2ed0"
title: "TIL – Subqueries Correlacionadas e CTEs"
description: "Subqueries correlacionadas e aninhadas no SQL, e como Common Table Expressions (CTEs) organizam queries complexas e melhoram performance."
date: "2026-11-20"
tags: [til, sql, subqueries, cte]
published: true
---

## Subqueries Correlacionadas

Diferentemente de subqueries simples, subqueries correlacionadas são re-executadas para cada linha do resultado, o que as torna úteis para cálculos de dados avançados, mas gerando queries potencialmente mais lentas.
- Subqueries correlacionadas dependem da query externa.
- Útil para realizar joins, filtragens e avaliações de dados de forma avançada.
- Podem substituir joins em certos casos, como no exemplo abaixo:

```sql
SELECT c.name,
       (SELECT AVG(goals)
        FROM match
        WHERE match.country_id = c.id) AS avg_goals
FROM country c; 
```

## Subqueries Aninhadas
- São subqueries dentro de outras subqueries.
- Executa múltiplas camadas de transformação dos dados.

```sql
SELECT month, 
       SUM(goals) - (SELECT AVG(monthly_goals) 
FROM (SELECT 
	  	EXTRACT(MONTH FROM date) AS month, 
	    SUM(goals) AS monthly_goals 
	  FROM matches 
	  GROUP BY month) AS subquery) AS goal_difference
FROM matches
GROUP BY month;
```
## Common Table Expressions (CTEs)
Ao adicionar subqueries, a complexidade de uma query pode aumentar rápido, fazendo com que acompanhar a informação fique cada vez mais difícil. Podemos remover uma subquery de uma query, transformando-a em uma CTE, o que resolve esses problemas.

As CTEs são um tipo especial de subquery que:
- É uma tabela declarada antes da query principal.
- Nomeada e referenciada no `FROM` depois:
```sql
WITH cte AS (
	SELECT col1, col2
	FROM table
)
SELECT
	avg(col1) AS avg_col
FROM cte;
```

## Por que utilizar CTEs?
- São executadas apenas uma vez:
	- CTE é guardada na memória;
	- Melhora a performance da query.
- São ferramentas excelentes para organizar queries complexas. 
- É possível declarar quantas CTEs forem necessárias, uma após a outra. 
- Cada CTE pode referenciar informações de CTEs declaradas antes.
- Uma CTE pode referenciar a si mesma em um tipo especial de tabela chamada de CTE recursiva.