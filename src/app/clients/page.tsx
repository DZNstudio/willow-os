import { sampleClients, clientTypeStrategies, colors } from '@/lib/constants';
import type { ClientStage } from '@/lib/types';

const stageLabels: Record<ClientStage, string> = {
  lead: 'Lead',
  proposal: 'Proposal',
  active: 'Active',
  completed: 'Completed',
};

export default function ClientsPage() {
  const stages: ClientStage[] = ['lead', 'proposal', 'active', 'completed'];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
          <p className="text-sm text-gray-500 mt-1">Pipeline, client types, and relationship tracking</p>
        </div>
        <button className="px-4 py-2.5 bg-[#00796B] text-white text-sm font-medium rounded-lg hover:bg-[#004D40] transition-colors">
          + New Client
        </button>
      </div>

      {/* Pipeline Kanban */}
      <div className="grid grid-cols-4 gap-4">
        {stages.map(stage => {
          const clients = sampleClients.filter(c => c.stage === stage);
          return (
            <div key={stage}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.stages[stage] }} />
                <h3 className="text-sm font-semibold text-gray-700">{stageLabels[stage]}</h3>
                <span className="text-xs text-gray-400 ml-auto">{clients.length}</span>
              </div>
              <div className="space-y-3">
                {clients.map(client => (
                  <div
                    key={client.id}
                    className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm text-gray-900">{client.name}</h4>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        {client.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{client.entryPoint}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#00796B]">{client.value}</span>
                      {client.projects.length > 0 && (
                        <span className="text-xs text-gray-400">
                          {client.projects.length} project{client.projects.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {clients.length === 0 && (
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                    <p className="text-xs text-gray-400">No clients</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Client Type Strategies */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Client Type Playbooks</h2>
        <div className="grid grid-cols-5 gap-4">
          {Object.entries(clientTypeStrategies).map(([type, strategy]) => {
            const typeColors: Record<string, string> = {
              SME: '#FF6F00',
              Brand: '#7C4DFF',
              Web: '#00796B',
              'E-Commerce': '#E91E63',
              Hospitality: '#00BCD4',
            };
            return (
              <div key={type} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: typeColors[type] }} />
                  <h4 className="font-semibold text-sm text-gray-900">{type}</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-wide">Approach</p>
                    <p className="text-xs text-gray-600 mt-0.5">{strategy.lead}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-wide">Entry Point</p>
                    <p className="text-xs text-gray-600 mt-0.5">{strategy.entry}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-wide">Upsell</p>
                    <p className="text-xs text-gray-600 mt-0.5">{strategy.upsell}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
