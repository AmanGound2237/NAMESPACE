import { useState } from 'react'
import { FiMail, FiLink, FiImage, FiPlay, FiUpload, FiCheck, FiAlertCircle } from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'
import TabButton from '../components/TabButton.jsx'
import RiskScore from '../components/RiskScore.jsx'
import { api } from '../services/api.js'

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
    placeholder: 'Describe the context or upload notes (optional)...',
  },
]

const AnalysisPage = () => {
  const [activeTab, setActiveTab] = useState('email')
  const [inputValue, setInputValue] = useState('')
  const [screenshotFile, setScreenshotFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const currentTab = tabs.find((tab) => tab.id === activeTab)

  const handleAnalyze = async () => {
    setError('')
    setResult(null)
    
    // Validations
    if (activeTab === 'screenshot' && !screenshotFile) {
      setError('Please upload a screenshot image to analyze.')
      return
    }
    if (activeTab !== 'screenshot' && !inputValue.trim()) {
      setError('Please provide input content to inspect.')
      return
    }

    setLoading(true)
    try {
      let response
      if (activeTab === 'email') {
        response = await api.analyzeEmail(inputValue)
      } else if (activeTab === 'url') {
        response = await api.analyzeUrl(inputValue)
      } else if (activeTab === 'screenshot') {
        response = await api.analyzeScreenshot(screenshotFile, inputValue)
      }
      setResult(response)
    } catch (err) {
      setError(err.message || 'Inspection failed')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshotFile(e.target.files[0])
      setError('')
    }
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
              setResult(null)
              setInputValue('')
              setScreenshotFile(null)
              setError('')
            }}
          />
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
          <FiAlertCircle className="text-lg shrink-0" />
          <span>{error}</span>
        </div>
      )}

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

          {activeTab === 'screenshot' ? (
            <div className="space-y-4">
              <label className="flex min-h-[140px] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 hover:bg-white/10 transition p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {screenshotFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <FiCheck className="text-3xl text-cyan-400" />
                    <p className="text-sm font-medium text-slate-200">{screenshotFile.name}</p>
                    <p className="text-xs text-slate-500">{(screenshotFile.size / 1024).toFixed(1)} KB</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <FiUpload className="text-3xl text-slate-400" />
                    <p className="text-sm text-slate-200">Click to upload screenshot</p>
                    <p className="text-xs text-slate-500">PNG, JPG, or WEBP up to 10MB</p>
                  </div>
                )}
              </label>

              <textarea
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder={currentTab.placeholder}
                className="min-h-[100px] w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          ) : (
            <textarea
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder={currentTab.placeholder}
              className="min-h-[200px] w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={loading}
              className="flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-cyan-300 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
              ) : (
                <FiPlay />
              )}
              {loading ? 'Analyzing...' : 'Analyze Signal'}
            </button>
            <p className="text-sm text-slate-400">
              Scanned signals will compile into the network graph dynamically.
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
          
          {result ? (
            <div className="space-y-6">
              <RiskScore score={result.score} riskLevel={result.verdict} />
              <div className="soft-divider h-px bg-white/10" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Explanation
                </p>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {result.explanation}
                </p>
              </div>
              {result.indicators && result.indicators.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Indicators
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    {result.indicators.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm text-slate-400">
              {loading ? 'Processing telemetry feed and parsing risk dimensions...' : 'Run an analysis to view the AI explanation and scoring rationale.'}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  )
}

export default AnalysisPage
