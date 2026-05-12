import { Link } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import StatCard from '../components/StatCard';
import RiskBadge from '../components/RiskBadge';
import { BLOOM_SITES, HISTORICAL_READINGS } from '../data/mockData';

export default function Dashboard() {
  const alertSites = BLOOM_SITES.filter(s => s.status === 'alert' || s.status === 'warning');
  const avgProb = BLOOM_SITES.reduce((s, x) => s + x.lastReading.bloomProbability, 0) / BLOOM_SITES.length;
  const recentReadings = HISTORICAL_READINGS.slice(-30).map(r => ({
    date: r.date.slice(5),
    probability: +(r.bloomProbability * 100).toFixed(1),
    temperature: r.temperature,
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-emerald-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Real-time algal bloom monitoring for Furesø Lake</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Monitoring Sites"
          value={BLOOM_SITES.length}
          icon="📡"
          color="#0ea5e9"
          subtitle="Active sensors"
        />
        <StatCard
          title="Active Alerts"
          value={alertSites.length}
          icon="⚠️"
          color="#ef4444"
          subtitle="Sites at warning/alert"
        />
        <StatCard
          title="Avg. Bloom Probability"
          value={(avgProb * 100).toFixed(0)}
          unit="%"
          icon="🌿"
          color="#f59e0b"
          subtitle="Across all sites"
        />
        <StatCard
          title="Last Updated"
          value="2026-05-10"
          icon="🕒"
          color="#6366f1"
          subtitle="Daily sensor sync"
        />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          30-Day Bloom Probability Trend
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={recentReadings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v: unknown) => `${v}%`} />
            <ReferenceLine y={50} stroke="#f97316" strokeDasharray="4 4" label={{ value: 'High risk', position: 'right', fontSize: 11 }} />
            <ReferenceLine y={75} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Critical', position: 'right', fontSize: 11 }} />
            <Line
              type="monotone"
              dataKey="probability"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              name="Bloom Probability"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Site status table */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Site Status</h2>
          <Link to="/map" className="text-sm text-emerald-600 hover:underline">View on map →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2">Site</th>
                <th className="pb-2">Temp (°C)</th>
                <th className="pb-2">pH</th>
                <th className="pb-2">DO (mg/L)</th>
                <th className="pb-2">Phosphorus</th>
                <th className="pb-2">Bloom Prob.</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {BLOOM_SITES.map(site => (
                <tr key={site.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-2 font-medium">{site.name}</td>
                  <td className="py-2">{site.lastReading.temperature}</td>
                  <td className="py-2">{site.lastReading.pH}</td>
                  <td className="py-2">{site.lastReading.dissolvedOxygen}</td>
                  <td className="py-2">{site.lastReading.phosphorus}</td>
                  <td className="py-2">{(site.lastReading.bloomProbability * 100).toFixed(0)}%</td>
                  <td className="py-2"><RiskBadge level={site.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
