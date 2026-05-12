export default function About() {
  const features = [
    {
      icon: '📊',
      title: 'Real-time Dashboard',
      desc: 'Live overview of all monitoring sites with bloom probability, status badges, and a 30-day trend chart.',
    },
    {
      icon: '🔮',
      title: 'AI Bloom Predictor',
      desc: 'Interactive slider-based form that runs a client-side logistic model (mirrors the Python RandomForest) to estimate bloom probability and contributing factors instantly.',
    },
    {
      icon: '🗺️',
      title: 'Interactive Map',
      desc: 'Leaflet-powered OpenStreetMap showing all 5 Furesø Lake monitoring sites with colour-coded risk markers and detailed popups.',
    },
    {
      icon: '📈',
      title: 'Historical Data Explorer',
      desc: '90-day charts for bloom probability, temperature trends, phosphorus levels, and scatter plots. Filterable by 30/60/90-day windows.',
    },
    {
      icon: '⚙️',
      title: 'TypeScript + React',
      desc: 'Built with Vite, React 19, TypeScript, Tailwind CSS v4, Recharts, and React-Leaflet. Fully typed, maintainable codebase.',
    },
    {
      icon: '🚀',
      title: 'GitHub Pages Deployment',
      desc: 'Automatically built and deployed to GitHub Pages on every push to main via a GitHub Actions workflow.',
    },
  ];

  const parameters = [
    { name: 'Temperature (°C)', desc: 'Higher temperatures accelerate cyanobacterial growth. Risk threshold: >20°C.' },
    { name: 'pH', desc: 'Alkaline conditions (pH 8–9) favour bloom-forming algae.' },
    { name: 'Dissolved Oxygen (mg/L)', desc: 'Low DO (<5 mg/L) indicates poor water quality and supports anaerobic conditions.' },
    { name: 'Turbidity (NTU)', desc: 'High turbidity indicates suspended particles, often from blooms or runoff.' },
    { name: 'Phosphorus (mg/L)', desc: 'The primary limiting nutrient for bloom formation. Values >0.1 mg/L are concerning.' },
    { name: 'Nitrogen (mg/L)', desc: 'Secondary nutrient driver. High N:P ratios can shift species composition.' },
    { name: 'Rainfall (mm)', desc: 'Heavy rain can flush nutrients into the lake; dry periods concentrate nutrients.' },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      {/* Hero */}
      <div className="bg-emerald-800 text-white rounded-2xl p-8">
        <div className="text-5xl mb-3">🌊</div>
        <h1 className="text-3xl font-bold mb-2">Open Algal Bloom Predictor AI</h1>
        <p className="text-emerald-100 text-lg">
          An open-source environmental monitoring tool using machine learning to
          predict harmful algal blooms in Furesø Lake, Denmark.
        </p>
        <div className="flex gap-3 mt-4 flex-wrap">
          <a
            href="https://github.com/garethcmurphy/OpenAlgalBloomPredictorAI"
            className="bg-white text-emerald-800 font-semibold px-4 py-2 rounded hover:bg-emerald-50 transition-colors"
            target="_blank" rel="noreferrer"
          >
            ⭐ View on GitHub
          </a>
          <a
            href="https://fureso.streamlit.app/"
            className="border border-white text-white font-semibold px-4 py-2 rounded hover:bg-emerald-700 transition-colors"
            target="_blank" rel="noreferrer"
          >
            🐍 Streamlit App
          </a>
        </div>
      </div>

      {/* Features */}
      <div>
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(f => (
            <div key={f.title} className="bg-white rounded-xl shadow p-5">
              <div className="text-3xl mb-2">{f.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Parameters */}
      <div>
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Water Quality Parameters</h2>
        <div className="bg-white rounded-xl shadow divide-y">
          {parameters.map(p => (
            <div key={p.name} className="p-4 flex gap-4">
              <span className="text-emerald-600 font-semibold text-sm w-44 shrink-0">{p.name}</span>
              <span className="text-sm text-gray-600">{p.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div>
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">How It Works</h2>
        <div className="bg-white rounded-xl shadow p-6 space-y-4 text-sm text-gray-700">
          <p>
            The core prediction model is a <strong>Random Forest classifier</strong> trained on
            synthetic water quality data generated to match observed patterns in eutrophic Scandinavian lakes.
            The Python model lives in <code className="bg-gray-100 px-1 rounded">src/algal_bloom_predictor.py</code>
            and is built with scikit-learn.
          </p>
          <p>
            The TypeScript UI replicates the model's feature weights client-side using a
            <strong> logistic approximation</strong>, enabling instant predictions without a backend server.
            For production use, the Python model could be served via a REST API (FastAPI/Flask) and
            called from this frontend.
          </p>
          <p>
            The risk thresholds are:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="text-green-600 font-medium">Low (&lt;25%)</span> – routine monitoring</li>
            <li><span className="text-yellow-600 font-medium">Moderate (25–50%)</span> – increase sampling frequency</li>
            <li><span className="text-orange-600 font-medium">High (50–75%)</span> – public advisory recommended</li>
            <li><span className="text-red-600 font-medium">Critical (&gt;75%)</span> – immediate response required</li>
          </ul>
        </div>
      </div>

      {/* Tech stack */}
      <div>
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Technology Stack</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold text-gray-700 mb-2">Frontend (this UI)</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>⚡ Vite 8 + React 19 + TypeScript</li>
              <li>🎨 Tailwind CSS v4</li>
              <li>📈 Recharts 3</li>
              <li>🗺️ React-Leaflet + OpenStreetMap</li>
              <li>🔗 React Router v7</li>
              <li>🚀 GitHub Pages (via Actions)</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold text-gray-700 mb-2">Backend / ML</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>🐍 Python 3.13 + Poetry</li>
              <li>🤖 scikit-learn RandomForestClassifier</li>
              <li>📊 pandas + numpy + seaborn</li>
              <li>🌐 Streamlit (interactive Python UI)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contributing */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-emerald-900 mb-2">Contributing</h2>
        <p className="text-sm text-gray-700">
          Contributions are welcome! Please read the{' '}
          <a href="https://github.com/garethcmurphy/OpenAlgalBloomPredictorAI/blob/main/CODE_OF_CONDUCT.md"
            className="text-emerald-600 underline" target="_blank" rel="noreferrer">Code of Conduct</a>{' '}
          and{' '}
          <a href="https://github.com/garethcmurphy/OpenAlgalBloomPredictorAI/blob/main/SECURITY.md"
            className="text-emerald-600 underline" target="_blank" rel="noreferrer">Security Policy</a>{' '}
          before opening a PR. Issues and feature requests are tracked on GitHub.
        </p>
      </div>
    </div>
  );
}
