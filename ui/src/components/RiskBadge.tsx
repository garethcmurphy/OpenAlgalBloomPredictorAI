interface RiskBadgeProps {
  level: string;
  size?: 'sm' | 'lg';
}

const STYLES: Record<string, string> = {
  Low: 'bg-green-100 text-green-800 border-green-300',
  Moderate: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  High: 'bg-orange-100 text-orange-800 border-orange-300',
  Critical: 'bg-red-100 text-red-800 border-red-300',
  clear: 'bg-green-100 text-green-800 border-green-300',
  watch: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  warning: 'bg-orange-100 text-orange-800 border-orange-300',
  alert: 'bg-red-100 text-red-800 border-red-300',
};

export default function RiskBadge({ level, size = 'sm' }: RiskBadgeProps) {
  const base = STYLES[level] ?? 'bg-gray-100 text-gray-700 border-gray-300';
  const sz = size === 'lg' ? 'text-base px-4 py-1.5' : 'text-xs px-2 py-0.5';
  return (
    <span className={`inline-block font-semibold rounded-full border ${base} ${sz}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}
