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

## Project structuur

```text
/
├── public/
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── netlify.toml
```
