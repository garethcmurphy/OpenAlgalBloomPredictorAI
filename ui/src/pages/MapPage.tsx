import { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import RiskBadge from '../components/RiskBadge';
import { BLOOM_SITES, LAKE_CENTER } from '../data/mockData';
import { statusColor } from '../utils/predictor';
import type { BloomSite } from '../types';

export default function MapPage() {
  const [selected, setSelected] = useState<BloomSite | null>(null);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-emerald-900">Monitoring Map</h1>
        <p className="text-gray-500 mt-1">
          Interactive map of Furesø Lake monitoring sites. Click a marker for details.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-sm">
        {(['clear', 'watch', 'warning', 'alert'] as const).map(s => (
          <span key={s} className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: statusColor(s) }}
            />
            <span className="capitalize">{s}</span>
          </span>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Map */}
        <div className="lg:col-span-2 rounded-xl overflow-hidden shadow h-[480px]">
          <MapContainer
              center={LAKE_CENTER}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {BLOOM_SITES.map(site => (
                <CircleMarker
                  key={site.id}
                  center={[site.lat, site.lng]}
                  radius={14}
                  pathOptions={{
                    color: statusColor(site.status),
                    fillColor: statusColor(site.status),
                    fillOpacity: 0.7,
                    weight: 2,
                  }}
                  eventHandlers={{ click: () => setSelected(site) }}
                >
                  <Popup>
                    <strong>{site.name}</strong><br />
                    Status: <b style={{ color: statusColor(site.status) }}>{site.status}</b><br />
                    Bloom probability: {(site.lastReading.bloomProbability * 100).toFixed(0)}%
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
        </div>

        {/* Site detail panel */}
        <div className="space-y-3">
          {selected ? (
            <div className="bg-white rounded-xl shadow p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg text-emerald-900">{selected.name}</h2>
                <RiskBadge level={selected.status} />
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ['Temperature', `${selected.lastReading.temperature} °C`],
                    ['pH', selected.lastReading.pH],
                    ['Dissolved O₂', `${selected.lastReading.dissolvedOxygen} mg/L`],
                    ['Turbidity', `${selected.lastReading.turbidity} NTU`],
                    ['Phosphorus', `${selected.lastReading.phosphorus} mg/L`],
                    ['Nitrogen', `${selected.lastReading.nitrogen} mg/L`],
                    ['Rainfall', `${selected.lastReading.rainfall} mm`],
                    ['Bloom Detected', selected.lastReading.bloomDetected ? 'Yes ⚠️' : 'No ✅'],
                    ['Bloom Probability', `${(selected.lastReading.bloomProbability * 100).toFixed(0)}%`],
                    ['Last Reading', selected.lastReading.date],
                  ].map(([k, v]) => (
                    <tr key={k as string} className="border-b last:border-0">
                      <td className="py-1.5 text-gray-500">{k}</td>
                      <td className="py-1.5 font-medium text-right">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow p-5 text-gray-400 text-center">
              <p className="text-4xl mb-2">📍</p>
              <p>Click a site marker on the map to view its detailed water quality data.</p>
            </div>
          )}

          {/* All sites list */}
          <div className="bg-white rounded-xl shadow p-4 space-y-2">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">All Sites</h3>
            {BLOOM_SITES.map(site => (
              <button
                key={site.id}
                onClick={() => setSelected(site)}
                className={`w-full text-left flex items-center justify-between p-2 rounded hover:bg-gray-50 text-sm ${selected?.id === site.id ? 'bg-emerald-50' : ''}`}
              >
                <span>{site.name}</span>
                <RiskBadge level={site.status} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
