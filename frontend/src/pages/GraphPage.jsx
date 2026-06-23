import { useMemo } from 'react'
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow'
import SectionHeader from '../components/SectionHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'
import { graphNodes, graphEdges } from '../data/mockData.js'

const GraphPage = () => {
  const nodes = useMemo(() => graphNodes, [])
  const edges = useMemo(() => graphEdges, [])

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Scam Relationship Graph"
        subtitle="Visualize how actors, infrastructure, and victims connect."
      />
      <GlassCard className="h-[620px] p-2">
        <div className="h-full rounded-2xl bg-slate-950/60">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            className="rounded-2xl"
          >
            <MiniMap
              nodeColor={() => '#38bdf8'}
              maskColor="rgba(15, 23, 42, 0.85)"
            />
            <Controls showInteractive={false} />
            <Background color="rgba(148, 163, 184, 0.2)" gap={20} />
          </ReactFlow>
        </div>
      </GlassCard>
    </div>
  )
}

export default GraphPage
