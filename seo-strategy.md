# SEO Strategy - CodeHelper.me

> Dati: Google Search Console, ultimi 3 mesi (dic 2025 - mar 2026)
> Ultimo aggiornamento: 5 marzo 2026

## Snapshot Attuale

| Metrica | Valore |
|---------|--------|
| Click totali | ~228 |
| Impressioni totali | ~25,537 |
| CTR medio | 0.89% |
| Posizione media | 14.4 |
| Desktop | 84% del traffico |
| Mercato #1 | USA (10K imp, 32 click) |
| Rich Results | ZERO |
| Trend | In crescita (50 → 760 imp/giorno) |

---

## FASE 1 - Quick Wins (Impatto Immediato)

### 1.1 Riscrivere Title e Meta Description delle Top Pages

Le pagine con piu impressioni hanno CTR quasi zero. Il problema e nei title/description poco attraenti.

| Pagina | Imp | Click | CTR | Pos | Status |
|--------|-----|-------|-----|-----|--------|
| `/articles/mlx-terminal-code` | 5,843 | 4 | 0.07% | 6.98 | [ ] |
| `/articles/ollama-opencode-setup/` | 3,998 | 19 | 0.48% | 7.72 | [ ] |
| `/articles/ram-prices-surge-2026/` | 2,761 | 3 | 0.11% | 8.23 | [ ] |
| `/articles/nft-market-2026/` | 1,800 | 0 | 0% | 8.53 | [ ] |
| `/tools/clip-path-maker/` | 1,360 | 8 | 0.59% | 36.85 | [ ] |
| Homepage `/` | 1,395 | 43 | 3.08% | 13.28 | [ ] |
| `/tools/var-dump-formatter/` | 1,935 | 99 | 5.12% | 6.27 | [ ] |
| `/articles/ai-automation-reality-check/` | 994 | 26 | 2.62% | 6.41 | [ ] |
| `/articles/github-student-pack/` | 735 | 1 | 0.14% | 38.85 | [ ] |
| `/articles/openclaw-saga/` | 511 | 3 | 0.59% | 7.80 | [ ] |

**Title proposti:**

- `mlx-terminal-code` → `MLX + Qwen2 1.5B on M1 Mac: Real Speed Benchmarks & Setup Guide`
- `ollama-opencode-setup` → `How to Connect OpenCode to Ollama: Step-by-Step Local AI Setup`
- `ram-prices-surge-2026` → `Why RAM Prices Are Soaring in 2026: DRAM Market Analysis & Forecast`
- `nft-market-2026` → `NFT Market Trends 2026: Recovery, Crash, or New Normal?`
- `clip-path-maker` → `CSS Clip-Path Generator – Free Visual Editor & Code Export`
- `var-dump-formatter` → `PHP var_dump() Formatter & Beautifier – Free Online Tool`
- `ai-automation-reality-check` → `AI Fails at 96% of Jobs? The Reality Behind the Headlines`
- `github-student-pack` → `GitHub Student Developer Pack 2026: Complete List of Free Tools`

**File da modificare:** `utils/articlesRegistry.ts`, `utils/toolRegistry.ts`

### 1.2 Fixare Redirect Trailing Slash

Pagine che appaiono sia con che senza slash, disperdendo segnali SEO:

- [ ] `/articles/mlx-terminal-code` (403 imp) → deve fare 301 a `/articles/mlx-terminal-code/`
- [ ] `/resources/css-frameworks` (33 imp) vs `/resources/css-frameworks/` (384 imp)
- [ ] `/resources/angular-ui-libraries` (97 imp) vs `/resources/angular-ui-libraries/` (77 imp)
- [ ] `/resources/animation-js-libraries` (24 imp) vs `/resources/animation-js-libraries/` (24 imp)
- [ ] `/tools/url-encoder-decoder` (20 imp) vs `/tools/url-encoder-decoder/` (26 imp)
- [ ] `http://codehelper.me/resources/apis/music/` (22 imp) → redirect HTTP→HTTPS
- [ ] Verificare configurazione `nuxt.config.ts` per trailing slash enforcement

