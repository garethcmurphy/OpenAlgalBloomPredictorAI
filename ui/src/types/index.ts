export interface WaterQualityReading {
  id: string;
  date: string;
  temperature: number; // °C
  pH: number;
  dissolvedOxygen: number; // mg/L
  turbidity: number; // NTU
  phosphorus: number; // mg/L
  nitrogen: number; // mg/L
  rainfall: number; // mm
  bloomDetected: boolean;
  bloomProbability: number; // 0-1
  location: { lat: number; lng: number };
  site: string;
}

export interface PredictionInput {
  temperature: number;
  pH: number;
  dissolvedOxygen: number;
  turbidity: number;
  phosphorus: number;
  nitrogen: number;
  rainfall: number;
}

export interface PredictionResult {
  bloomProbability: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  contributingFactors: { factor: string; impact: number }[];
  recommendation: string;
}

export interface BloomSite {
  id: string;
  name: string;
  lat: number;
  lng: number;
  lastReading: WaterQualityReading;
  status: 'clear' | 'watch' | 'warning' | 'alert';
}
