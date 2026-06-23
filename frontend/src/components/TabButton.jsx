const TabButton = ({ label, active, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? 'border-cyan-400/50 bg-cyan-500/20 text-cyan-200 shadow-lg shadow-cyan-500/10'
          : 'border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/40 hover:bg-white/10'
      }`}
      type="button"
    >
      <span className="text-base">{icon}</span>
      {label}
    </button>
  )
}

export default TabButton
