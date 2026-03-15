# New Tools Plan for CodeHelper

Reference style: `VarDumpFormatter.vue` — simple, focused, clean UI with card layout, input/output sections, minimal options.

---

## PRIORITY 1 — High SEO Traffic Tools

### 1. SQL Formatter / SQL Beautifier
- **Slug:** `sql-formatter`
- **Category:** `formatter` (existing)
- **File:** `components/tools/formatter/SqlFormatter.vue`
- **Features:**
  - Format/beautify SQL
  - Minify SQL
  - Indentation options (spaces/tabs, width)
  - Keyword uppercase toggle (SELECT, FROM, WHERE...)
  - Copy / Download
- **SEO title:** `Free SQL Formatter & Beautifier Online – CodeHelper`
- **Keywords:** `sql formatter, sql beautifier, format sql online, sql pretty print, sql minifier, sql indent`
- **Volume:** ~80k-200k searches/month
- **Notes:** Pure client-side parsing. Use simple regex/tokenizer approach — no need for a full SQL parser. Focus on SELECT/INSERT/UPDATE/DELETE formatting.

---

### 2. Cron Expression Generator
- **Slug:** `cron-generator`
- **Category:** `generator` (existing)
- **File:** `components/tools/generator/CronGenerator.vue`
- **Features:**
  - Visual builder: dropdowns for minute, hour, day, month, weekday
  - Presets: "Every 5 minutes", "Daily at midnight", "Weekly on Monday", etc.
  - Generated cron expression displayed prominently
  - Human-readable description of the expression
  - Copy button
- **SEO title:** `Free Cron Expression Generator Online – CodeHelper`
- **Keywords:** `cron expression generator, cron schedule generator, crontab generator, cron job maker, unix cron builder`
- **Volume:** ~40k searches/month
- **Notes:** Keep it simple. Dropdowns + presets + output. No need for a full cron parser in reverse.

---

### 3. JWT Generator
- **Slug:** `jwt-generator`
- **Category:** `dev` (existing)
- **File:** `components/tools/dev/JwtGenerator.vue`
- **Features:**
  - Header editor (algorithm selector: HS256, HS384, HS512)
  - Payload builder (add claims: sub, iss, exp, iat, custom)
  - Expiration picker (relative: 1h, 24h, 7d, 30d, custom)
  - Secret input
  - Generated JWT output
  - Copy button
- **SEO title:** `Free JWT Generator Online: Create & Sign JSON Web Tokens – CodeHelper`
- **Keywords:** `jwt generator, create jwt token, jwt maker, json web token generator, jwt builder online`
- **Volume:** ~30k searches/month
- **Notes:** Companion to existing `jwt-decoder`. Use the Web Crypto API or a lightweight HMAC library for signing. Keep it HS256/HS384/HS512 only (symmetric) — no RSA to keep it simple.

---

### 4. JSON Schema Generator
- **Slug:** `json-schema-generator`
- **Category:** `generator` (existing)
- **File:** `components/tools/generator/JsonSchemaGenerator.vue`
- **Features:**
  - Paste JSON input
  - Auto-generate JSON Schema (Draft 7)
  - Detect types: string, number, integer, boolean, null, object, array
  - Detect required fields
  - Handle nested objects and arrays
  - Copy / Download schema
- **SEO title:** `Free JSON Schema Generator from JSON Online – CodeHelper`
- **Keywords:** `json schema generator, json to schema, generate json schema from json, json schema from example, json schema builder`
- **Volume:** ~25k searches/month
- **Notes:** Recursive function that walks the JSON tree and builds a schema. Simple and effective.

---

### 5. JSON to TypeScript Interface Generator
- **Slug:** `json-to-typescript`
- **Category:** `converter` (existing)
- **File:** `components/tools/converter/JsonToTypescript.vue`
- **Features:**
  - Paste JSON input
  - Auto-generate TypeScript interfaces
  - Handle nested objects (create separate interfaces)
  - Handle arrays (detect item types)
  - Root interface name input
  - Optional: export keyword toggle
  - Copy / Download .ts
