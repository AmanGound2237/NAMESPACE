import GlassCard from './GlassCard.jsx'

const FeatureCard = ({ title, description, icon }) => {
  return (
    <GlassCard className="group flex h-full flex-col gap-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-200 transition group-hover:bg-cyan-500/25">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
        <p className="mt-2 text-sm text-slate-400">{description}</p>
      </div>
    </GlassCard>
  )
}

export default FeatureCard
