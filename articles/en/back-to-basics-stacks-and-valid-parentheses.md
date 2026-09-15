---
id: 43f17ba9-324b-427e-a64b-821ecd5fb9ad
title: "Back to Basics: Stacks and Valid Parentheses"
description: "Why I decided to study algorithms and data structures with a physical book, and how I used stacks to solve LeetCode's Valid Parentheses."
date: "2026-09-14"
tags: ["algorithms", "data-structures"]
published: true
---

In the middle of the AI era, I decided to focus my studies on the fundamentals, working from the premise that they never change and that they strengthen my problem-solving ability, a precious skill for any engineer.

I want to close the gaps I still have, and there's no better way to start than by properly learning algorithms and data structures.

To the surprise of the tokenmaxxers, I'm using a physical book for this. In case you're interested, here it is:

![Data Structures and Algorithms with JavaScript, by Loiane Groner](/articles/images/43f17ba9-324b-427e-a64b-821ecd5fb9ad/IMG_0757.webp)
> *Data Structures and Algorithms with JavaScript – Loiane Groner*

---

Usually, when I read about technical subjects, I feel like I've really learned something once I understand its practical application. To help with that, I picked a pretty classic LeetCode exercise: [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/).

## The problem

From the original statement:

> Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.
>
> An input string is valid if:
> 1. Open brackets must be closed by the same type of brackets.
> 2. Open brackets must be closed in the correct order.
> 3. Every close bracket has a corresponding open bracket of the same type.

| # | Input        | Output  |
| - | ------------ | ------- |
| 1 | `s = "()"`   | `true`  |
| 2 | `s = "()[]{}"` | `true`  |
| 3 | `s = "(]"`   | `false` |
| 4 | `s = "([])"` | `true`  |
| 5 | `s = "([)]"` | `false` |

## Stacks

The basic concept of a stack is called *LIFO* (Last In First Out). Conceptually, there are a few real-world examples that help with understanding this concept, like a stack of books.

Applied to this problem, the stack operations play out like this:
- **Push:** when I run into an opening bracket, I push it onto the stack.
- **Peek:** when I run into a closing bracket, I check the top of the stack to see if it forms a valid pair.
- **Pop:** if it forms a valid pair, I remove the item from the top.
- **IsEmpty:** at the end of the traversal, I check whether the stack ended up empty — if so, every bracket was closed correctly.

When a bracket is opened, it needs to be closed by the most recently opened one that hasn't been closed yet, not by the oldest one. For example, in "([])":
- As you traverse this string, you open `(` and then `[`
- Close `]`: it needs to match `[` (the last one opened)
- Close `)`: it needs to match the most recent `(` (the next most recent)

The order of "last in, first out" is literally the definition of *LIFO*.

## Solving it

Before jumping straight into code, I like to write a step-by-step outline in plain language, breaking the problem into smaller pieces. This helps me better understand what actually needs to be done:
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

Once everything is laid out, swapping it in for real code becomes a lot easier:

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

## Complexity

- **Time:** O(n) — we traverse the string once, and each stack operation (push/pop) is O(1).
- **Space:** O(n) — in the worst case, when the string is made up entirely of opening brackets, the stack grows to the size of the string.

## Conclusion

Reading a physical book about algorithms and coding without AI feels really good. Using coding agents on a daily basis had given me AI brain fry (yes, they came up with a term for this).

I intend to keep studying, strengthening my foundational knowledge. I consider these subjects important. We still need ownership over our code and our decisions. Outsourcing that to AI can carry a high cost down the road.

---

\* *This text and code was written by a human.*