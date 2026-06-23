import { FiSearch, FiBell, FiUser } from 'react-icons/fi'

const Topbar = () => {
  return (
    <header className="sticky top-0 z-20 flex flex-col gap-4 border-b border-white/10 bg-slate-950/70 px-6 py-5 backdrop-blur md:flex-row md:items-center md:justify-between md:px-10">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">TruthNet AI</p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-50">
          Threat Operations Center
        </h2>
      </div>
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end md:w-auto">
        <div className="relative w-full sm:w-72">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            placeholder="Search alerts, domains, or emails"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/60 hover:text-cyan-200">
            <FiBell />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/60 hover:text-cyan-200">
            <FiUser />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Topbar
