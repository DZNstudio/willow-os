export type ProjectPhase = 'Discovery' | 'Design' | 'Build' | 'Review' | 'Launch';
export type ProjectStatus = 'active' | 'completed' | 'paused';
export type ClientType = 'SME' | 'Brand' | 'Web' | 'E-Commerce' | 'Hospitality';
export type ClientStage = 'lead' | 'proposal' | 'active' | 'completed';
export type TrendStatus = 'implement' | 'watch';
export type TeamMemberName = 'Dominika' | 'Kelly' | 'Cynthia';

export interface Deliverable {
  id: string;
  name: string;
  owner: TeamMemberName;
  deadline: string;
  status: 'pending' | 'in-progress' | 'complete';
}

export interface Milestone {
  id: string;
  name: string;
  date: string;
  completed: boolean;
}

export interface Sprint {
  id: string;
  name: string;
  number: number;
  startDate: string;
  endDate: string;
  deliverables: Deliverable[];
  milestone?: Milestone;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  phase: ProjectPhase;
  sprints: Sprint[];
  status: ProjectStatus;
  description: string;
}

export interface TeamMember {
  name: TeamMemberName;
  role: string;
  tools: string[];
  skills: string[];
  color: string;
  initials: string;
  delegationAreas: string[];
}

export interface Client {
  id: string;
  name: string;
  type: ClientType;
  stage: ClientStage;
  projects: string[];
  entryPoint: string;
  upsell: string;
  value: string;
}

export interface Tool {
  rank: number;
  name: string;
  bestFor: string;
  preferred?: boolean;
}

export interface VibeCodingRule {
  title: string;
  description: string;
  tips: string[];
}

export interface ToolCategory {
  name: string;
  icon: string;
  tools: Tool[];
}

export interface Trend {
  id: string;
  name: string;
  description: string;
  disciplines: string[];
  tools: string[];
  example: string;
  status: TrendStatus;
  week: string;
}

export interface Campaign {
  id: string;
  name: string;
  objective: string;
  audience: string;
  channels: string[];
  timeline: string;
  creativeDirection: string;
  delegation: { member: TeamMemberName; tasks: string[] }[];
  metrics: string[];
  status: 'draft' | 'active' | 'completed';
}

export interface ProjectDiscoveryAnswers {
  clientName: string;
  clientWebsite: string;
  clientType: ClientType;
  projectType: string;
  projectDescription: string;
  objectives: string;
  targetAudience: string;
  competitors: string;
  budget: string;
  timeline: string;
  brandAssets: string;
  techRequirements: string;
  existingPresence: string;
  successMetrics: string;
  additionalNotes: string;
}

export interface ClientContext {
  id: string;
  clientName: string;
  clientWebsite: string;
  clientType: ClientType;
  createdAt: string;
  projects: ProjectDiscoveryAnswers[];
}

export interface QuickAction {
  label: string;
  icon: string;
  href: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  subject: string;
  time: string;
  actor: TeamMemberName;
}
