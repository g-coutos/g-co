---
id: "c30d2c0a-7d3e-472f-a3b6-b1b9142f2ed0"
title: "TIL – Correlated Subqueries and CTEs"
description: "Correlated and nested subqueries in SQL, and how Common Table Expressions (CTEs) organize complex queries and improve performance."
date: "2026-11-20"
tags: [til, sql, subqueries, cte]
published: true
---

## Correlated Subqueries

Unlike simple subqueries, correlated subqueries are re-executed for each row of the result, which makes them useful for advanced data calculations, but generates potentially slower queries.
- Correlated subqueries depend on the outer query.
- Useful for performing joins, filtering, and advanced data evaluations.
- They can replace joins in certain cases, as in the example below:

```sql
SELECT c.name,
       (SELECT AVG(goals)
        FROM match
        WHERE match.country_id = c.id) AS avg_goals
FROM country c; 
```

## Nested Subqueries
- They are subqueries within other subqueries.
- Executes multiple layers of data transformation.

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
As we add subqueries, the complexity of a query can increase quickly, making it harder and harder to keep track of the information. We can remove a subquery from a query by turning it into a CTE, which solves these problems.

CTEs are a special type of subquery that:
- Is a table declared before the main query.
- Named and referenced in the `FROM` afterwards:
```sql
WITH cte AS (
	SELECT col1, col2
	FROM table
)
SELECT
	avg(col1) AS avg_col
FROM cte;
```

## Why use CTEs?
- They are executed only once:
	- The CTE is stored in memory;
	- Improves query performance.
- They are excellent tools for organizing complex queries. 
- It is possible to declare as many CTEs as needed, one after another. 
- Each CTE can reference information from CTEs declared before it.
- A CTE can reference itself in a special type of table called a recursive CTE.