---
id: "42decda1-6780-4d9e-916e-53decc1f0814"
title: "TIL – Subqueries"
description: "Using subqueries in SQL's SELECT, FROM, and WHERE clauses to compare, reshape, and aggregate data."
date: "2026-11-18"
tags: [til, sql, subqueries]
published: true
---

Following the new **TIL** series here on the blog, over the last few days I've been deepening my SQL knowledge, moving from the basics into more advanced concepts.

## Subqueries
- A subquery is a query nested inside another query, generally used for data transformation.
- Subqueries can appear in the `SELECT`, `FROM`, `WHERE` or `GROUP BY` clauses.
- They help compare summarized values, reshape data, and combine data from tables that aren't directly relatable.

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
Subqueries in `FROM` make it possible to:
- Restructure data for complex queries.
- Pre-filter data before calculations.
- Compute aggregations over already-aggregated information.

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
- Subqueries in `SELECT` return a single aggregated value.
- They're useful for embedding summary values into detailed datasets.
- Ideal for complex calculations, like comparing individual scores against averages.
- Make sure the subquery returns only one value to avoid errors.
- Place filters correctly, both in the main query and in the subqueries.

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
