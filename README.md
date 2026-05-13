# Open Algal Bloom Predictor AI 🌊

An open-source environmental monitoring tool using machine learning to predict harmful algal blooms in Furesø Lake, Denmark.

## Live Applications

| Interface | URL |
|-----------|-----|
| **TypeScript UI (GitHub Pages)** | https://garethcmurphy.github.io/OpenAlgalBloomPredictorAI/ |
| **Python Streamlit App** | https://fureso.streamlit.app/ |
| **GitHub Repository** | https://github.com/garethcmurphy/OpenAlgalBloomPredictorAI |

## Features

### TypeScript UI (React + Vite)
- 📊 **Dashboard** – live overview of all monitoring sites, stat cards, 30-day trend chart
- 🔮 **Bloom Predictor** – interactive sliders for 7 water-quality parameters with instant AI risk assessment, contributing factors chart, and radar profile
- 🗺️ **Interactive Map** – Leaflet/OpenStreetMap with colour-coded monitoring site markers, popups, and detail panel
- 📈 **Historical Data** – 90-day charts (probability, temperature, phosphorus, scatter), raw data table
- ℹ️ **About** – parameter guide, model explanation, technology stack

### Python / Streamlit App
- 🗺️ Interactive map of Furesø Lake
- 🦆 Wildlife information (fish, birds, mammals)
- 📜 Lake history
- 🥾 Visitor guides
- ℹ️ Useful information

## Repository Structure

```
├── app.py                          # Streamlit entry point
├── src/
│   ├── algal_bloom_predictor.py    # scikit-learn RandomForest model
│   ├── components/                 # Streamlit page components
│   └── assets/                     # Images
├── ui/                             # React + TypeScript UI
│   ├── src/
│   │   ├── pages/                  # Dashboard, Predictor, Map, Data, About
│   │   ├── components/             # Navbar, Footer, StatCard, RiskBadge
│   │   ├── utils/predictor.ts      # Client-side ML approximation
│   │   └── data/mockData.ts        # Synthetic sensor data
│   └── vite.config.ts
├── data/algalbloom.csv             # Synthetic training dataset
├── .github/workflows/
│   ├── python-app.yml              # Python CI (lint + test)
│   └── deploy-pages.yml            # Build & deploy UI to GitHub Pages
└── pyproject.toml                  # Python dependencies (Poetry)
```

## Getting Started

### TypeScript UI

```bash
cd ui
npm install
npm run dev   # http://localhost:5173
```

### Python App

```bash
# Install dependencies
poetry install

# Run the Streamlit app
streamlit run app.py

# Train the ML model
python src/algal_bloom_predictor.py
```

## Water Quality Parameters

| Parameter | Unit | Risk Threshold |
|-----------|------|----------------|
| Temperature | °C | >20°C |
| pH | – | 8–9 |
| Dissolved Oxygen | mg/L | <5 mg/L |
| Turbidity | NTU | >50 NTU |
| Phosphorus | mg/L | >0.1 mg/L |
| Nitrogen | mg/L | >2 mg/L |
| Rainfall | mm | <5 mm (dry) |

## Risk Levels

| Level | Probability | Action |
|-------|-------------|--------|
| 🟢 Low | <25% | Routine monitoring |
| 🟡 Moderate | 25–50% | Increase sampling frequency |
| 🟠 High | 50–75% | Public advisory recommended |
| 🔴 Critical | >75% | Immediate response required |

## Contributing

Please read the [Code of Conduct](CODE_OF_CONDUCT.md) and [Security Policy](SECURITY.md) before contributing.

## License

See [LICENSE](LICENSE).
