const SectionHeader = ({ title, subtitle, action }) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h3 className="display-font text-2xl font-semibold text-slate-100 md:text-3xl">
          {title}
        </h3>
        {subtitle ? (
          <p className="mt-2 text-sm text-slate-400 md:text-base">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  )
}

export default SectionHeader
