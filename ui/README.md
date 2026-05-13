# Open Algal Bloom Predictor AI – TypeScript UI

A fully-featured React + TypeScript single-page application that provides a rich interface for monitoring, predicting, and visualising harmful algal blooms on Furesø Lake, Denmark.

🌐 **Live demo:** https://garethcmurphy.github.io/OpenAlgalBloomPredictorAI/

## Features

| Page | Description |
|------|-------------|
| **Dashboard** | Real-time site overview, stat cards, 30-day bloom probability trend chart, and site status table |
| **Predictor** | Interactive sliders for 7 water quality parameters, instant AI risk assessment with contributing factors bar chart and radar profile |
| **Map** | Leaflet/OpenStreetMap with colour-coded site markers, popups, and detail panel |
| **Data** | 90-day historical charts (line, bar, scatter), 30/60/90-day filter, raw data table |
| **About** | Feature overview, parameter guide, technology stack, model explanation |

## Tech Stack

- **Vite 8** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
- **Recharts 3** – line, bar, radar, scatter charts
- **React-Leaflet 5** + **Leaflet 1.9** – interactive map
- **React Router v7** – client-side routing (hash mode for GitHub Pages)

## Getting Started

```bash
cd ui
npm install
npm run dev          # development server at http://localhost:5173
npm run build        # production build to ui/dist/
npm run lint         # ESLint check
```

## Deployment

The app is automatically deployed to GitHub Pages on every push to `main` via `.github/workflows/deploy-pages.yml`.

The Vite `base` is set to `/OpenAlgalBloomPredictorAI/` to match the GitHub Pages URL. React Router uses `HashRouter` for compatibility with GitHub Pages (no server-side routing required).

## Project Structure

```
ui/
├── src/
│   ├── components/      # Navbar, Footer, StatCard, RiskBadge
│   ├── data/            # mockData.ts (synthetic sensor readings)
│   ├── pages/           # Dashboard, Predictor, MapPage, DataPage, About
│   ├── types/           # TypeScript interfaces
│   ├── utils/           # predictor.ts (client-side ML model approximation)
│   ├── App.tsx          # Root component with routing
│   └── main.tsx         # Entry point
├── vite.config.ts
└── package.json
```
