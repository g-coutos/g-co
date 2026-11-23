---
id: "edd89df2-fd5c-46e4-9ec6-8639491850ce"
title: "TIL – Window Functions"
description: "How window functions compute aggregations with OVER() without grouping rows, avoiding subqueries and reducing processing time."
date: "2026-11-23"
tags: [til, sql, window-functions, subqueries]
published: true
---

- One limitation of SQL is the requirement to group the results when using aggregation functions.
- When trying to retrieve additional information without grouping all the values that aren't part of an aggregation, the query will return an error.

```sql
SELECT country_id,
	   season,
	   date,
	   AVG(home_goal) AS avg_home
FROM match
GROUP BY country_id;
```

- Window functions can be used to perform grouping calculations without using `GROUP BY`. 
- `GROUP BY` summarizes and reduces the rows. Window functions calculate using the group, but return a row for each original row. That's why it's useful for creating rankings, running totals, and comparing each row.

The following query uses a subquery to return the overall average of goals in a given season:

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

The same results are generated using the clause common to all window functions – the `OVER()` clause:

```sql
SELECT
	date,
	(home_goal + away_goal) AS goal,
	AVG(home_goal + away_goal) OVER () AS overall_avg
FROM match
WHERE season = '2011/2012';
```

This clause tells SQL: "pass this aggregated value to this already generated dataset". The results are identical to the previous statement, with simpler syntax and **faster processing time**.