**File da modificare:** `nuxt.config.ts`, configurazione hosting/deploy

### 1.3 Fixare Dati Strutturati (Rich Results = 0)

- [ ] Validare JSON-LD SoftwareApplication (tools) con Google Rich Results Test
- [ ] Validare JSON-LD TechArticle (articoli) con Google Rich Results Test
- [ ] Validare BreadcrumbList schema
- [ ] Fixare eventuali errori trovati
- [ ] Aggiungere FAQPage schema alle pagine con piu query long-tail

Pagine per FAQ schema:
- [ ] `ollama-opencode-setup` (molte query "how to connect...")
- [ ] `github-student-pack` (molte query "is it free", "what tools...")
- [ ] `mlx-terminal-code` (molte varianti "speed on M1/M1 Pro/M2...")
- [ ] `ram-prices-surge-2026` (molte query "why is ram expensive...")

**File da modificare:** `utils/articlesRegistry.ts` (campo `seo.structuredData`)

---

## FASE 2 - Ottimizzazione Contenuti (1-2 settimane)

### 2.1 Aggiornare Articoli con Dati Temporali

Articoli che Google sta gia mostrando ma che necessitano contenuto fresco:

- [ ] `ram-prices-surge-2026` → aggiornare con dati feb-mar 2026
- [ ] `nft-market-2026` → aggiornare con trend recenti
- [ ] `github-student-pack` → aggiornare lista tool 2026, espandere FAQ
- [ ] `ollama-opencode-setup` → aggiungere sezione troubleshooting/FAQ

### 2.2 Ottimizzare Tool Pages ad Alto Potenziale

Tool con molte impressioni ma posizione bassa - servono contenuti SEO on-page:

- [ ] `clip-path-maker` (1,360 imp, pos 37) → aggiungere guida "How to use CSS clip-path" sotto il tool, esempi, FAQ
- [ ] `px-to-vw-converter` (214 imp, pos 43) → aggiungere spiegazione conversione, formula, esempi pratici
- [ ] `wave-generator` (113 imp, pos 46) → aggiungere guida SVG waves
- [ ] `byte-size-converter` (168 imp, pos 23) → aggiungere tabella conversioni comuni
- [ ] `clamp-generator` (79 imp, pos 51) → aggiungere guida CSS clamp()
- [ ] `html-minifier` (120 imp, pos 26) → aggiungere spiegazione benefici minification
- [ ] `color-shades-generator` (58 imp, pos 69) → aggiungere guida color theory

### 2.3 Cluster di Keyword - Pagine da Potenziare

**Cluster MLX/Apple Silicon AI** (~2000+ imp, pos 6-8):
- [ ] Espandere articolo con benchmark per M1 Pro, M2, M3
- [ ] Aggiungere tabella comparativa velocita per modelli
- [ ] Targetizzare varianti: "mlx-lm", "qwen2", "qwen2.5", "apple silicon"

**Cluster CSS Clip-Path** (~1000+ imp, pos 36-55):
- [ ] Aggiungere contenuto SEO alla pagina tool
- [ ] Targetizzare: "clip path generator", "css clip-path generator", "clip-path maker", "polygon generator"
- [ ] Internal linking da pagine CSS correlate

**Cluster GitHub Student Pack** (~800+ imp, pos 38-50):
- [ ] Riscrivere articolo come guida completa 2026
- [ ] Aggiungere sezioni: Copilot, JetBrains, DigitalOcean, Educative
- [ ] FAQ schema per le domande piu comuni

**Cluster OpenCode/Ollama** (~200+ imp, pos 7-33):
- [ ] Gia ben posizionato, focus su miglioramento CTR
- [ ] Aggiungere sezione configurazione avanzata

---

## FASE 3 - Miglioramenti Tecnici (2-3 settimane)

### 3.1 Internal Linking

- [ ] Ogni articolo linka a 2-3 tools correlati
- [ ] Ogni tool linka a articoli correlati
- [ ] Le pagine resources linkano ad articoli pertinenti
- [ ] Aggiungere componente "Related Articles" nelle pagine articolo