- **SEO title:** `Free JSON to TypeScript Converter Online – CodeHelper`
- **Keywords:** `json to typescript, json to ts interface, convert json to typescript, json to type, typescript interface generator`
- **Volume:** ~50k searches/month
- **Notes:** Very popular among TypeScript devs. Recursive approach: detect types, create interfaces for nested objects.

---

## PRIORITY 2 — Medium SEO + Viral Potential

### 6. Cron Expression Parser
- **Slug:** `cron-parser`
- **Category:** `dev` (existing)
- **File:** `components/tools/dev/CronParser.vue`
- **Features:**
  - Input a cron expression
  - Human-readable description output
  - Show next 5-10 execution times
  - Validate expression
  - Copy description
- **SEO title:** `Free Cron Expression Parser & Explainer Online – CodeHelper`
- **Keywords:** `cron parser, cron expression explained, cron schedule parser, crontab explainer, next cron run`
- **Volume:** ~15k searches/month
- **Notes:** Companion to `cron-generator`. Parse the 5 fields and generate description + upcoming dates.

---

### 7. JSON to CSV Converter
- **Slug:** `json-to-csv`
- **Category:** `converter` (existing)
- **File:** `components/tools/converter/JsonToCsv.vue`
- **Features:**
  - Paste JSON array input
  - Auto-detect columns from keys
  - Preview table
  - Download CSV
  - Delimiter option (comma, semicolon, tab)
- **SEO title:** `Free JSON to CSV Converter Online – CodeHelper`
- **Keywords:** `json to csv, convert json to csv online, json to csv converter, json array to csv, export json as csv`
- **Volume:** ~20k searches/month

---

### 8. CSV to JSON Converter
- **Slug:** `csv-to-json`
- **Category:** `converter` (existing)
- **File:** `components/tools/converter/CsvToJson.vue`
- **Features:**
  - Paste CSV or upload .csv file
  - Auto-detect delimiter
  - Preview result as JSON
  - Copy / Download .json
- **SEO title:** `Free CSV to JSON Converter Online – CodeHelper`
- **Keywords:** `csv to json, convert csv to json online, csv to json converter, csv parser online`
- **Volume:** ~15k searches/month

---

## PRIORITY 3 — Viral Dev Tools (Social + Backlinks)

### 9. Regex Visualizer
- **Slug:** `regex-visualizer`
- **Category:** `dev` (existing)
- **File:** `components/tools/dev/RegexVisualizer.vue`
- **Features:**
  - Input regex pattern
  - Visual breakdown: each part explained in plain English
  - Color-coded groups, quantifiers, character classes
  - Test string with match highlighting
  - Copy explanation
- **SEO title:** `Free Regex Visualizer & Explainer Online – CodeHelper`
- **Keywords:** `regex visualizer, regex explainer, regex breakdown, visual regex, understand regex, regex diagram`
- **Volume:** ~10k searches/month
- **Notes:** Companion to existing `regex-tester`. High viral potential on Reddit/HackerNews. Parse regex tokens and explain each one.

---

## Summary

| # | Tool | Category | Slug | Priority |
|---|------|----------|------|----------|
| 1 | SQL Formatter | formatter | sql-formatter | HIGH |
| 2 | Cron Expression Generator | generator | cron-generator | HIGH |
| 3 | JWT Generator | dev | jwt-generator | HIGH |
| 4 | JSON Schema Generator | generator | json-schema-generator | HIGH |
| 5 | JSON to TypeScript | converter | json-to-typescript | HIGH |
| 6 | Cron Expression Parser | dev | cron-parser | MEDIUM |
| 7 | JSON to CSV | converter | json-to-csv | MEDIUM |
| 8 | CSV to JSON | converter | csv-to-json | MEDIUM |
| 9 | Regex Visualizer | dev | regex-visualizer | VIRAL |

**All tools use existing categories — no new categories needed.**

Total: 9 new tools → from 37 to 46 tools.

### Build order recommendation
Start with #1 (SQL Formatter) and #5 (JSON to TypeScript) — highest traffic potential, straightforward to build.
