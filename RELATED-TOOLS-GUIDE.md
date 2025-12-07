# Related Tools Component - Integration Guide

## Overview

Il componente `RelatedTools.vue` mostra suggerimenti di tools correlati dalla stessa categoria al fondo di ogni tool.

**Caratteristiche:**
- ✅ **Completamente automatico** - nessuna configurazione necessaria!
- ✅ Auto-rileva slug e categoria dalla URL corrente
- ✅ Dinamico e randomico (ogni reload mostra tools diversi)
- ✅ Mostra 1-3 tools in base alla disponibilità
- ✅ Esclude automaticamente il tool corrente
- ✅ Grid responsive adattivo (1, 2 o 3 colonne)
- ✅ Stile coerente con il resto del sito

## Come integrarlo

### Semplicissimo! Un solo step:

Aggiungi questa riga **alla fine del template** (prima della chiusura del div principale):

```vue
<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- ... tutto il contenuto del tool ... -->

    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>
```

**Fatto!** Il componente fa tutto da solo:
1. Legge lo slug dalla URL (`/tools/json-formatter` → `json-formatter`)
2. Cerca il tool nel registry
3. Ottiene la categoria
4. Filtra i tools della stessa categoria
5. Randomizza e mostra 1-3 suggerimenti

## Funzionamento Automatico

### Logica Intelligente:

- **1 tool disponibile** → Mostra 1 (grid a 1 colonna)
- **2 tools disponibili** → Mostra 2 (grid 1 col mobile, 2 desktop)
- **3+ tools disponibili** → Mostra 3 random (grid 1/2/3 colonne responsive)
- **0 tools disponibili** → Non mostra nulla (componente nascosto)

### Randomizzazione:

- Ad ogni page load, i tools vengono randomizzati
- L'utente vede sempre suggerimenti diversi
- Migliora l'engagement e la discovery

## Esempio di integrazione

```vue
<!-- JsonFormatter.vue -->
<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <div class="card">
      <h2>JSON Formatter</h2>
      <!-- ... contenuto tool ... -->
    </div>

    <!-- Related Tools - UNA SOLA RIGA! -->
    <RelatedTools />
  </div>
</template>
```

## Lista completa dei tools da aggiornare

### Formatter
- [ ] JsonFormatter.vue → `json-formatter` | `formatter`
- [ ] XmlFormatter.vue → `xml-formatter` | `formatter`
- [ ] HTMLMinifier.vue → `html-minifier` | `formatter`
- [ ] CssFormatter.vue → `css-formatter` | `formatter`
- [ ] VarDumpFormatter.vue → `var-dump-formatter` | `formatter`

### Converter
- [ ] JsonYamlConverter.vue → `json-yaml-converter` | `converter`
- [ ] NumberBaseConverter.vue → `number-base-converter` | `converter`
- [ ] ByteSizeConverter.vue → `byte-size-converter` | `converter`
- [ ] TimeConverter.vue → `time-converter` | `converter`
- [ ] UnitConverter.vue → `unit-converter` | `converter`
- [ ] ViewportUnitConverter.vue → `viewport-unit-converter` | `converter`

### CSS
- [ ] ClampGenerator.vue → `clamp-generator` | `css`
- [ ] BoxShadowTester.vue → `box-shadow-tester` | `css`
- [ ] BorderRadiusGenerator.vue → `border-radius-generator` | `css`
- [ ] AspectRatioCalculator.vue → `aspect-ratio-calculator` | `css`

### Colors
- [ ] ColorConverter.vue → `color-converter` | `colors`
- [ ] ColorPaletteGenerator.vue → `color-palette-generator` | `colors`
- [ ] ColorShadesGenerator.vue → `color-shades-generator` | `colors`
- [ ] ImageColorPicker.vue → `image-color-picker` | `colors`

### Imaging
- [ ] ImageCompressor.vue → `image-compressor` | `imaging`
- [ ] MiniImageEditor.vue → `mini-image-editor` | `imaging`
- [ ] ClipPathMaker.vue → `clip-path-maker` | `imaging`
- [ ] FrameGenerator.vue → `aspect-frame-generator` | `imaging`

### SVG
- [ ] IconGenerator.vue → `svg-icon-generator` | `svg`
- [ ] WaveGenerator.vue → `wave-generator` | `svg`

### Text
- [ ] LoremIpsumGenerator.vue → `lorem-ipsum-generator` | `textes`
- [ ] TextCaseConverter.vue → `text-case-converter` | `textes`
- [ ] DevNotepad.vue → `dev-notepad` | `textes`

### Generator
- [ ] ReadmeGenerator.vue → `readme-generator` | `generator`

### Dev
- [x] RegexTester.vue → `regex-tester` | `dev` ✅ DONE
- [x] Base64EncoderDecoder.vue → `base64-encoder-decoder` | `dev` ✅ DONE

## Note

- Il componente usa `Math.random()` per randomizzare i tools mostrati
- Se ci sono meno di 3 tools nella categoria, mostra tutti quelli disponibili (escluso quello corrente)
- Se non ci sono altri tools nella categoria, il componente non viene renderizzato
- Il componente è completamente auto-contenuto e non richiede stili aggiuntivi

## Benefici SEO

- **Internal Linking**: Migliora la link structure del sito
- **Engagement**: Aumenta il tempo di permanenza sul sito
- **Page Views**: Incrementa le page views per sessione
- **Discovery**: Aiuta gli utenti a scoprire tools correlati
