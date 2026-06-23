export const dashboardStats = [
  {
    title: 'Active Monitoring',
    value: '124',
    change: '+12% this week',
    trend: 'up',
  },
  {
    title: 'Threats Blocked',
    value: '2,418',
    change: '+6% this week',
    trend: 'up',
  },
  {
    title: 'High Risk Alerts',
    value: '38',
    change: '-4% this week',
    trend: 'down',
  },
  {
    title: 'Response Time',
    value: '4.2s',
    change: '-0.6s this week',
    trend: 'down',
  },
]

export const recentAnalyses = [
  {
    id: 'an-204',
    type: 'Email',
    target: 'billing@trust-secure.com',
    score: 86,
    verdict: 'High Risk',
    date: 'May 28, 2026',
  },
  {
    id: 'an-205',
    type: 'URL',
    target: 'secure-invoice-portal.net',
    score: 72,
    verdict: 'Elevated',
    date: 'May 28, 2026',
  },
  {
    id: 'an-206',
    type: 'Screenshot',
    target: 'Login prompt capture',
    score: 41,
    verdict: 'Moderate',
    date: 'May 27, 2026',
  },
  {
    id: 'an-207',
    type: 'Email',
    target: 'it-support@net-check.io',
    score: 94,
    verdict: 'Critical',
    date: 'May 27, 2026',
  },
]

export const threatSummary = [
  {
    id: 'ts-1',
    title: 'Credential Harvesting',
    count: 18,
    level: 'Severe',
    description: 'Impersonation portals targeting corporate logins.',
  },
  {
    id: 'ts-2',
    title: 'Invoice Fraud',
    count: 9,
    level: 'High',
    description: 'Look-alike domains with altered payment info.',
  },
  {
    id: 'ts-3',
    title: 'Malware Delivery',
    count: 5,
    level: 'Elevated',
    description: 'Droppers embedded in document attachments.',
  },
]

export const graphNodes = [
  {
    id: 'email',
    data: { label: 'Email: billing@trust-secure.com' },
    position: { x: 0, y: 0 },
    style: {
      background: 'rgba(14, 116, 144, 0.65)',
      color: '#e2e8f0',
      border: '1px solid rgba(56, 189, 248, 0.6)',
      borderRadius: 14,
      padding: 12,
    },
  },
  {
    id: 'domain',
    data: { label: 'Domain: secure-invoice-portal.net' },
    position: { x: 260, y: -120 },
    style: {
      background: 'rgba(30, 64, 175, 0.6)',
      color: '#e2e8f0',
      border: '1px solid rgba(99, 102, 241, 0.6)',
      borderRadius: 14,
      padding: 12,
    },
  },
  {
    id: 'phone',
    data: { label: 'Phone: +1 (312) 555-0136' },
    position: { x: 260, y: 120 },
    style: {
      background: 'rgba(8, 145, 178, 0.65)',
      color: '#e2e8f0',
      border: '1px solid rgba(34, 211, 238, 0.6)',
      borderRadius: 14,
      padding: 12,
    },
  },
  {
    id: 'victim',
    data: { label: 'Victim: Accounts Payable Team' },
    position: { x: 560, y: 0 },
    style: {
      background: 'rgba(15, 23, 42, 0.8)',
      color: '#e2e8f0',
      border: '1px solid rgba(148, 163, 184, 0.4)',
      borderRadius: 14,
      padding: 12,
    },
  },
]

export const graphEdges = [
  {
    id: 'e1-2',
    source: 'email',
    target: 'domain',
    animated: true,
    style: { stroke: '#38bdf8', strokeWidth: 2 },
  },
  {
    id: 'e1-3',
    source: 'email',
    target: 'phone',
    animated: true,
    style: { stroke: '#22d3ee', strokeWidth: 2 },
  },
  {
    id: 'e2-4',
    source: 'domain',
    target: 'victim',
    style: { stroke: '#60a5fa', strokeWidth: 2 },
  },
  {
    id: 'e3-4',
    source: 'phone',
    target: 'victim',
    style: { stroke: '#38bdf8', strokeWidth: 2 },
  },
]
