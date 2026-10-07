# Tattoo Studio Template

Modelo de site para tatuador(a) no estilo **old school e tradicional americano**,
apresentado com um estúdio fictício: **Lu Valente — Andorinha Negra Tattoo**.

**Ver online:** https://SEUUSUARIO.github.io/tattoo-studio-template/

> Projeto demonstrativo. Nome, endereço e contatos são fictícios — os botões de
> WhatsApp, Instagram e mapa exibem um aviso em vez de abrir um link real.

## Recursos

- **Bilíngue** — português e inglês, com seletor de idioma em todas as páginas
- **Responsivo** — pensado para celular e desktop (inclui telas com notch)
- **Páginas**
  - Home com hero, seção "Sobre" e carrossel de trabalhos
  - Tatuagens Feitas — galeria em colunas (masonry)
  - Escolha sua Tatuagem — flashes e desenhos disponíveis
  - Pinturas — galeria de aquarela e nanquim
- **Interação** — menu fullscreen, header que some ao rolar e volta ao subir,
  carrossel infinito com swipe no celular, animações de entrada
- **Leve** — imagens em WebP com tamanhos diferentes para celular e desktop,
  carregamento sob demanda, sem frameworks
- **Acessível** — textos alternativos, navegação por teclado e respeito à
  preferência de "reduzir movimento" do sistema

## Tecnologias

HTML, CSS e JavaScript puros. Fontes do Google Fonts (Anton, Oswald,
EB Garamond e Yellowtail).

## Estrutura

```
docs/                       site publicado (GitHub Pages)
  index.html                home (PT)
  tatuagens-feitas.html
  escolha-sua-tattoo.html
  pinturas.html
  en/                       versão em inglês
  css/style.css
  js/script.js
  images/                   imagens otimizadas (WebP)
tools/otimizar-imagens.py   gera as imagens do site a partir das originais
CREDITOS.md                 créditos das fotos
PROMPTS-IA.md               prompts opcionais para gerar flashes e pinturas
```

## Rodar localmente

Com Python instalado, na pasta do projeto:

```bash
python -m http.server 8080 --directory docs
```

Depois abra http://localhost:8080.

## Trocar as imagens

1. Salve a imagem nova em `fotos-originais/` com o nome do lugar onde ela
   entra — por exemplo `tattoo-03.jpg`, `flash-01.png`, `hero.jpg`.
2. Rode o script (requer `pip install pillow`):

   ```bash
   python tools/otimizar-imagens.py
   ```

O script gera as versões WebP em `docs/images/` e atualiza as dimensões das
imagens no HTML. A pasta `fotos-originais/` não vai para o repositório.

## Publicar no GitHub Pages

Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main` e
pasta `/docs`.

## Créditos

Fotos do [Unsplash](https://unsplash.com) — lista completa de fotógrafos em
[CREDITOS.md](CREDITOS.md).

## Licença

Código sob [MIT](LICENSE) © 2026 Luiz Camillo.

As fotos não fazem parte da licença MIT: seguem a
[Licença Unsplash](https://unsplash.com/license) de cada fotógrafo
(ver [CREDITOS.md](CREDITOS.md)).
