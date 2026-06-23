import GlassCard from './GlassCard.jsx'

const StatCard = ({ title, value, change, trend, icon }) => {
  const trendColor = trend === 'up' ? 'text-emerald-300' : 'text-rose-300'
  return (
    <GlassCard className="group flex flex-col gap-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            {title}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-200 transition group-hover:bg-cyan-500/20">
          {icon}
        </div>
      </div>
      <p className={`text-sm ${trendColor}`}>{change}</p>
    </GlassCard>
  )
}

export default StatCard
