import { team, sampleProjects } from '@/lib/constants';

export default function TeamPage() {
  const allDeliverables = sampleProjects.flatMap(p => p.sprints.flatMap(s => s.deliverables));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Team Hub</h1>
        <p className="text-sm text-gray-500 mt-1">Team profiles, skills, delegation framework, and workload</p>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-3 gap-6">
        {team.map(member => {
          const memberTasks = allDeliverables.filter(d => d.owner === member.name);
          const openTasks = memberTasks.filter(d => d.status !== 'complete');
          const completedTasks = memberTasks.filter(d => d.status === 'complete');

          return (
            <div key={member.name} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="p-6 pb-4" style={{ borderBottom: `3px solid ${member.color}` }}>
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="text-center p-2 rounded-lg bg-gray-50">
                    <p className="text-lg font-bold" style={{ color: member.color }}>{openTasks.length}</p>
                    <p className="text-[10px] text-gray-500 uppercase">Open</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-gray-50">
                    <p className="text-lg font-bold text-green-600">{completedTasks.length}</p>
                    <p className="text-[10px] text-gray-500 uppercase">Done</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-gray-50">
                    <p className="text-lg font-bold text-gray-900">{memberTasks.length}</p>
                    <p className="text-[10px] text-gray-500 uppercase">Total</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="px-6 py-4 border-b border-gray-100">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map(skill => (
                    <span
                      key={skill}
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: member.color + '12',
                        color: member.color,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="px-6 py-4 border-b border-gray-100">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Tools</h4>
                <div className="flex flex-wrap gap-1.5">
                  {member.tools.map(tool => (
                    <span key={tool} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Delegation Areas */}
              <div className="px-6 py-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Delegation Areas</h4>
                <ul className="space-y-1.5">
                  {member.delegationAreas.map(area => (
                    <li key={area} className="text-xs text-gray-600 flex items-start gap-2">
                      <span className="text-[10px] mt-0.5" style={{ color: member.color }}>&#9679;</span>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delegation Framework */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">External Resources</h3>
        </div>
        <div className="grid grid-cols-2 gap-6 p-6">
          <div className="p-4 rounded-lg border border-gray-100">
            <h4 className="font-medium text-gray-900 mb-1">Backend Developers</h4>
            <p className="text-xs text-gray-500 mb-2">Via Dominika&apos;s network</p>
            <p className="text-sm text-gray-600">
              Complex server-side development, database architecture, API integrations, and anything beyond
              the capability of vibe coding tools. Willow identifies when this is needed and recommends the right resource.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-gray-100">
            <h4 className="font-medium text-gray-900 mb-1">Copywriter</h4>
            <p className="text-xs text-gray-500 mb-2">Freelance / External</p>
            <p className="text-sm text-gray-600">
              Website copy, campaign copy, case studies, email sequences, and brand messaging
              when not handled by Kelly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
