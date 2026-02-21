// Scenario data for EuroShop 2026.
// Swap this file (or replace the exports below) to re-skin the demo for a new client.
// All types are defined in ./types.ts

import {
  CheckCircle2,
  ShieldCheck,
  DollarSign,
  Users,
  AlertTriangle,
  PenTool,
  Send,
  Package,
  Hammer,
  BarChart3,
} from "lucide-react";

import type {
  KPI,
  HealthBar,
  Insight,
  StandSpec,
  ComplianceRow,
  AnalysisSection,
  CostItem,
  DeliveryItem,
  Candidate,
  MatchCriterion,
  Shift,
  InventoryItem,
  Issue,
  ActionItem,
  ConfidenceSection,
  Milestone,
  EventData,
} from "./types";

// --- Dashboard ---

export const kpis: KPI[] = [
  { label: "Design Status", value: "Approved", icon: CheckCircle2, status: "success", badge: "✔️" },
  { label: "Compliance Score", value: "87%", icon: ShieldCheck, status: "info", trend: "+3%" },
  { label: "Cost Estimation", value: "Completed", icon: DollarSign, status: "success", badge: "✔️" },
  { label: "Staffing", value: "14/15", icon: Users, status: "warning", sub: "Assigned" },
  { label: "Risk Level", value: "Medium", icon: AlertTriangle, status: "warning" },
];

export const healthBars: HealthBar[] = [
  { label: "Compliance", value: 87, color: "bg-info" },
  { label: "Budget", value: 72, color: "bg-success" },
  { label: "Staffing", value: 93, color: "bg-primary" },
  { label: "Risk", value: 55, color: "bg-warning" },
];

export const aiInsights: Insight[] = [
  { text: "2 compliance warnings require attention.", priority: "high" },
  { text: "Senior certified builder required due to 5.5m truss.", priority: "high" },
  { text: "Post-event evaluation scheduled automatically.", priority: "low" },
  { text: "Staffing risk reduced after recent assignment.", priority: "medium" },
];

// --- Design & Validation ---

export const standInfo: StandSpec[] = [
  { label: "Stand Name", value: "Hall 3 – Booth B24" },
  { label: "Stand Type", value: "Island" },
  { label: "Max Build Height", value: "5.5m" },
  { label: "Banner Area", value: "10m²" },
  { label: "Truss Present", value: "Yes" },
  { label: "B1 Certified Materials", value: "Yes" },
];

export const complianceTable: ComplianceRow[] = [
  { checkpoint: "Open sides", status: "pass", explanation: "All sides >75% open" },
  { checkpoint: "Max height", status: "warn", explanation: "5.5m requires stability report" },
  { checkpoint: "Closed walls", status: "pass", explanation: "Within setback rules" },
  { checkpoint: "Fire safety", status: "pass", explanation: "B1 certificate provided" },
  { checkpoint: "Rigging", status: "warn", explanation: "Truss >4m requires approval" },
  { checkpoint: "Banners", status: "pass", explanation: "Within 12m² limit" },
];

export const detailedAnalysis: AnalysisSection[] = [
  {
    title: "Structural Integrity Assessment",
    content:
      "The proposed stand structure at 5.5m height requires a certified stability report per venue regulation §4.2.1. Load calculations must account for truss system TX-500 at maximum span configuration. Lateral wind loads within acceptable parameters for indoor exhibition halls.",
  },
  {
    title: "Fire Safety Compliance",
    content:
      "All materials specified in the construction plan hold valid B1 fire resistance certification. Documentation verified against supplier certificates dated within the last 24 months. Emergency exit pathways maintain minimum 2.5m clearance on all accessible sides.",
  },
  {
    title: "Rigging & Suspension Analysis",
    content:
      "Truss configuration exceeds 4m threshold, triggering mandatory venue approval process. Estimated approval timeline: 5-7 business days. Recommended action: submit documentation immediately to avoid build schedule impact.",
  },
];

// --- Cost & Offers ---

export const costBreakdown: CostItem[] = [
  { item: "Construction Materials", amount: 32000 },
  { item: "Labor", amount: 18500 },
  { item: "Rigging", amount: 6000 },
  { item: "Logistics", amount: 8400 },
];

export const budgetUtilization = 72;

export const offerDocuments = ["Cost_Estimation_v3.pdf", "Client_Offer_Final.pdf"];

export const deliverySchedule: DeliveryItem[] = [
  { item: "Truss System TX-500", date: "Feb 14", risk: false },
  { item: "LED Wall Panels", date: "Feb 14", risk: true },
  { item: "Modular Wall Panels", date: "Feb 13", risk: false },
  { item: "Flooring", date: "Feb 14", risk: true },
];

// --- Resource Planning ---

export const candidates: Candidate[] = [
  {
    name: "Mark Jansen",
    match: 96,
    details: ["Certified senior builder", "Speaks German", "Available", "12 previous events"],
    top: true,
  },
  {
    name: "Lisa Vermeer",
    match: 82,
    details: ["Certified builder", "Speaks Dutch/English", "Available", "7 previous events"],
    top: false,
  },
  {
    name: "Tom Bakker",
    match: 78,
    details: ["Certified builder", "Speaks Dutch", "Available from Day 2", "5 previous events"],
    top: false,
  },
];

export const matchBreakdown: MatchCriterion[] = [
  { label: "Certification match", status: true },
  { label: "Language match", status: true },
  { label: "Availability", status: true },
  { label: "Skill overlap", value: "91%" },
];

