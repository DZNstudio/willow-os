export default function OpsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Agency Operations</h1>
        <p className="text-sm text-gray-500 mt-1">Pricing, proposals, workflow, and growth strategy</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Pricing & Proposals */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Pricing & Proposals</h3>
          </div>
          <div className="p-6 space-y-4">
            {[
              { service: 'Brand Identity Package', range: '\u00A33,500 \u2013 \u00A38,000', includes: 'Discovery, logo, colour, typography, brand guidelines' },
              { service: 'Website Design & Build', range: '\u00A34,000 \u2013 \u00A315,000', includes: 'Strategy, wireframes, design, build, CMS, launch' },
              { service: 'Shopify E-Commerce', range: '\u00A35,000 \u2013 \u00A312,000', includes: 'Store setup, custom theme, product upload, checkout flow' },
              { service: 'Social Media Retainer', range: '\u00A3800 \u2013 \u00A32,000/mo', includes: 'Content calendar, posting, engagement, monthly report' },
              { service: 'Marketing Campaign', range: '\u00A32,000 \u2013 \u00A35,000', includes: 'Strategy, creative, execution, analytics' },
            ].map(item => (
              <div key={item.service} className="p-4 rounded-lg border border-gray-100 hover:border-[#00796B]/20 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm text-gray-900">{item.service}</h4>
                  <span className="text-sm font-semibold text-[#00796B]">{item.range}</span>
                </div>
                <p className="text-xs text-gray-500">{item.includes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow & SOPs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Workflow & SOPs</h3>
          </div>
          <div className="p-6 space-y-4">
            {[
              { name: 'Client Onboarding', steps: ['Discovery call', 'Proposal sent', 'Contract signed', 'Kickoff meeting', 'Monday.com board created'], status: 'active' },
              { name: 'Project Delivery', steps: ['Brief confirmed', 'Sprint plan built', 'Design phase', 'Build phase', 'Client review', 'Revisions', 'Launch'], status: 'active' },
              { name: 'Design Feedback Loop', steps: ['Internal review (Willow)', 'Quality check (Dominika)', 'Client presentation', 'Revisions', 'Final sign-off'], status: 'active' },
              { name: 'Campaign Execution', steps: ['Brief approved', 'Creative production', 'Content calendar', 'Launch', 'Weekly reporting', 'Optimisation'], status: 'active' },
            ].map(sop => (
              <div key={sop.name} className="p-4 rounded-lg border border-gray-100">
                <h4 className="font-medium text-sm text-gray-900 mb-2">{sop.name}</h4>
                <div className="flex items-center gap-1">
                  {sop.steps.map((step, i) => (
                    <div key={step} className="flex items-center">
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-5 rounded-full bg-[#E0F2F1] text-[#00796B] text-[9px] font-bold flex items-center justify-center">
                          {i + 1}
                        </div>
                        <span className="text-[10px] text-gray-500 max-w-16 leading-tight">{step}</span>
                      </div>
                      {i < sop.steps.length - 1 && (
                        <svg className="w-3 h-3 text-gray-300 mx-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Growth Strategy */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Growth Strategy</h3>
          </div>
          <div className="p-6 space-y-3">
            {[
              { area: 'Positioning', note: 'Niche into premium web + brand for SMEs and hospitality' },
              { area: 'Pricing', note: 'Value-based pricing, move from hourly to package rates' },
              { area: 'Revenue Model', note: 'Shift from project-based to retainer revenue' },
              { area: 'Hiring', note: 'Outsource before hiring; build SOPs first' },
              { area: 'Client Quality', note: 'Raise minimums, attract better clients through portfolio' },
            ].map(item => (
              <div key={item.area} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00796B] mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.area}</p>
                  <p className="text-xs text-gray-500">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Development */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Team Development</h3>
          </div>
          <div className="p-6 space-y-3">
            {[
              { focus: 'Cynthia - UI/UX Growth', note: 'Develop from junior to mid-level UI designer. Focus on Figma mastery and front-end skills.' },
              { focus: 'Kelly - Campaign Ownership', note: 'Move from content creation to full campaign management and analytics.' },
              { focus: 'Dominika - Creative Leadership', note: 'Strengthen art direction skills and client presentation delivery.' },
              { focus: 'All - Design Feedback', note: 'Build a culture of constructive critique and design rationale.' },
            ].map(item => (
              <div key={item.focus} className="p-3 rounded-lg bg-gray-50">
                <p className="text-sm font-medium text-gray-900">{item.focus}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Handoffs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Agent Suite Handoffs</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="p-4 rounded-lg border border-amber-200 bg-amber-50/50">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">🏢</span>
                <h4 className="font-medium text-sm text-gray-900">Pete, Deal Assessment</h4>
              </div>
              <p className="text-xs text-gray-600">
                Flag to Pete when a client engagement surfaces as a potential acquisition opportunity.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-blue-200 bg-blue-50/50">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">🔍</span>
                <h4 className="font-medium text-sm text-gray-900">Ricky Hale, Due Diligence</h4>
              </div>
              <p className="text-xs text-gray-600">
                Flag to Ricky when a target or counterparty requires background research or vetting.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#E0F2F1] text-center">
              <p className="text-xs text-[#00796B] font-medium">
                Willow stays in her lane, creative, technical, marketing, and agency operations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hard Rules */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Hard Rules</h3>
          <p className="text-xs text-gray-500 mt-0.5">Non-negotiable operating standards</p>
        </div>
        <div className="grid grid-cols-2 gap-4 p-6">
          {[
            'Never recommend a single tool without explaining why - always a ranked shortlist with reasoning',
            'Always produce a delegation plan when a project involves more than one team member',
            'Always produce a sprint and milestone plan for any project lasting more than one week',
            'Always lead with 3D, motion, or animation options on any premium web or brand project',
            'Never apply a design trend without first assessing whether it serves the brief',
            'Always distinguish between what vibe coding can achieve and when a backend developer is needed',
            'Always include success metrics in any campaign or project brief',
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
              <span className="w-5 h-5 rounded-full bg-[#00796B] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              {rule}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
