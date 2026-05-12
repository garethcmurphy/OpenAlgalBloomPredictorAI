import type { WaterQualityReading, BloomSite } from '../types';

/** Furesø Lake center */
export const LAKE_CENTER: [number, number] = [55.7944, 12.3562];

/** Sample monitoring sites around Furesø Lake */
export const BLOOM_SITES: BloomSite[] = [
  {
    id: 'site-1',
    name: 'North Shore',
    lat: 55.8080,
    lng: 12.3480,
    status: 'warning',
    lastReading: {
      id: 'r-001',
      date: '2026-05-10',
      temperature: 22.4,
      pH: 8.2,
      dissolvedOxygen: 5.1,
      turbidity: 42,
      phosphorus: 0.32,
      nitrogen: 2.8,
      rainfall: 3,
      bloomDetected: true,
      bloomProbability: 0.74,
      location: { lat: 55.808, lng: 12.348 },
      site: 'North Shore',
    },
  },
  {
    id: 'site-2',
    name: 'South Inlet',
    lat: 55.7820,
    lng: 12.3600,
    status: 'alert',
    lastReading: {
      id: 'r-002',
      date: '2026-05-10',
      temperature: 24.1,
      pH: 8.6,
      dissolvedOxygen: 3.8,
      turbidity: 78,
      phosphorus: 0.45,
      nitrogen: 3.9,
      rainfall: 1,
      bloomDetected: true,
      bloomProbability: 0.91,
      location: { lat: 55.782, lng: 12.36 },
      site: 'South Inlet',
    },
  },
  {
    id: 'site-3',
    name: 'East Bay',
    lat: 55.7960,
    lng: 12.3780,
    status: 'watch',
    lastReading: {
      id: 'r-003',
      date: '2026-05-10',
      temperature: 19.7,
      pH: 7.6,
      dissolvedOxygen: 7.2,
      turbidity: 18,
      phosphorus: 0.14,
      nitrogen: 1.4,
      rainfall: 12,
      bloomDetected: false,
      bloomProbability: 0.38,
      location: { lat: 55.796, lng: 12.378 },
      site: 'East Bay',
    },
  },
  {
    id: 'site-4',
    name: 'West Dock',
    lat: 55.7930,
    lng: 12.3320,
    status: 'clear',
    lastReading: {
      id: 'r-004',
      date: '2026-05-10',
      temperature: 17.2,
      pH: 7.2,
      dissolvedOxygen: 9.4,
      turbidity: 8,
      phosphorus: 0.06,
      nitrogen: 0.7,
      rainfall: 18,
      bloomDetected: false,
      bloomProbability: 0.11,
      location: { lat: 55.793, lng: 12.332 },
      site: 'West Dock',
    },
  },
  {
    id: 'site-5',
    name: 'Central Basin',
    lat: 55.7970,
    lng: 12.3570,
    status: 'watch',
    lastReading: {
      id: 'r-005',
      date: '2026-05-10',
      temperature: 21.0,
      pH: 7.9,
      dissolvedOxygen: 6.0,
      turbidity: 30,
      phosphorus: 0.22,
      nitrogen: 2.1,
      rainfall: 5,
      bloomDetected: false,
      bloomProbability: 0.52,
      location: { lat: 55.797, lng: 12.357 },
      site: 'Central Basin',
    },
  },
];

/** Generate 90 days of synthetic historical readings */
function generateHistory(): WaterQualityReading[] {
  const readings: WaterQualityReading[] = [];
  const base = new Date('2026-02-10');
  for (let i = 0; i < 90; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const temp = 12 + i * 0.13 + (Math.sin(i / 7) * 3);
    const phosphorus = 0.08 + Math.random() * 0.3;
    const prob = Math.min(
      1,
      (temp - 15) / 20 + phosphorus * 1.2 + (Math.random() - 0.5) * 0.2
    );
    readings.push({
      id: `hist-${i}`,
      date: d.toISOString().split('T')[0],
      temperature: parseFloat(temp.toFixed(1)),
      pH: parseFloat((7.0 + Math.random() * 1.5).toFixed(2)),
      dissolvedOxygen: parseFloat((10 - prob * 5 + Math.random()).toFixed(1)),
      turbidity: parseFloat((5 + prob * 80 + Math.random() * 10).toFixed(1)),
      phosphorus: parseFloat(phosphorus.toFixed(3)),
      nitrogen: parseFloat((0.5 + Math.random() * 3.5).toFixed(2)),
      rainfall: parseFloat((Math.random() * 20).toFixed(1)),
      bloomDetected: prob > 0.55,
      bloomProbability: parseFloat(Math.max(0, Math.min(1, prob)).toFixed(2)),
      location: { lat: LAKE_CENTER[0], lng: LAKE_CENTER[1] },
      site: 'Central Basin',
    });
  }
  return readings;
}

export const HISTORICAL_READINGS: WaterQualityReading[] = generateHistory();
