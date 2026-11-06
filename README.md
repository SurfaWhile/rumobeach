# Rumo Beach

Website voor Rumo Beach (strandtent & surfschool). Astro + Tailwind, gehost op Netlify.

## Vereisten

Node 22.12+ (zie `.nvmrc`). Deze machine had alleen Node 18 globaal geïnstalleerd; er staat een losse Node 22-build in `~/.local/node-versions/` — zet die voor in je `PATH` als `node -v` iets anders zegt, of installeer Node 22 via nvm/volta/brew.

## Commands

| Command           | Actie                                    |
| :----------------- | :---------------------------------------- |
| `npm install`       | Installeert dependencies                  |
| `npm run dev`       | Start lokale devserver op `localhost:4321`|
| `npm run build`     | Bouwt de site naar `./dist/`              |
| `npm run preview`   | Preview van de build, voor het deployen   |

## Deploy

Gekoppeld aan Netlify (team `surfawhile`). Zie `netlify.toml` voor build-instellingen.

```sh
netlify deploy          # draft deploy
netlify deploy --prod   # productie
```

## Talen en SEO

Portugees staat op de hoofdnaam (`/`), andere talen onder `/<code>/` (nu `/en/`). Alle pagina's staan in `src/pages/[...lang]/` en worden voor elke taal gegenereerd.

Een taal toevoegen (bv. `nl`, `de`):

1. Regel toevoegen in `src/i18n/config.ts`.
2. Map `src/data/<code>/` maken met `homepage.json`, `beachClub.json`, `surfClub.json` en `ui.json` (kopieer `pt/` of `en/`). Ontbreekt een bestand, dan valt de site terug op Portugees.

Per pagina staan `meta.title` en `meta.description` in het JSON-bestand van die taal. Canonical, hreflang, Open Graph, JSON-LD en de sitemap worden automatisch gegenereerd. Alle content wordt opgehaald via `getContent()` in `src/i18n/content.ts`; dat is de enige plek die vervangen hoeft te worden als de content later uit WordPress komt.

## Project structuur

```text
/
├── public/                  robots.txt, favicons, og-default.jpg, images/
├── src/
│   ├── components/          Header (taalschakelaar, mobiel menu), Footer
│   ├── data/<taal>/         content per taal (JSON)
│   ├── i18n/                config, content-loader, site-gegevens (SEO)
│   ├── layouts/Layout.astro head: SEO-tags, hreflang, JSON-LD
│   └── pages/[...lang]/     index, beach-club, surf-club
└── netlify.toml
```
