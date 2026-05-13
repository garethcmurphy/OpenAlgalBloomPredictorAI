interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: string;
  color: string;
  subtitle?: string;
}

export default function StatCard({ title, value, unit, icon, color, subtitle }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-start gap-4">
      <div
        className="text-3xl w-12 h-12 flex items-center justify-center rounded-lg"
        style={{ backgroundColor: `${color}20` }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold" style={{ color }}>
          {value}
          {unit && <span className="text-base font-normal text-gray-500 ml-1">{unit}</span>}
        </p>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
