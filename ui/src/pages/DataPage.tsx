import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, ReferenceLine,
} from 'recharts';
import { HISTORICAL_READINGS } from '../data/mockData';

type ChartType = 'probability' | 'temperature' | 'phosphorus' | 'scatter';

const BLOOM_COLOR = '#ef4444';
const SAFE_COLOR = '#22c55e';

export default function DataPage() {
  const [chart, setChart] = useState<ChartType>('probability');
  const [days, setDays] = useState<30 | 60 | 90>(90);

  const data = HISTORICAL_READINGS.slice(-days).map(r => ({
    date: r.date.slice(5),
    probability: +(r.bloomProbability * 100).toFixed(1),
    temperature: r.temperature,
    phosphorus: +(r.phosphorus * 1000).toFixed(0), // μg/L for chart
    dissolvedOxygen: r.dissolvedOxygen,
    bloom: r.bloomDetected ? 1 : 0,
  }));

  const bloomDays = data.filter(d => d.bloom).length;
  const avgTemp = (data.reduce((s, d) => s + d.temperature, 0) / data.length).toFixed(1);
  const avgProb = (data.reduce((s, d) => s + d.probability, 0) / data.length).toFixed(1);

  const tabs: { key: ChartType; label: string }[] = [
    { key: 'probability', label: 'Bloom Probability' },
    { key: 'temperature', label: 'Temperature' },
    { key: 'phosphorus', label: 'Phosphorus' },
    { key: 'scatter', label: 'Temp vs Bloom' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-emerald-900">Historical Data</h1>
        <p className="text-gray-500 mt-1">
          Explore 90 days of water quality readings from the Central Basin sensor.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm text-gray-500">Bloom Days</p>
          <p className="text-2xl font-bold text-red-500">{bloomDays} / {days}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm text-gray-500">Avg Temperature</p>
          <p className="text-2xl font-bold text-amber-500">{avgTemp} °C</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm text-gray-500">Avg Bloom Probability</p>
          <p className="text-2xl font-bold text-orange-500">{avgProb}%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        {/* Controls */}
        <div className="flex flex-wrap gap-3 items-center justify-between mb-5">
          <div className="flex gap-1">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setChart(t.key)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${chart === t.key ? 'bg-emerald-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {([30, 60, 90] as const).map(d => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${days === d ? 'bg-emerald-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          {chart === 'probability' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={Math.floor(days / 10)} />
              <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v: unknown) => `${v}%`} />
              <ReferenceLine y={50} stroke="#f97316" strokeDasharray="4 4" />
              <ReferenceLine y={75} stroke="#ef4444" strokeDasharray="4 4" />
              <Line type="monotone" dataKey="probability" stroke="#10b981" strokeWidth={2} dot={false} name="Bloom Prob." />
            </LineChart>
          ) : chart === 'temperature' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={Math.floor(days / 10)} />
              <YAxis domain={[10, 35]} unit="°C" tick={{ fontSize: 11 }} />
              <Tooltip />
              <ReferenceLine y={20} stroke="#f97316" strokeDasharray="4 4" label={{ value: 'Risk threshold', position: 'right', fontSize: 11 }} />
              <Line type="monotone" dataKey="temperature" stroke="#f59e0b" strokeWidth={2} dot={false} name="Temperature" />
            </LineChart>
          ) : chart === 'phosphorus' ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={Math.floor(days / 10)} />
              <YAxis unit=" μg/L" tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: unknown) => `${v} μg/L`} />
              <Legend />
              <Bar dataKey="phosphorus" name="Phosphorus" radius={[2, 2, 0, 0]}>
                {data.map((d, i) => (
                  <Cell key={i} fill={d.bloom ? BLOOM_COLOR : SAFE_COLOR} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="temperature" name="Temperature" unit="°C" type="number" domain={[10, 35]} tick={{ fontSize: 11 }} />
              <YAxis dataKey="probability" name="Bloom Prob." unit="%" tick={{ fontSize: 11 }} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(v: unknown, n) => [`${v}${n === 'Bloom Prob.' ? '%' : '°C'}`, n as string]} />
              <Scatter
                data={data}
                name="Observations"
                fill="#10b981"
                fillOpacity={0.5}
              />
            </ScatterChart>
          )}
        </ResponsiveContainer>

        {chart === 'phosphorus' && (
          <p className="text-xs text-gray-400 mt-2">
            <span className="text-red-400 font-medium">■</span> bloom detected &nbsp;
            <span className="text-green-400 font-medium">■</span> no bloom
          </p>
        )}
      </div>

      {/* Data table */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Raw Data (last 14 days)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2">Date</th>
                <th className="pb-2">Temp °C</th>
                <th className="pb-2">pH</th>
                <th className="pb-2">DO mg/L</th>
                <th className="pb-2">Turbidity</th>
                <th className="pb-2">PO₄ mg/L</th>
                <th className="pb-2">N mg/L</th>
                <th className="pb-2">Rain mm</th>
                <th className="pb-2">Prob %</th>
                <th className="pb-2">Bloom</th>
              </tr>
            </thead>
            <tbody>
              {HISTORICAL_READINGS.slice(-14).reverse().map(r => (
                <tr key={r.id} className={`border-b last:border-0 ${r.bloomDetected ? 'bg-red-50' : ''}`}>
                  <td className="py-1.5">{r.date}</td>
                  <td className="py-1.5">{r.temperature}</td>
                  <td className="py-1.5">{r.pH}</td>
                  <td className="py-1.5">{r.dissolvedOxygen}</td>
                  <td className="py-1.5">{r.turbidity}</td>
                  <td className="py-1.5">{r.phosphorus}</td>
                  <td className="py-1.5">{r.nitrogen}</td>
                  <td className="py-1.5">{r.rainfall}</td>
                  <td className="py-1.5">{(r.bloomProbability * 100).toFixed(0)}</td>
                  <td className="py-1.5">{r.bloomDetected ? '⚠️' : '✅'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
