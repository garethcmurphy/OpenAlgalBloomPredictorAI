export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-emerald-200 text-center py-4 text-sm mt-auto">
      <p>
        Open Algal Bloom Predictor AI &mdash; Open-source environmental
        monitoring &bull;{' '}
        <a
          href="https://github.com/garethcmurphy/OpenAlgalBloomPredictorAI"
          className="underline hover:text-white"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
