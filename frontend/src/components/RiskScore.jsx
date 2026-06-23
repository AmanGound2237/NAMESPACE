const RiskScore = ({ score, riskLevel }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Risk</p>
          <p className="display-font mt-2 text-4xl font-semibold text-slate-100">
            {score}
          </p>
        </div>
        <span className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-200">
          {riskLevel}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500"
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
        Composite threat rating
      </p>
    </div>
  )
}

export default RiskScore
