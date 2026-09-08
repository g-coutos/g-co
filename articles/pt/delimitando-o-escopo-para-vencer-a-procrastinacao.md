---
title: "Delimitando o Escopo pra Vencer a Procrastinação"
description: "Como eu delimitei o escopo do meu projeto pessoal pra superar a procrastinação e entregar um produto de valor."
date: "2026-05-26"
tags: ["product engineering"]
published: true
---

Desde que comecei a estudar sobre desenvolvimento de software, tive vontade de ter um blog pessoal pra poder compartilhar meus aprendizados. Depois de algum tempo atuando na área, vi que tinha o conhecimento pra criá-lo do zero e demonstrar minhas habilidades técnicas. 

O início de um projeto sempre é uma alegria: escolhi a stack, modelei as tabelas do banco, decidi onde hospedar os serviços... tudo parecia perfeito. O problema é que a complexidade começou a crescer e meu tempo e vontade de continuar atuando em um *side project* que deveria ser simples e rápido logo acabaram. 

Ou seja, procrastinei. Foi então que senti a dor de ter um produto pela metade que não me gerava valor nenhum.

## Delimitando o Escopo
Tive que dar um passo pra trás e entender qual produto eu realmente precisava. Foi assim que delimitei o escopo:
- De um autor;
- Que tivesse boas métricas de performance e SEO;
- Que me permitisse escrever em Markdown.

Esse produto já atenderia à minha necessidade inicial: ter um blog pessoal pra compartilhar meus conhecimentos. Essa delimitação me tirou do ciclo de *overengineering* que tinha entrado. 

## Decisões Técnicas
O bom de se ter um escopo definido é que as decisões técnicas são tomadas com mais facilidade. Aqui compartilho as minhas pra esse produto:

O blog tem só um autor (eu). Só eu posso contribuir com o repo, os artigos não contêm informações sensíveis, e a frequência de postagens será baixa o suficiente pra não me preocupar com infraestrutura agora. 

Isso significa que:
1. Não preciso de uma camada de autenticação;
2. Não preciso de um ambiente de admin;
3. Não preciso de um componente de editor Markdown (se você já precisou de um, sabe do que estou falando);
4. Não preciso de uma base de dados pra guardar os artigos;
5. Não preciso de um serviço de backend.

A decisão foi simplificar hospedando os arquivos .md dentro do NextJS e fazendo com que as páginas de cada artigo fossem pré-geradas no build, ganhando em performance, custo, SEO e resiliência do sistema. Quando tiver um número maior de artigos, posso pensar em outra solução.

O Next.js já vem com muita coisa pronta e se encaixou bem no que eu precisava: performance, SEO e pouca configuração.

## Claude Code
Confesso que já fui cético em relação a Coding Agents, mas decidi seguir um conselho que vi no LinkedIn: *"Teste o Claude Code em um projeto pessoal"*. Eu fiz isso e... wow! 

Quando utilizei técnicas de *Prompt Engineering* com o escopo bem definido do projeto, pude acelerar o desenvolvimento e, além disso, adicionar features que não estavam no escopo inicial, mas que fizeram muito sentido, como a filtragem dos artigos por tags de assunto. 

## Conclusão
Bom, esse projeto me ajudou a ver a essência do porquê faço o que faço: o produto. Sem produto, não há valor. O software é feito pra ser utilizado. Se não for, ele serve pra quê? 

Na era da inteligência artificial, não acredito que seremos substituídos. Decisões técnicas e de produto ainda precisam ser tomadas. 

Creio que somos convidados a mudar um pouco o foco. Do purismo do código pro produto. Pro usuário. Pra acessibilidade. Esse é o caminho que quero seguir.

--- 

\* *Esse texto foi escrito por um humano.*

\** *Esse foi meu primeiro post, espero que seja de muitos. Te vejo no próximo!*
