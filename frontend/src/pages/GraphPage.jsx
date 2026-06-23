import { useState, useEffect } from 'react'
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow'
import SectionHeader from '../components/SectionHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'
import { api } from '../services/api.js'

const GraphPage = () => {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const data = await api.getNetwork()
        setNodes(data.nodes || [])
        setEdges(data.edges || [])
      } catch (err) {
        setError('Failed to fetch scam relation telemetry')
      } finally {
        setLoading(false)
      }
    }
    fetchGraph()
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
        title="Scam Relationship Graph"
        subtitle="Visualize how actors, infrastructure, and victims connect."
      />
      
      {error && (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
          {error}. Rendering offline node buffer.
        </div>
      )}

      <GlassCard className="h-[620px] p-2">
        <div className="h-full rounded-2xl bg-slate-950/60">
          {nodes.length > 0 ? (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              fitView
              className="rounded-2xl"
            >
              <MiniMap
                nodeColor={(node) => {
                  if (node.style && node.style.background) {
                    return node.style.background;
                  }
                  return '#38bdf8';
                }}
                maskColor="rgba(15, 23, 42, 0.85)"
              />
              <Controls showInteractive={false} />
              <Background color="rgba(148, 163, 184, 0.2)" gap={20} />
            </ReactFlow>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              No threat nodes processed in workspace yet. Run investigations to compile connections.
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  )
}

export default GraphPage
