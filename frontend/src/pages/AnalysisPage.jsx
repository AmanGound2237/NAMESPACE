import { useState } from 'react'
import { FiMail, FiLink, FiImage, FiPlay } from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'
import TabButton from '../components/TabButton.jsx'
import RiskScore from '../components/RiskScore.jsx'
import { getMockAnalysis } from '../services/mockAnalysis.js'

const tabs = [
  {
    id: 'email',
    label: 'Email Analysis',
    icon: <FiMail />,
    placeholder: 'Paste raw email header or content to inspect...',
  },
  {
    id: 'url',
    label: 'URL Analysis',
    icon: <FiLink />,
    placeholder: 'Enter a suspicious link to scan...',
  },
  {
    id: 'screenshot',
    label: 'Screenshot Analysis',
    icon: <FiImage />,
    placeholder: 'Describe the captured login or upload notes...',
  },
]

const AnalysisPage = () => {
  const [activeTab, setActiveTab] = useState('email')
  const [inputValue, setInputValue] = useState('')
  const [showResults, setShowResults] = useState(false)

  const currentTab = tabs.find((tab) => tab.id === activeTab)
  const result = getMockAnalysis(activeTab)

  const handleAnalyze = () => {
    setShowResults(true)
  }

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Threat Analysis Workspace"
        subtitle="Run AI-powered inspections across multiple threat surfaces."
      />

      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            label={tab.label}
            icon={tab.icon}
            active={activeTab === tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              setShowResults(false)
              setInputValue('')
            }}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              {currentTab.label}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-slate-100">
              Provide the signal to analyze
            </h3>
          </div>
          <textarea
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder={currentTab.placeholder}
            className="min-h-[200px] w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
          />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleAnalyze}
              className="flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-cyan-300"
            >
              <FiPlay />
              Analyze Signal
            </button>
            <p className="text-sm text-slate-400">
              Mock analysis only. No data is sent or stored.
            </p>
          </div>
        </GlassCard>

        <GlassCard className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Risk Score
            </p>
            <h3 className="mt-2 text-lg font-semibold text-slate-100">
              Threat interpretation
            </h3>
          </div>
          {showResults ? (
            <div className="space-y-6">
              <RiskScore score={result.score} riskLevel={result.riskLevel} />
              <div className="soft-divider" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Explanation
                </p>
                <p className="mt-3 text-sm text-slate-300">
                  {result.explanation}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Indicators
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {result.indicators.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-400">
              Run an analysis to view the AI explanation and scoring rationale.
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  )
}

export default AnalysisPage
