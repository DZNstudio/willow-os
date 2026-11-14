import { sampleCampaigns, team } from '@/lib/constants';

export default function CampaignsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaign Builder</h1>
          <p className="text-sm text-gray-500 mt-1">Marketing campaign briefs, delegation, and tracking</p>
        </div>
        <button className="px-4 py-2.5 bg-[#00796B] text-white text-sm font-medium rounded-lg hover:bg-[#004D40] transition-colors">
          + New Campaign
        </button>
      </div>

      {/* Campaign Cards */}
      {sampleCampaigns.map(campaign => (
        <div key={campaign.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Campaign Header */}
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{campaign.timeline}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                campaign.status === 'active' ? 'bg-green-50 text-green-700' :
                campaign.status === 'draft' ? 'bg-gray-100 text-gray-500' :
                'bg-purple-50 text-purple-700'
              }`}>
                {campaign.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 divide-x divide-gray-100">
            {/* Left: Brief Details */}
            <div className="p-6 space-y-5">
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Objective</h4>
                <p className="text-sm text-gray-700">{campaign.objective}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Target Audience</h4>
                <p className="text-sm text-gray-700">{campaign.audience}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Channels</h4>
                <div className="flex flex-wrap gap-2">
                  {campaign.channels.map(ch => (
                    <span key={ch} className="text-xs px-3 py-1 rounded-full bg-[#E0F2F1] text-[#00796B] font-medium">
                      {ch}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Creative Direction</h4>
                <p className="text-sm text-gray-700">{campaign.creativeDirection}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Success Metrics</h4>
                <div className="grid grid-cols-2 gap-2">
                  {campaign.metrics.map(m => (
                    <div key={m} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00796B]" />
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Delegation Plan */}
            <div className="p-6">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Delegation Plan</h4>
              <div className="space-y-5">
                {campaign.delegation.map(del => {
                  const member = team.find(t => t.name === del.member);
                  return (
                    <div key={del.member}>
                      <div className="flex items-center gap-2.5 mb-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: member?.color }}
                        >
                          {member?.initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{del.member}</p>
                          <p className="text-xs text-gray-400">{member?.role}</p>
                        </div>
                      </div>
                      <ul className="ml-10 space-y-1">
                        {del.tasks.map(task => (
                          <li key={task} className="text-sm text-gray-600 flex items-center gap-2">
                            <span className="w-4 h-4 rounded border border-gray-300 flex-shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Campaign Template */}
      <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
        <div className="text-4xl mb-3">📋</div>
        <h3 className="font-semibold text-gray-900 mb-1">Campaign Brief Template</h3>
        <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
          Every campaign brief includes: objective, audience, message, channels, timeline,
          creative direction, delegation plan, sprint structure, and success metrics.
        </p>
        <button className="px-4 py-2.5 bg-[#00796B] text-white text-sm font-medium rounded-lg hover:bg-[#004D40] transition-colors">
          Create Campaign Brief
        </button>
      </div>
    </div>
  );
}