**File da modificare:** componenti articolo, `pages/articles/[slug].vue`, `pages/tools/[slug].vue`

### 3.2 Pagine Hub con Contenuto SEO

Le pagine indice hanno impressioni ma zero click:

- [ ] `/articles/` (164+20 imp) → aggiungere intro SEO, categorizzazione
- [ ] `/tools/` (164+20 imp) → aggiungere intro SEO, descrizione categorie
- [ ] `/resources/` (163+6 imp) → aggiungere intro SEO

**File da modificare:** `pages/articles/index.vue`, `pages/tools/index.vue`, `pages/resources/index.vue`

### 3.3 Ottimizzazione Mobile

Mobile ha posizione migliore (10.83) ma CTR peggiore (0.61%):

- [ ] Verificare title length < 60 char (non troncati su mobile)
- [ ] Verificare meta description efficace nei primi 120 char
- [ ] Controllare Core Web Vitals su mobile (PageSpeed Insights)
- [ ] Verificare UX tool su mobile (usabilita touch)

### 3.4 Robots.txt Review

- [ ] Verificare che tutte le pagine importanti siano crawlabili
- [ ] Verificare che il sitemap sia correttamente referenziato
- [ ] Controllare eventuali pagine bloccate per errore

---

## FASE 4 - Nuovi Contenuti (Ongoing)

### 4.1 Articoli da Scrivere (basati su domanda reale nelle query)

- [ ] "Best CSS Frameworks 2026: Complete Comparison" (121 imp, pos 71)
- [ ] "Best Angular UI Component Libraries 2026" (44 imp, pos 86)
- [ ] "Best React Native UI Libraries 2026" (21 imp, pos 84)
- [ ] "Vue UI Libraries & Frameworks 2026" (31 imp, pos 76)
- [ ] "JavaScript Animation Libraries: Complete Guide" (15 imp, pos 55)
- [ ] "How to Parse JSON in JavaScript: Complete Guide" (21 imp, pos 95)

### 4.2 Tool SEO Pages da Migliorare

- [ ] `px-to-vh-converter` (60 imp, pos 29)
- [ ] `gitignore-generator` (35 imp, pos 34)
- [ ] `svg-icon-generator` (27 imp, pos 60)
- [ ] `url-encoder-decoder` (46 imp, pos 37-52)
- [ ] `image-compressor` (30 imp, pos 21)

---

## Riepilogo Priorita

| # | Azione | Impatto | Effort | Status |
|---|--------|---------|--------|--------|
| 1 | Riscrivere title/description top 10 pagine | ALTO | Basso | [ ] |
| 2 | Fixare trailing slash duplicates | ALTO | Basso | [ ] |
| 3 | Validare/fixare dati strutturati | MEDIO | Basso | [ ] |
| 4 | Aggiungere FAQ schema a 4 pagine | MEDIO | Basso | [ ] |
| 5 | Aggiornare contenuto articoli trending | ALTO | Medio | [ ] |
| 6 | Ottimizzare SEO tool pages (clip-path, px-to-vw, etc.) | ALTO | Medio | [ ] |
| 7 | Migliorare internal linking | MEDIO | Medio | [ ] |
| 8 | Contenuto pagine hub | BASSO | Basso | [ ] |
| 9 | Ottimizzazione mobile | MEDIO | Medio | [ ] |
| 10 | Nuovi articoli per gap di contenuto | ALTO | Alto | [ ] |

---

## Note Query Principali per Referenza

**Top query per click:**
- "codehelper" (19 click, pos 4.76) - branded
- "var_dump formatter" (14 click, pos 3.53) - tool
- "code helper" (12 click, pos 11.95) - branded
- "var_dump beautifier" (6 click, pos 5.29) - tool

**Top query per impressioni (0 click):**
- "css clip-path generator" (393 imp, pos 36.76)
- MLX/Qwen2 varianti (2000+ imp combinati, pos 5-8)
- NFT market 2026 varianti (1500+ imp combinati, pos 8-12)
- GitHub student pack varianti (800+ imp combinati, pos 38-50)
- RAM prices varianti (500+ imp combinati, pos 5-10)
