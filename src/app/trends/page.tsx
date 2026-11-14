import { sampleTrends } from '@/lib/constants';

const disciplineColors: Record<string, string> = {
  'Web Design': '#00796B',
  'Graphic Design': '#E91E63',
  'UI/UX': '#7C4DFF',
  'Branding': '#FF6F00',
  'Motion/3D': '#00BCD4',
};

export default function TrendsPage() {
  const implementTrends = sampleTrends.filter(t => t.status === 'implement');
  const watchTrends = sampleTrends.filter(t => t.status === 'watch');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Design Trends</h1>
          <p className="text-sm text-gray-500 mt-1">Weekly trend tracking across all disciplines</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">Last updated: Week 15, 2026</span>
          <button className="px-4 py-2.5 bg-[#00796B] text-white text-sm font-medium rounded-lg hover:bg-[#004D40] transition-colors">
            + Add Trend
          </button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Ready to Implement</p>
          <p className="text-3xl font-bold mt-1 text-green-600">{implementTrends.length}</p>
          <p className="text-xs text-gray-400 mt-1">Validated and ready for live projects</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Watching</p>
          <p className="text-3xl font-bold mt-1 text-amber-500">{watchTrends.length}</p>
          <p className="text-xs text-gray-400 mt-1">Monitoring for maturity and relevance</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Tracked</p>
          <p className="text-3xl font-bold mt-1 text-[#00796B]">{sampleTrends.length}</p>
          <p className="text-xs text-gray-400 mt-1">Across all disciplines</p>
        </div>
      </div>

      {/* Ready to Implement */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          Ready to Implement
        </h2>
        <div className="grid grid-cols-2 gap-5">
          {implementTrends.map(trend => (
            <div key={trend.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{trend.name}</h3>
                <span className="text-xs text-gray-400">{trend.week}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{trend.description}</p>

              <div className="space-y-3">
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-wide mb-1.5">Disciplines</p>
                  <div className="flex flex-wrap gap-1.5">
                    {trend.disciplines.map(d => (
                      <span
                        key={d}
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{
                          backgroundColor: (disciplineColors[d] || '#6b7280') + '15',
                          color: disciplineColors[d] || '#6b7280',
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-wide mb-1.5">Tools</p>
                  <div className="flex flex-wrap gap-1.5">
                    {trend.tools.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-wide mb-1">Application</p>
                  <p className="text-sm text-gray-600 bg-[#E0F2F1] rounded-lg p-3">{trend.example}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Watching */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          Watching
        </h2>
        <div className="grid grid-cols-2 gap-5">
          {watchTrends.map(trend => (
            <div key={trend.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 opacity-90">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{trend.name}</h3>
                <span className="text-xs text-gray-400">{trend.week}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{trend.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {trend.disciplines.map(d => (
                  <span
                    key={d}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      backgroundColor: (disciplineColors[d] || '#6b7280') + '15',
                      color: disciplineColors[d] || '#6b7280',
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-3 italic">{trend.example}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
