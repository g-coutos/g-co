---
id: 43f17ba9-324b-427e-a64b-821ecd5fb9ad
title: "Voltando aos Fundamentos: Pilhas e Valid Parentheses"
description: "Por que decidi estudar algoritmos e estruturas de dados num livro físico, e como usei pilhas pra resolver o Valid Parentheses do LeetCode."
date: "2026-09-14"
tags: ["algorithms"]
published: true
---
Em plena era de AI, decidi focar meus estudos nos fundamentos, seguindo a premissa de que eles nunca mudam e fortalecem minha capacidade de resolução de problemas, uma skill preciosa pra qualquer engenheiro.

Quero fechar os gaps que ainda tenho e nada melhor do que começar aprendendo algoritmos e estruturas de dados direito.

Para a surpresa dos tokenmaxxers, estou usando um livro físico pra isso, caso te interesse, é esse:

![Estrutura de Dados e Algoritmos com JavaScript, de Loiane Groner](/articles/images/43f17ba9-324b-427e-a64b-821ecd5fb9ad/IMG_0757.webp)
> *Estrutura de dados e algoritmos com JavaScript – Loiane Groner:*

---

Geralmente, quando leio sobre assuntos técnicos, sinto que realmente aprendi quando entendo sua aplicação prática. Pra me ajudar nisso, escolhi um exercício bem tradicional do LeetCode: o [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/).

## O problema

No enunciado original:

> Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.
>
> An input string is valid if:
> 1. Open brackets must be closed by the same type of brackets.
> 2. Open brackets must be closed in the correct order.
> 3. Every close bracket has a corresponding open bracket of the same type.

```
Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false

Example 4:
Input: s = "([])"
Output: true

Example 5:
Input: s = "([)]"
Output: false
```

## Pilhas

O conceito básico de uma pilha é chamado de *LIFO* (Last In First Out). Conceitualmente, temos alguns exemplos do mundo real que podem ajudar a entender esse conceito, como uma pilha de livros.

Aplicado a esse problema, as operações de uma pilha entram assim:
- **Push:** ao encontrar um bracket de abertura, empilho ele.
- **Peek:** ao encontrar um bracket de fechamento, olho o topo da pilha pra ver se ele forma um par válido.
- **Pop:** se formar par válido, removo o item do topo.
- **IsEmpty:** no final do percurso, verifico se a pilha ficou vazia — se sim, todos os brackets foram fechados corretamente.

Quando um bracket é aberto, ele precisa ser fechado pelo mais recente aberto ainda não fechado, não pelo mais antigo. Por exemplo, em "([])":
- Ao percorrer essa string, você abre `(` e depois `[`
- Fecha `]`: precisa corresponder ao `[` (o último aberto)
- Fecha `)`: precisa corresponder ao `(` mais recente (o próximo mais recente)

A ordem de "o último que entrou é o primeiro que sai" é literalmente a definição de *LIFO*.

## Resolução

Antes de escrever código, gosto de escrever um passo a passo em linguagem natural, quebrando o problema em partes menores. Isso me ajuda a entender melhor o que precisa ser feito:

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
	// Declare a stack (array)
	// Declare opening bracket let
	// Declare closing bracket let
	// Declare brackets_map
	
	// Split the string into an array
	
	// Iterate the split string
		// If the item is an opening bracket 
		// Push it into the stack
		// If the item is a closing bracket
			// Check if the stack's last item has a valid closing pair
				// If true, pop the last item from stack
				// If not, return false
				
	// After the loop, check if the stack is empty
		// If true, return true
		// If false, return false
};
```

Depois de definir tudo, substituir pelo código fica bem mais fácil:

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let stack = [];

    const opening = '({[';
    const closure = ']})';

    let brackets_map = {
        '(': ')',
        '{': '}',
        '[': ']',
    }

    let arr = s.split('');

    for (let i = 0; i < arr.length; i++) {
        if (opening.includes(arr[i])) {
            stack.push(arr[i]);
        }

        if (closure.includes(arr[i])) {
            if (brackets_map[stack[stack.length - 1]] === arr[i]) {
                stack.pop();
            } else {
                return false;
            }
        }
    }

    if (stack.length === 0) return true;

    return false;
};
```

## Complexidade

- **Tempo:** O(n): a string é percorrida uma única vez, e cada operação de pilha (push/pop) é O(1).
- **Espaço:** O(n): no pior caso, quando a string é só de brackets de abertura, a pilha cresce até o tamanho da string.

## Conclusão

Estar lendo um livro físico sobre algoritmos e codando sem IA é muito bom. Utilizar coding agents diariamente me deu *AI brain fry* (sim, inventaram um termo pra isso).

Pretendo continuar estudando, fortalecendo meus conhecimentos na base. Considero esses assuntos importantes. Ainda precisamos ter o ownership sobre nosso código e nossas decisões. Terceirizar isso pra IA pode ter custos elevados no longo prazo.

---

\* *Esse texto e código foiram escritos por um humano.*
