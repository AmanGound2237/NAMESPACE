import GlassCard from './GlassCard.jsx'

const ThreatWidget = ({ title, count, level, description }) => {
  return (
    <GlassCard className="flex flex-col gap-3 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-100">{title}</p>
        <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
          {level}
        </span>
      </div>
      <p className="text-3xl font-semibold text-slate-100">{count}</p>
      <p className="text-sm text-slate-400">{description}</p>
    </GlassCard>
  )
}

export default ThreatWidget
