---
id: "37548959-a47e-44d0-ab4a-6aa125a28410"
title: "TIL – PARTITION BY"
description: "Como a cláusula PARTITION BY divide a tabela em grupos dentro de OVER(), calculando agregações por grupo sem colapsar as linhas."
date: "2026-11-24"
tags: [til, sql, window-functions, partition-by]
published: true
---

No artigo anterior vimos o básico de window functions: como o `OVER()` permite calcular valores agregados sem colapsar as linhas do resultado. Agora vamos aprofundar em um dos recursos mais úteis dentro desse `OVER()`: a cláusula `PARTITION BY`, que divide a tabela em grupos antes de aplicar a função.

## `PARTITION BY`

Quando a `PARTITION BY` é utilizada com  `OVER()`, o SQL olha cada linha da tabela, uma por vez. Para cada uma, ele descobre a qual grupo (partição) ela pertence, de acordo com o `PARTITION BY`. Depois calcula a função usando apenas as linhas desse grupo, não a tabela inteira. A diferença para um `GROUP BY` é que **as linhas não são colapsadas**. Cada linha continua aparecendo no resultado, mas ganha uma coluna com um valor calculado a partir do seu grupo. 

A query abaixo compara o salário de cada funcionário com a média salarial de seu respectivo departamento:

```sql
SELECT depname,
	   empno,
	   salary,
	   AVG(salary) OVER (PARTITION BY dep_name) 
FROM empsalary;
```

```
  depname  | empno | salary |          avg
-----------+-------+--------+-----------------------
 develop   |    11 |   5200 | 5020.0000000000000000
 develop   |     7 |   4200 | 5020.0000000000000000
 develop   |     9 |   4500 | 5020.0000000000000000
 develop   |     8 |   6000 | 5020.0000000000000000
 develop   |    10 |   5200 | 5020.0000000000000000
 personnel |     5 |   3500 | 3700.0000000000000000
 personnel |     2 |   3900 | 3700.0000000000000000
 sales     |     3 |   4800 | 4866.6666666666666667
 sales     |     1 |   5000 | 4866.6666666666666667
 sales     |     4 |   4800 | 4866.6666666666666667
(10 rows)
```

O resultado mostra os funcionários divididos por partição. As três primeiras colunas vêm da tabela `empsalary`. A coluna `avg` é gerada pela window function, que retorna a média salarial de cada partição.