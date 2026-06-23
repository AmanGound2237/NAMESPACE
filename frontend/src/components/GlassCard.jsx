const GlassCard = ({ children, className = '' }) => {
  return (
    <div className={`glass glow-border rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  )
}

export default GlassCard
