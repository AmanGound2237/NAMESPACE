import { NavLink } from 'react-router-dom'
import {
  FiHome,
  FiGrid,
  FiShield,
  FiActivity,
  FiShare2,
} from 'react-icons/fi'

const navItems = [
  { label: 'Home', path: '/', icon: FiHome },
  { label: 'Dashboard', path: '/dashboard', icon: FiGrid },
  { label: 'Analysis', path: '/analysis', icon: FiShield },
  { label: 'Threat Intel', path: '/graph', icon: FiShare2 },
]

const Sidebar = () => {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 flex-col border-r border-white/10 bg-slate-950/70 px-6 py-8 backdrop-blur lg:flex">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">TruthNet AI</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-50">Security Command</h1>
        <p className="mt-2 text-sm text-slate-400">
          Unified visibility across suspicious signals.
        </p>
      </div>
      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-200 shadow-lg shadow-cyan-500/10'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon className="text-lg" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>
      <div className="glass glow-border mt-10 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-200">
            <FiActivity />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Live</p>
            <p className="text-sm font-semibold text-slate-100">Threat pulse active</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
