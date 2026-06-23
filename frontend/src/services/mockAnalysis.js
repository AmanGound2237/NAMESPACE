export const mockAnalysisResults = {
  email: {
    score: 86,
    riskLevel: 'High Risk',
    explanation:
      'The sender domain mimics a trusted vendor and the reply-to address routes to an unrelated mailbox. Language patterns align with known payment diversion attempts.',
    indicators: [
      'Spoofed display name with mismatched reply-to',
      'Urgent payment request with new bank details',
      'Embedded link redirected through two shorteners',
    ],
  },
  url: {
    score: 72,
    riskLevel: 'Elevated',
    explanation:
      'The URL hosts a cloned authentication portal and loads third-party scripts linked to credential harvesting campaigns.',
    indicators: [
      'Recently registered domain with masked ownership',
      'TLS certificate issued within 48 hours',
      'Login form posts to an external endpoint',
    ],
  },
  screenshot: {
    score: 41,
    riskLevel: 'Moderate',
    explanation:
      'The captured login page uses inconsistent branding and displays UI elements that do not align with the legitimate service design system.',
    indicators: [
      'Logo resolution mismatch and pixelated header',
      'Unexpected MFA prompt text',
      'Footer links point to unrelated policies',
    ],
  },
}

export const getMockAnalysis = (type) => {
  return mockAnalysisResults[type] || mockAnalysisResults.email
}
