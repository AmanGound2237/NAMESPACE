  import { Link } from 'react-router-dom'
  import {
    FiArrowRight,
    FiFileText,
    FiGlobe,
    FiImage,
    FiMail,
    FiShield,
    FiSearch,
    FiCheckCircle,
  } from 'react-icons/fi'

  const quickActions = [
    {
      title: 'Analyze Email',
      description: 'Check suspicious messages for phishing, impersonation, and fraud cues.',
      icon: FiMail,
      to: '/analysis',
    },
    {
      title: 'Analyze URL',
      description: 'Review links for lookalike domains, unsafe redirects, and scam pages.',
      icon: FiGlobe,
      to: '/analysis',
    },
    {
      title: 'Upload Screenshot',
      description: 'Upload a message or page capture to spot warning signs in context.',
      icon: FiImage,
      to: '/analysis',
    },
    {
      title: 'Explore Scam Network',
      description: 'See how threats connect across domains, messages, and shared patterns.',
      icon: FiSearch,
      to: '/graph',
    },
  ]

  const trustPoints = [
    'Plain-language guidance for every step.',
    'Built for quick checks on phone or desktop.',
    'Designed to support families, seniors, and first-time users.',
  ]

  const LandingPage = () => {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b border-[#0b2b5b] bg-[#0b2b5b] text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/12">
                <FiShield className="text-xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-100">TruthNet AI</p>
                <h1 className="text-lg font-semibold tracking-normal text-white">
                  Scam Detection Portal
                </h1>
              </div>
            </div>
            <div className="hidden items-center gap-3 text-sm text-blue-100 md:flex">
              <span className="rounded-full bg-white/10 px-4 py-2">Trusted support</span>
              <span className="rounded-full bg-white/10 px-4 py-2">Easy to use</span>
            </div>
          </div>
        </header>

        <main>
          <section className="bg-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-16">
              <div className="max-w-3xl space-y-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-[#0b2b5b]">
                  <FiCheckCircle className="text-blue-700" />
                  Trusted help for suspicious emails, links, and screenshots
                </div>
                <div className="space-y-4">
                  <h2 className="max-w-2xl text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
                    Detect Threats Before They Become Scams
                  </h2>
                  <p className="max-w-2xl text-lg leading-8 text-slate-600">
                    Analyze suspicious emails, links, and screenshots. Understand scam
                    networks and protect yourself from online fraud.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    to="/analysis"
                    className="inline-flex items-center justify-center rounded-xl bg-[#0b2b5b] px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-[#12386f]"
                  >
                    Analyze Threat
                    <FiArrowRight className="ml-2" />
                  </Link>
                  <a
                    href="#learn-more"
                    className="inline-flex items-center justify-center rounded-xl bg-blue-50 px-6 py-4 text-base font-semibold text-[#0b2b5b] transition hover:bg-blue-100"
                  >
                    Learn More
                  </a>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {trustPoints.map((point) => (
                    <div
                      key={point}
                      className="rounded-2xl bg-slate-50 px-5 py-4 text-sm leading-6 text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 rounded-[2rem] bg-blue-100/60 blur-3xl" />
                <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)] ring-1 ring-blue-100">
                  <div className="border-b border-blue-100 bg-slate-50 px-6 py-5">
                    <p className="text-sm font-semibold text-[#0b2b5b]">What you can check</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Fast, simple checks designed for everyday users.
                    </p>
                  </div>
                  <div className="grid gap-4 p-6 sm:grid-cols-2">
                    {[
                      'Email sender and subject',
                      'Suspicious website links',
                      'Screenshots of messages',
                      'Related scam patterns',
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-blue-50 px-4 py-4 text-sm font-medium text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
                      >
                        <FiFileText className="mb-3 text-2xl text-blue-700" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-blue-100 bg-[#f8fbff] px-6 py-4">
                    <p className="text-sm leading-6 text-slate-600">
                      Clear guidance, simple language, and a calm interface for anyone
                      trying to verify a suspicious message.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="learn-more" className="bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
              <div className="mb-6 max-w-3xl space-y-3">
                <p className="text-sm font-semibold text-[#0b2b5b]">Quick Actions</p>
                <h3 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                  Start with the most common checks
                </h3>
                <p className="text-lg leading-8 text-slate-600">
                  Large, easy-to-read cards help you move directly to the task you need.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {quickActions.map((action) => {
                  const Icon = action.icon

                  return (
                    <Link
                      key={action.title}
                      to={action.to}
                      className="group flex h-[260px] flex-col justify-between rounded-[1.75rem] bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)] ring-1 ring-blue-100 transition hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(15,23,42,0.12)]"
                    >
                      <div>
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[1.75rem] text-[#0b2b5b] transition group-hover:bg-[#0b2b5b] group-hover:text-white">
                          <Icon />
                        </div>
                        <h4 className="mt-5 text-2xl font-semibold text-slate-900">
                          {action.title}
                        </h4>
                        <p className="mt-3 text-base leading-7 text-slate-600">
                          {action.description}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-[#0b2b5b]">
                        Open
                        <FiArrowRight className="ml-2 transition group-hover:translate-x-1" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="bg-white" id="service-guidance">
            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
              <div className="mb-6 max-w-3xl space-y-3">
                <p className="text-sm font-semibold text-[#0b2b5b]">How it works</p>
                <h3 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                  A simple three-step path
                </h3>
                <p className="text-lg leading-8 text-slate-600">
                  The page keeps the flow clear so anyone can understand what to do next.
                </p>
              </div>
              <div className="grid gap-5 lg:grid-cols-3">
                {[
                  {
                    step: 'Step 1',
                    title: 'Check what looks unusual',
                    description:
                      'Review the sender, link, or image for signs of impersonation and deception.',
                  },
                  {
                    step: 'Step 2',
                    title: 'Understand the result',
                    description:
                      'See a readable summary that explains why something may be risky.',
                  },
                  {
                    step: 'Step 3',
                    title: 'Decide what to do next',
                    description:
                      'Use the output to stay safe, warn family members, or continue investigating.',
                  },
                ].map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-[1.75rem] bg-slate-50 p-7 shadow-[0_14px_36px_rgba(15,23,42,0.06)]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-base font-semibold text-white shadow-[0_10px_20px_rgba(37,99,235,0.24)]">
                        {index + 1}
                      </div>
                      <p className="text-sm font-semibold uppercase tracking-normal text-[#0b2b5b]">
                        {step.step}
                      </p>
                    </div>
                    <h4 className="mt-5 text-2xl font-semibold text-slate-900">
                      {step.title}
                    </h4>
                    <p className="mt-3 text-base leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }

  export default LandingPage
