import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard' },
  { to: '/predictor', label: 'Predictor' },
  { to: '/map', label: 'Map' },
  { to: '/data', label: 'Data' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  return (
    <nav className="bg-emerald-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌊</span>
          <span className="font-bold text-lg tracking-tight">
            Algal Bloom Predictor AI
          </span>
        </div>
        <ul className="flex gap-1">
          {NAV_ITEMS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white text-emerald-800'
                      : 'hover:bg-emerald-700'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
