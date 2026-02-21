// Domain types for ExpoOS Event Suite
// All page data is typed against these interfaces — change the scenario data,
// not these types, when adapting for a new client.

// --- Event Config & Bundle ---

export interface EventConfig {
  eventName: string;
  buildStart: string; // ISO date string e.g. "2026-03-08"
  currency: string;
  locale: string;
  userDisplayName: string;
  userDepartment: string;
  userInitials: string;
  rulesEngineName: string;
}

export interface EventData {
  id: string;
  config: EventConfig;
  kpis: KPI[];
  healthBars: HealthBar[];
  aiInsights: Insight[];
  standInfo: StandSpec[];
  complianceTable: ComplianceRow[];
  detailedAnalysis: AnalysisSection[];
  costBreakdown: CostItem[];
  budgetUtilization: number;
  offerDocuments: string[];
  deliverySchedule: DeliveryItem[];
  staffAlert: StaffAlert;
  supplierAlert: SupplierAlert;
  candidates: Candidate[];
  matchBreakdown: MatchCriterion[];
  shifts: Shift[];
  shiftLabels: string[];
  inventory: InventoryItem[];
  issues: Issue[];
  lessons: string[];
  actions: ActionItem[];
  confidenceSections: ConfidenceSection[];
  executiveSummary: SummaryPoint[];
  narrativeSummary: string;
  milestones: Milestone[];
  notifications: Notification[];
}

export type StatusLevel = "success" | "warning" | "info";
export type Priority = "high" | "medium" | "low";

// --- Dashboard ---

export interface KPI {
  label: string;
  value: string;
  icon: React.ElementType;
  status: StatusLevel;
  trend?: string;
  sub?: string;
  badge?: string;
}

export interface HealthBar {
  label: string;
  value: number;
  color: string;
}

export interface Insight {
  text: string;
  priority: Priority;
}

// --- Design & Validation ---

export interface StandSpec {
  label: string;
  value: string;
}

export interface ComplianceRow {
  checkpoint: string;
  status: "pass" | "warn";
  explanation: string;
}

export interface AnalysisSection {
  title: string;
  content: string;
}

// --- Cost & Offers ---

export interface CostItem {
  item: string;
  amount: number;
}

export interface DeliveryItem {
  item: string;
  date: string;
  risk: boolean;
}

// --- Staff & Supplier Alerts ---

export interface StaffAlert {
  workerName: string;
  workerInitials: string;
  senderSubtitle: string; // shown under the name in the WA header
  role: string;           // e.g. "Senior Builder"
  message: string;
  time: string;           // e.g. "06:43"
}

export interface SupplierAlert {
  supplierName: string;
  supplierInitials: string;
  senderSubtitle: string;
  message: string;
  time: string;
  impactLabel: string;    // e.g. "2 deliveries delayed"
  impactDetail: string;   // detail line shown under the label
  draftedReply: string;
  sentConfirmation: string;
}

// --- Resource Planning ---

export interface Candidate {
  name: string;
  match: number;
  details: string[];
  top: boolean;
}

export interface MatchCriterion {
  label: string;
  status?: boolean;
  value?: string;
}

export interface Shift {
  day: string;
  slots: string[];
}

// --- Materials Management ---

export interface InventoryItem {
  name: string;
  status: string;
  units: string;
  icon: string;
}

// --- Evaluation & Insights ---

export interface Issue {
  issue: string;
  impact: string;
  evidence: string;
}

export interface ActionItem {
  action: string;
  owner: string;
  priority: string;
}

export interface ConfidenceSection {
  label: string;
  confidence: number;
}

// --- Evaluation ---

export interface SummaryPoint {
  positive: boolean;
  text: string;
}

// --- Notifications ---

export interface Notification {
  id: string;
  title: string;
  body: string;
  priority: Priority;
  time: string;
}

// --- Event History ---

export interface Milestone {
  label: string;
  icon: React.ElementType;
  date: string;
  auto: boolean;
  done: boolean;
}
