'use client';

import { useState, useEffect } from 'react';
import { sampleProjects, team, colors, projectDiscoverySteps } from '@/lib/constants';
import type { Project, ProjectDiscoveryAnswers, ClientContext } from '@/lib/types';

// ── localStorage helpers ───────────────────────────────────────
function getClientContexts(): ClientContext[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem('willow-clients') || '[]'); } catch { return []; }
}
function saveClientContexts(contexts: ClientContext[]) {
  localStorage.setItem('willow-clients', JSON.stringify(contexts));
}
function getUserProjects(): Project[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem('willow-projects') || '[]'); } catch { return []; }
}
function saveUserProjects(projects: Project[]) {
  localStorage.setItem('willow-projects', JSON.stringify(projects));
}

export default function ProjectsPage() {
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setUserProjects(getUserProjects());
  }, []);

  const allProjects = [...sampleProjects, ...userProjects];
  const step = projectDiscoverySteps[currentStep];
  const totalSteps = projectDiscoverySteps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  function updateField(key: string, value: string) {
    setAnswers(prev => ({ ...prev, [key]: value }));
  }

  function canAdvance(): boolean {
    const requiredFields = step.fields.filter(f => f.required);
    return requiredFields.every(f => answers[f.key]?.trim());
  }

  function handleNext() {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  }

  function handleBack() {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  }

  function handleSubmit() {
    const disc = answers as unknown as ProjectDiscoveryAnswers;
    const clientId = `cli-${Date.now()}`;
    const projectId = `proj-${Date.now()}`;

    // Save client context
    const contexts = getClientContexts();
    const existingClient = contexts.find(c => c.clientName.toLowerCase() === (disc.clientName || '').toLowerCase());
    if (existingClient) {
      existingClient.projects.push(disc);
    } else {
      contexts.push({
        id: clientId,
        clientName: disc.clientName || 'Unnamed Client',
        clientWebsite: disc.clientWebsite || '',
        clientType: disc.clientType || 'SME',
        createdAt: new Date().toISOString(),
        projects: [disc],
      });
    }
    saveClientContexts(contexts);

    // Create project
    const newProject: Project = {
      id: projectId,
      name: `${disc.clientName} ${disc.projectType || 'Project'}`,
      client: disc.clientName || 'Unnamed Client',
      phase: 'Discovery',
      status: 'active',
      description: disc.projectDescription || disc.projectType || '',
      sprints: [{
        id: `spr-${Date.now()}`,
        name: 'Discovery & Research',
        number: 1,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        deliverables: [
          { id: `d-${Date.now()}-1`, name: 'Client brief & discovery notes', owner: 'Cynthia', deadline: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0], status: 'complete' },
          { id: `d-${Date.now()}-2`, name: 'Competitor research', owner: 'Kelly', deadline: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0], status: 'pending' },
          { id: `d-${Date.now()}-3`, name: 'Mood board & direction', owner: 'Dominika', deadline: new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0], status: 'pending' },
        ],
        milestone: { id: `m-${Date.now()}`, name: 'Discovery Sign-off', date: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0], completed: false },
      }],
    };

    const projects = getUserProjects();
    projects.push(newProject);
    saveUserProjects(projects);
    setUserProjects(projects);

    setSavedSuccess(true);
    setTimeout(() => {
      setShowModal(false);
      setCurrentStep(0);
      setAnswers({});
      setSavedSuccess(false);
    }, 2000);
  }

  function openModal() {
    setShowModal(true);
    setCurrentStep(0);
    setAnswers({});
    setSavedSuccess(false);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects & Sprints</h1>
          <p className="text-sm text-gray-500 mt-1">Manage project phases, sprints, and milestones</p>
        </div>
        <button
          onClick={openModal}
          className="px-4 py-2.5 bg-[#00796B] text-white text-sm font-medium rounded-lg hover:bg-[#004D40] transition-colors"
        >
          + New Project
        </button>
      </div>

      {/* Phase Filter */}
      <div className="flex gap-2">
        {(['All', 'Discovery', 'Design', 'Build', 'Review', 'Launch'] as const).map(phase => (
          <button
            key={phase}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors"
            style={
              phase === 'All'
                ? { backgroundColor: '#00796B', color: 'white', borderColor: '#00796B' }
                : { backgroundColor: 'white', color: '#6b7280', borderColor: '#e5e7eb' }
            }
          >
            {phase}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="space-y-6">
        {allProjects.map(project => (
          <div key={project.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Project Header */}
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-3 h-10 rounded-full"
                    style={{ backgroundColor: colors.phases[project.phase] }}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.client} &middot; {project.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: colors.phases[project.phase] + '18',
                      color: colors.phases[project.phase],
                    }}
                  >
                    {project.phase}
                  </span>
                  <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                    project.status === 'active' ? 'bg-green-50 text-green-700' :
                    project.status === 'paused' ? 'bg-amber-50 text-amber-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Phase Progress Bar */}
            <div className="px-6 py-3 bg-gray-50/50 border-b border-gray-100">
              <div className="flex items-center gap-1">
                {(['Discovery', 'Design', 'Build', 'Review', 'Launch'] as const).map((phase, i) => {
                  const phases = ['Discovery', 'Design', 'Build', 'Review', 'Launch'];
                  const currentIdx = phases.indexOf(project.phase);
                  const isComplete = i < currentIdx;
                  const isCurrent = i === currentIdx;
                  return (
                    <div key={phase} className="flex-1">
                      <div className="text-[10px] text-gray-400 mb-1 text-center">{phase}</div>
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          backgroundColor: isComplete
                            ? colors.phases[phase]
                            : isCurrent
                            ? colors.phases[phase] + '60'
                            : '#e5e7eb',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sprints */}
            <div className="divide-y divide-gray-50">
              {project.sprints.map(sprint => (
                <div key={sprint.id} className="px-6 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">
                        Sprint {sprint.number}: {sprint.name}
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(sprint.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        {' '}&ndash;{' '}
                        {new Date(sprint.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    {sprint.milestone && (
                      <div className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${
                        sprint.milestone.completed ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        <span>{sprint.milestone.completed ? '\u2713' : '\u25CB'}</span>
                        {sprint.milestone.name}
                      </div>
                    )}
                  </div>

                  {/* Deliverables Table */}
                  <div className="rounded-lg border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-xs text-gray-500">
                          <th className="text-left px-4 py-2 font-medium">Deliverable</th>
                          <th className="text-left px-4 py-2 font-medium">Owner</th>
                          <th className="text-left px-4 py-2 font-medium">Deadline</th>
                          <th className="text-left px-4 py-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {sprint.deliverables.map(d => {
                          const member = team.find(t => t.name === d.owner);
                          return (
                            <tr key={d.id} className="hover:bg-gray-50/50">
                              <td className="px-4 py-2.5 font-medium text-gray-900">{d.name}</td>
                              <td className="px-4 py-2.5">
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold"
                                    style={{ backgroundColor: member?.color }}
                                  >
                                    {member?.initials}
                                  </div>
                                  <span className="text-gray-600">{d.owner}</span>
                                </div>
                              </td>
                              <td className="px-4 py-2.5 text-gray-500">
                                {new Date(d.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                              </td>
                              <td className="px-4 py-2.5">
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                  d.status === 'complete' ? 'bg-green-50 text-green-700' :
                                  d.status === 'in-progress' ? 'bg-blue-50 text-blue-700' :
                                  'bg-gray-100 text-gray-500'
                                }`}>
                                  {d.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── DISCOVERY MODAL ───────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-8 py-5 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">New Project Discovery</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Step {currentStep + 1} of {totalSteps}: {step.title}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Progress Bar */}
              <div className="mt-4 w-full h-1.5 bg-gray-100 rounded-full">
                <div
                  className="h-1.5 rounded-full bg-[#00796B] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Success Screen */}
            {savedSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Project Created!</h3>
                <p className="text-sm text-gray-500 mt-1">Client context saved. Discovery sprint is ready.</p>
              </div>
            ) : (
              <>
                {/* Step Content */}
                <div className="flex-1 overflow-y-auto px-8 py-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>

                  <div className="space-y-5">
                    {step.fields.map(field => (
                      <div key={field.key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {field.label}
                          {field.required && <span className="text-red-400 ml-0.5">*</span>}
                        </label>

                        {field.type === 'text' && (
                          <input
                            type="text"
                            value={answers[field.key] || ''}
                            onChange={e => updateField(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B]/30 focus:border-[#00796B] placeholder:text-gray-400"
                          />
                        )}

                        {field.type === 'textarea' && (
                          <textarea
                            value={answers[field.key] || ''}
                            onChange={e => updateField(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            rows={3}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B]/30 focus:border-[#00796B] placeholder:text-gray-400 resize-none"
                          />
                        )}

                        {field.type === 'select' && field.options && (
                          <select
                            value={answers[field.key] || ''}
                            onChange={e => updateField(field.key, e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00796B]/30 focus:border-[#00796B]"
                          >
                            <option value="">Select...</option>
                            {field.options.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="px-8 py-4 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
                  <button
                    onClick={currentStep === 0 ? () => setShowModal(false) : handleBack}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {currentStep === 0 ? 'Cancel' : 'Back'}
                  </button>

                  <div className="flex items-center gap-2">
                    {/* Step dots */}
                    <div className="flex gap-1.5 mr-4">
                      {projectDiscoverySteps.map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            i === currentStep ? 'bg-[#00796B]' : i < currentStep ? 'bg-[#00796B]/40' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>

                    {currentStep < totalSteps - 1 ? (
                      <button
                        onClick={handleNext}
                        disabled={!canAdvance()}
                        className="px-5 py-2.5 bg-[#00796B] text-white text-sm font-medium rounded-lg hover:bg-[#004D40] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        className="px-5 py-2.5 bg-[#00796B] text-white text-sm font-medium rounded-lg hover:bg-[#004D40] transition-colors"
                      >
                        Create Project
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
