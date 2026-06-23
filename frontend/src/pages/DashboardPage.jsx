import { useState, useEffect } from 'react'
import {
  FiActivity,
  FiShield,
  FiAlertTriangle,
  FiClock,
  FiArrowUpRight,
} from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader.jsx'
import StatCard from '../components/StatCard.jsx'
import ThreatWidget from '../components/ThreatWidget.jsx'
import GlassCard from '../components/GlassCard.jsx'
import { api } from '../services/api.js'

const statIcons = [
  <FiActivity key="activity" />,
  <FiShield key="shield" />,
  <FiAlertTriangle key="alert" />,
  <FiClock key="clock" />,
]

const DashboardPage = () => {
  const [stats, setStats] = useState([])
  const [recent, setRecent] = useState([])
  const [threats, setThreats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, recentData, threatsData] = await Promise.all([
          api.getStats(),
          api.getRecent(),
          api.getSummary(),
        ])
        setStats(statsData)
        setRecent(recentData)
        setThreats(threatsData)
      } catch (err) {
        setError('Failed to sync live telemetry')
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Security Overview"
        subtitle="Real-time pulse of your organization exposure and investigations."
        action={
          <button className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-500/20">
            Export Snapshot
          </button>
        }
      />

      {error && (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
          {error}. Displaying buffered local session data.
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} icon={statIcons[index] || <FiActivity />} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <GlassCard className="overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Recent Analysis
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-100">
                Latest detections
              </h3>
            </div>
            <button className="flex items-center gap-2 text-sm text-cyan-200">
              View all
              <FiArrowUpRight />
            </button>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Target</th>
                  <th className="pb-3">Score</th>
                  <th className="pb-3">Verdict</th>
                  <th className="pb-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {recent.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-white/5 transition hover:bg-white/5"
                  >
                    <td className="py-3 font-medium text-slate-100">
                      {item.type}
                    </td>
                    <td className="py-3 truncate max-w-[200px]">{item.target}</td>
                    <td className="py-3">{item.score}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.score >= 75 ? 'bg-rose-500/15 text-rose-200' :
                        item.score >= 40 ? 'bg-amber-500/15 text-amber-200' :
                        'bg-emerald-500/15 text-emerald-200'
                      }`}>
                        {item.verdict}
                      </span>
                    </td>
                    <td className="py-3 text-right text-slate-400">
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <SectionHeader
            title="Threat Summary"
            subtitle="Campaign clusters detected this week."
          />
          {threats.map((threat) => (
            <ThreatWidget key={threat.id} {...threat} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
