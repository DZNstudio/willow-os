import { sampleProjects, sampleClients, sampleActivity, team, sampleTrends, colors } from '@/lib/constants';

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-3xl font-bold mt-1" style={{ color }}>{value}</p>
      <p className="text-xs text-gray-400 mt-1">{sub}</p>
    </div>
  );
}

export default function DashboardPage() {
  const activeProjects = sampleProjects.filter(p => p.status === 'active');
  const allDeliverables = sampleProjects.flatMap(p => p.sprints.flatMap(s => s.deliverables));
  const pendingDeliverables = allDeliverables.filter(d => d.status !== 'complete');
  const activeClients = sampleClients.filter(c => c.stage === 'active');
  const leads = sampleClients.filter(c => c.stage === 'lead' || c.stage === 'proposal');

  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-5">
        <StatCard label="Active Projects" value={activeProjects.length} sub={`${sampleProjects.length} total`} color={colors.willow} />
        <StatCard label="Open Tasks" value={pendingDeliverables.length} sub={`${allDeliverables.length} total deliverables`} color={colors.accent} />
        <StatCard label="Active Clients" value={activeClients.length} sub={`${leads.length} in pipeline`} color={colors.phases.Design} />
        <StatCard label="Trending Now" value={sampleTrends.filter(t => t.status === 'implement').length} sub={`${sampleTrends.length} tracked`} color={colors.phases.Discovery} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Active Projects */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Active Projects</h3>
            <a href="/projects" className="text-xs text-[#00796B] font-medium hover:underline">View all</a>
          </div>
          <div className="divide-y divide-gray-50">
            {activeProjects.map(project => {
              const currentSprint = project.sprints[project.sprints.length - 1];
              const progress = currentSprint
                ? Math.round((currentSprint.deliverables.filter(d => d.status === 'complete').length / currentSprint.deliverables.length) * 100)
                : 0;
              return (
                <div key={project.id} className="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: colors.phases[project.phase] }}
                      />
                      <div>
                        <p className="font-medium text-sm text-gray-900">{project.name}</p>
                        <p className="text-xs text-gray-500">{project.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: colors.phases[project.phase] + '18',
                          color: colors.phases[project.phase],
                        }}
                      >
                        {project.phase}
                      </span>
                      <div className="w-24">
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                          <span>Sprint {currentSprint?.number}</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full">
                          <div
                            className="h-1.5 rounded-full transition-all"
                            style={{
                              width: `${progress}%`,
                              backgroundColor: colors.phases[project.phase],
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Workload */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Team Workload</h3>
            <a href="/team" className="text-xs text-[#00796B] font-medium hover:underline">View team</a>
          </div>
          <div className="p-6 space-y-5">
            {team.map(member => {
              const tasks = allDeliverables.filter(d => d.owner === member.name && d.status !== 'complete');
              return (
                <div key={member.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: member.color }}
                      >
                        {member.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-400">{tasks.length} open tasks</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min(tasks.length * 25, 100)}%`,
                        backgroundColor: member.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {sampleActivity.map(item => {
              const member = team.find(t => t.name === item.actor);
              return (
                <div key={item.id} className="px-6 py-3.5 flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                    style={{ backgroundColor: member?.color || '#94a3b8' }}
                  >
                    {member?.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{item.actor}</span>{' '}
                      <span className="text-gray-400">{item.action}</span>{' '}
                      <span className="font-medium">{item.subject}</span>
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{item.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-4 space-y-2">
            {[
              { label: 'New Project', href: '/projects' },
              { label: 'New Campaign', href: '/campaigns' },
              { label: 'View Calendar', href: '#' },
              { label: 'Client Pipeline', href: '/clients' },
              { label: 'Weekly Trends', href: '/trends' },
            ].map(action => (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#E0F2F1] hover:text-[#00796B] transition-colors"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Upcoming Deadlines</h3>
        </div>
        <div className="grid grid-cols-4 gap-4 p-6">
          {pendingDeliverables
            .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
            .slice(0, 8)
            .map(d => {
              const member = team.find(t => t.name === d.owner);
              const daysUntil = Math.ceil((new Date(d.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              return (
                <div key={d.id} className="p-4 rounded-lg border border-gray-100 hover:border-[#00796B]/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                      style={{ backgroundColor: member?.color }}
                    >
                      {member?.initials}
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      daysUntil <= 3 ? 'bg-red-50 text-red-600' : daysUntil <= 7 ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'
                    }`}>
                      {daysUntil <= 0 ? 'Overdue' : `${daysUntil}d`}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1">{d.name}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(d.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    {' '}&middot; {d.owner}
                  </p>
                </div>
              );
            })}
        </div>
      </div>

      {/* Coldstar Stats Bar */}
      <div className="bg-[#0d0f14] rounded-xl p-8">
        <div className="grid grid-cols-4 gap-6 text-center">
          {[
            { value: '107', label: 'WALLETS CREATED' },
            { value: '37', label: 'ACTIVELY SIGNING' },
            { value: '1%', label: 'TX FEE (CAPPED $10)' },
            { value: '35%', label: 'RETENTION RATE' },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-[#00f0a0]">{stat.value}</p>
              <p className="text-[10px] font-semibold tracking-widest text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Coldstar */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Why Coldstar?</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: '\u25C7', color: '#00f0a0', bg: 'rgba(0,240,160,0.12)', title: 'True Air Gap', desc: 'Private keys never touch a networked machine. QR codes bridge the gap optically.' },
            { icon: '$', color: '#f0c040', bg: 'rgba(240,192,64,0.12)', title: '$10 vs $200', desc: 'Any USB drive. No proprietary hardware, no vendor lock-in. Compromised? Destroy it and restore for $5.' },
            { icon: '\u2713', color: '#a070f0', bg: 'rgba(160,112,240,0.12)', title: 'Jupiter Swaps', desc: 'Swap any Solana token from the command line via Jupiter DEX. Air-gapped signing included.' },
            { icon: '\u25A1', color: '#00f0a0', bg: 'rgba(0,240,160,0.12)', title: 'Cross-Platform', desc: 'macOS, Linux, Windows. Rich TUI interface. Install with pip or run from source.' },
            { icon: '\u2692', color: '#00f0a0', bg: 'rgba(0,240,160,0.12)', title: 'Fully Open Source', desc: 'Every line on GitHub. Audit the entire security model. No hidden firmware.' },
            { icon: '\u25C7', color: '#e08050', bg: 'rgba(224,128,80,0.12)', title: 'Multi-Chain', desc: 'Solana + Base (Coinbase L2). Ed25519 and secp256k1 signing. One wallet, two ecosystems.' },
          ].map(f => (
            <div key={f.title} className="bg-[#141820] border border-[#1e2430] rounded-xl p-5 hover:border-[#2a3040] transition-colors">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold mb-3"
                style={{ background: f.bg, color: f.color, border: `1px solid ${f.color}30` }}
              >
                {f.icon}
              </div>
              <h3 className="font-bold text-white text-sm mb-1 font-mono">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
