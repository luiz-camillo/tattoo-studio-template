# Prompts para gerar imagens por IA

**Opcional.** Hoje as páginas já usam fotos de banco (ver `CREDITOS.md`).
Use estes prompts só se quiser trocar flashes e pinturas por imagens próprias.

Funciona no ChatGPT (imagem), Ideogram, Adobe Firefly, Leonardo etc.
Os prompts estão em inglês porque os geradores respondem melhor assim.

**Como usar**
1. Gere a imagem e baixe na maior resolução disponível.
2. Salve em `fotos-originais/` com o nome indicado (ex.: `flash-01.png`).
3. Rode `python tools/otimizar-imagens.py` — ele cria as versões do site e
   ajusta o HTML sozinho.

Dica: gere todas as flashes na mesma conversa/sessão e repita o "estilo base"
para elas parecerem do mesmo artista.

---

## Flashes — página "Escolha sua Tatuagem" (12 imagens, vertical 3:4)

**Estilo base** (cole antes de cada assunto):

> Traditional American tattoo flash design, bold clean black outlines, solid
> black shading, limited palette of red, mustard yellow, olive green and black,
> single design centered on aged cream paper, generous margin, flat scan look,
> no text, no letters, no signature, no watermark, vertical 3:4.

| Arquivo | Assunto (acrescente ao estilo base) |
|---|---|
| `flash-01` | a swallow in flight with a small red heart |
| `flash-02` | a single red rose with two green leaves |
| `flash-03` | a dagger piercing a red heart, blank banner without text |
| `flash-04` | a roaring black panther head |
| `flash-05` | a clipper ship on stylized waves |
| `flash-06` | an anchor wrapped in rope |
| `flash-07` | an eagle with spread wings |
| `flash-08` | a snake coiled around a dagger |
| `flash-09` | a skull with a red rose |
| `flash-10` | a woman's head with a headscarf, traditional style |
| `flash-11` | a tiger head, snarling |
| `flash-12` | a black cat with a crescent moon |

## Pinturas — página "Pinturas" (8 imagens, formatos variados)

**Estilo base:**

> Watercolor and ink painting on textured cold-press paper, loose washes,
> confident ink linework inspired by traditional tattoo flash, muted red,
> ochre and teal palette, visible paper texture and edges, no text,
> no signature, no watermark.

| Arquivo | Assunto | Formato |
|---|---|---|
| `pintura-01` | a koi fish swimming among lotus leaves | vertical 3:4 |
| `pintura-02` | two swallows over ocean waves | horizontal 4:3 |
| `pintura-03` | a bouquet of roses in a glass jar | vertical 3:4 |
| `pintura-04` | a lighthouse on a rocky island coast | quadrado 1:1 |
| `pintura-05` | a moth with patterned wings, ink only, sepia | vertical 3:4 |
| `pintura-06` | a tiger resting among tall grass | vertical 4:5 |
| `pintura-07` | a snake among wildflowers | vertical 3:4 |
| `pintura-08` | a sailing ship in a storm, ink only | horizontal 4:3 |

---

## Fotos de banco (não são IA)

Já baixadas do Unsplash — lista e fotógrafos em `CREDITOS.md`:

- `hero` (celular, vertical) e `hero-wide` (desktop, horizontal)
- `sobre` — estúdio com flashes na parede (horizontal)
- `tattoo-01` a `tattoo-12` — tatuagens tradicionais/old school prontas
