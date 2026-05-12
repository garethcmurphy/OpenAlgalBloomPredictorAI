import type { PredictionInput, PredictionResult } from '../types';

/**
 * Client-side logistic-regression approximation of the Python
 * RandomForest model (trained on the same synthetic data distribution).
 */
export function predict(input: PredictionInput): PredictionResult {
  const {
    temperature,
    pH,
    dissolvedOxygen,
    turbidity,
    phosphorus,
    nitrogen,
    rainfall,
  } = input;

  // Weighted feature contributions (coefficients approximated from feature importance)
  const tempScore = Math.max(0, (temperature - 20) / 15) * 0.25;
  const pHScore = Math.max(0, (pH - 7.5) / 1.5) * 0.15;
  const doScore = Math.max(0, (8 - dissolvedOxygen) / 8) * 0.20;
  const turbScore = Math.min(1, turbidity / 100) * 0.15;
  const pScore = Math.min(1, phosphorus / 0.4) * 0.15;
  const nScore = Math.min(1, nitrogen / 4) * 0.07;
  const rainScore = Math.max(0, (10 - rainfall) / 10) * 0.03;

  const rawProb = tempScore + pHScore + doScore + turbScore + pScore + nScore + rainScore;
  const bloomProbability = Math.min(1, Math.max(0, rawProb));

  const riskLevel =
    bloomProbability < 0.25 ? 'Low' :
    bloomProbability < 0.5  ? 'Moderate' :
    bloomProbability < 0.75 ? 'High' :
    'Critical';

  const factors = [
    { factor: 'Temperature', impact: parseFloat((tempScore / rawProb * 100).toFixed(1)) },
    { factor: 'Dissolved Oxygen', impact: parseFloat((doScore / rawProb * 100).toFixed(1)) },
    { factor: 'Phosphorus', impact: parseFloat((pScore / rawProb * 100).toFixed(1)) },
    { factor: 'Turbidity', impact: parseFloat((turbScore / rawProb * 100).toFixed(1)) },
    { factor: 'pH', impact: parseFloat((pHScore / rawProb * 100).toFixed(1)) },
    { factor: 'Nitrogen', impact: parseFloat((nScore / rawProb * 100).toFixed(1)) },
    { factor: 'Rainfall', impact: parseFloat((rainScore / rawProb * 100).toFixed(1)) },
  ].sort((a, b) => b.impact - a.impact);

  const recommendations: Record<string, string> = {
    Low: 'Water quality is good. Continue routine monitoring.',
    Moderate: 'Elevated nutrient levels detected. Increase monitoring frequency and alert local authorities.',
    High: 'High bloom probability. Issue public advisory, restrict recreational water use, and investigate nutrient sources.',
    Critical: 'Critical risk. Immediate closure of affected water areas, emergency response required.',
  };

  return {
    bloomProbability: parseFloat(bloomProbability.toFixed(3)),
    riskLevel,
    contributingFactors: factors,
    recommendation: recommendations[riskLevel],
  };
}

export function riskColor(level: string): string {
  const colors: Record<string, string> = {
    Low: '#22c55e',
    Moderate: '#f59e0b',
    High: '#f97316',
    Critical: '#ef4444',
  };
  return colors[level] ?? '#6b7280';
}

export function statusColor(status: string): string {
  const map: Record<string, string> = {
    clear: '#22c55e',
    watch: '#f59e0b',
    warning: '#f97316',
    alert: '#ef4444',
  };
  return map[status] ?? '#6b7280';
}