export const shifts: Shift[] = [
  { day: "Mon", slots: ["Mark J.", "Lisa V.", "—", "Tom B."] },
  { day: "Tue", slots: ["Mark J.", "Lisa V.", "Anna K.", "Tom B."] },
  { day: "Wed", slots: ["Mark J.", "Lisa V.", "Anna K.", "—"] },
  { day: "Thu", slots: ["Mark J.", "—", "Anna K.", "Tom B."] },
  { day: "Fri", slots: ["Mark J.", "Lisa V.", "Anna K.", "Tom B."] },
];

export const shiftLabels = ["Morning", "Afternoon", "Evening", "Night"];

// --- Materials Management ---

export const inventory: InventoryItem[] = [
  { name: "Truss System TX-500", status: "Reserved", units: "1 set", icon: "🏗️" },
  { name: "LED Wall Panels", status: "Reserved", units: "12 units", icon: "📺" },
  { name: "Modular Wall Panels", status: "Reserved", units: "28 units", icon: "🧱" },
  { name: "Flooring", status: "Reserved", units: "120m²", icon: "🟫" },
];

// --- Evaluation & Insights ---

export const issues: Issue[] = [
  { issue: "Rigging approval delay", impact: "Medium", evidence: "Approval arrived late." },
];

export const lessons: string[] = [
  "Submit truss documentation earlier.",
  "Maintain backup certified staff.",
];

export const actions: ActionItem[] = [
  { action: "Pre-submit rigging docs", owner: "Ops Lead", priority: "High" },
];

export const confidenceSections: ConfidenceSection[] = [
  { label: "Executive Summary", confidence: 94 },
  { label: "Issues Analysis", confidence: 88 },
  { label: "Lessons Learned", confidence: 91 },
  { label: "Action Items", confidence: 96 },
];

// --- Event History ---

export const milestones: Milestone[] = [
  { label: "Design Submitted", icon: PenTool, date: "Jan 8, 2026", auto: true, done: true },
  { label: "Compliance Approved", icon: ShieldCheck, date: "Jan 15, 2026", auto: true, done: true },
  { label: "Offer Sent", icon: Send, date: "Jan 18, 2026", auto: false, done: true },
  { label: "Staff Assigned", icon: Users, date: "Jan 22, 2026", auto: true, done: true },
  { label: "Materials Reserved", icon: Package, date: "Feb 1, 2026", auto: true, done: true },
  { label: "Build Completed", icon: Hammer, date: "Feb 16, 2026", auto: false, done: false },
  { label: "Evaluation Scheduled", icon: BarChart3, date: "Feb 18, 2026", auto: true, done: false },
];

// --- Executive Summary ---

export const executiveSummary = [
  { positive: true,  text: "Client satisfaction score 4.7/5.0 — exceeded 4.5 KPI target." },
  { positive: true,  text: "Staff replacement resolved within SLA with zero build impact." },
  { positive: false, text: "Rigging approval required manual escalation causing a 3-day delay." },
  { positive: false, text: "LED Wall delivery rerouted at last minute due to transport backlog." },
];

// --- Notifications ---

export const notifications = [
  { id: "es-1", title: "Rigging approval overdue", body: "Truss approval submitted 3 days ago. No response received from venue. Escalation recommended.", priority: "high" as const, time: "2h ago" },
  { id: "es-2", title: "Staffing gap: 1 position unfilled", body: "Evening shift on Monday still has no cover. 2 candidates available for immediate assignment.", priority: "medium" as const, time: "5h ago" },
  { id: "es-3", title: "Compliance warning: truss height", body: "5.5m truss requires a certified stability report. Document not yet submitted to venue.", priority: "high" as const, time: "1d ago" },
  { id: "es-4", title: "Delivery risk: LED Wall Panels", body: "Supplier flagged a possible 1-day delay on LED Wall Panel delivery due to transport backlog.", priority: "medium" as const, time: "1d ago" },
];

// --- Bundled EventData export ---

export const euroShop2026Event: EventData = {
  id: "euroshop-2026",
  config: {
    eventName: "EuroShop 2026",
    buildStart: "2026-02-16",
    currency: "EUR",
    locale: "de-DE",
    userDisplayName: "Ops Manager",
    userDepartment: "Operations",
    userInitials: "OM",
    rulesEngineName: "Europort Demo Rules Engine",
  },
  kpis,
  healthBars,
  aiInsights,
  standInfo,
  complianceTable,
  detailedAnalysis,
  costBreakdown,
  budgetUtilization,
  offerDocuments,
  deliverySchedule,
  candidates,
  matchBreakdown,
  shifts,
  shiftLabels,
  inventory,
  issues,
  lessons,
  actions,
  confidenceSections,
  executiveSummary,
  narrativeSummary: `EuroShop 2026 marked another successful large-format deployment, though not without its share of last-minute pressure. The stand — a 72m² double-deck configuration in Hall 10 — drew consistent visitor traffic across all four days, with client satisfaction scores landing at 4.7 out of 5.0, comfortably ahead of the 4.5 KPI target.

Behind the scenes, the week leading up to build day carried significant tension. The truss rigging approval arrived three days late, requiring direct escalation to the venue's technical team. In parallel, the original senior builder called in sick 48 hours before build start — a scenario the AI matching system handled autonomously, surfacing a 94% match replacement candidate within minutes. The transition was seamless enough that the client never noticed.

The one area that fell short of expectation was the LED wall delivery. A last-minute transport rerouting by the supplier added three hours to the build timeline, compressing the installation window and requiring the crew to work an extended shift. The materials team has since flagged this supplier for risk review, and a backup logistics partner has been identified for future events.

Overall, EuroShop 2026 reinforced the value of real-time operational monitoring. The issues encountered were real, but none were catastrophic — because the system caught them early enough to act.`,
  milestones,
  notifications,
};
