import { useState } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell,
} from 'recharts';
import RiskBadge from '../components/RiskBadge';
import { predict, riskColor } from '../utils/predictor';
import type { PredictionInput, PredictionResult } from '../types';

const DEFAULTS: PredictionInput = {
  temperature: 22,
  pH: 7.8,
  dissolvedOxygen: 6,
  turbidity: 25,
  phosphorus: 0.15,
  nitrogen: 1.8,
  rainfall: 5,
};

interface SliderFieldProps {
  label: string;
  name: keyof PredictionInput;
  min: number;
  max: number;
  step: number;
  unit: string;
  value: number;
  onChange: (name: keyof PredictionInput, value: number) => void;
  hint?: string;
}

function SliderField({ label, name, min, max, step, unit, value, onChange, hint }: SliderFieldProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-baseline">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-bold text-emerald-700">
          {value} <span className="font-normal text-gray-400">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(name, parseFloat(e.target.value))}
        className="w-full accent-emerald-600"
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>{min}</span>
        {hint && <span className="text-gray-500 italic">{hint}</span>}
        <span>{max}</span>
      </div>
    </div>
  );
}

export default function Predictor() {
  const [inputs, setInputs] = useState<PredictionInput>(DEFAULTS);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleChange = (name: keyof PredictionInput, value: number) => {
    setInputs(prev => ({ ...prev, [name]: value }));
    setResult(null);
  };

  const handlePredict = () => {
    setResult(predict(inputs));
  };

  const radarData = [
    { subject: 'Temperature', A: Math.round(((inputs.temperature - 15) / 20) * 100) },
    { subject: 'pH', A: Math.round(((inputs.pH - 6) / 3) * 100) },
    { subject: 'Low DO', A: Math.round(((12 - inputs.dissolvedOxygen) / 10) * 100) },
    { subject: 'Turbidity', A: Math.round((inputs.turbidity / 100) * 100) },
    { subject: 'Phosphorus', A: Math.round((inputs.phosphorus / 0.5) * 100) },
    { subject: 'Nitrogen', A: Math.round((inputs.nitrogen / 5) * 100) },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-emerald-900">Bloom Predictor</h1>
        <p className="text-gray-500 mt-1">
          Adjust water quality parameters and get an instant AI-driven bloom risk assessment.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input sliders */}
        <div className="bg-white rounded-xl shadow p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-700">Water Quality Parameters</h2>
          <SliderField label="Water Temperature" name="temperature" min={10} max={35} step={0.5} unit="°C" value={inputs.temperature} onChange={handleChange} hint="Blooms favour >20°C" />
          <SliderField label="pH" name="pH" min={6} max={9.5} step={0.1} unit="" value={inputs.pH} onChange={handleChange} hint="Optimal bloom: 8-9" />
          <SliderField label="Dissolved Oxygen" name="dissolvedOxygen" min={1} max={14} step={0.1} unit="mg/L" value={inputs.dissolvedOxygen} onChange={handleChange} hint="Low DO = high risk" />
          <SliderField label="Turbidity" name="turbidity" min={0} max={100} step={1} unit="NTU" value={inputs.turbidity} onChange={handleChange} />
          <SliderField label="Phosphorus" name="phosphorus" min={0.01} max={0.5} step={0.01} unit="mg/L" value={inputs.phosphorus} onChange={handleChange} hint="Key nutrient driver" />
          <SliderField label="Nitrogen" name="nitrogen" min={0.1} max={5} step={0.1} unit="mg/L" value={inputs.nitrogen} onChange={handleChange} />
          <SliderField label="Rainfall (last 7 days)" name="rainfall" min={0} max={50} step={1} unit="mm" value={inputs.rainfall} onChange={handleChange} hint="High rain dilutes" />
          <button
            onClick={handlePredict}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            🔮 Predict Bloom Risk
          </button>
        </div>

        {/* Radar + result */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Parameter Profile</h2>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} />
                <Radar dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.35} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {result && (
            <div className="bg-white rounded-xl shadow p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500">Bloom Probability</p>
                  <p
                    className="text-4xl font-black"
                    style={{ color: riskColor(result.riskLevel) }}
                  >
                    {(result.bloomProbability * 100).toFixed(0)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Risk Level</p>
                  <RiskBadge level={result.riskLevel} size="lg" />
                </div>
              </div>
              <p className="text-sm bg-gray-50 border rounded p-3 text-gray-700">
                {result.recommendation}
              </p>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Contributing Factors</p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={result.contributingFactors} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" unit="%" tick={{ fontSize: 11 }} />
                    <YAxis dataKey="factor" type="category" width={110} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v: unknown) => `${v}%`} />
                    <Bar dataKey="impact" radius={[0, 4, 4, 0]}>
                      {result.contributingFactors.map((_, i) => (
                        <Cell key={i} fill={riskColor(result.riskLevel)} fillOpacity={1 - i * 0.1} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
