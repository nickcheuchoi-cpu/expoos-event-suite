// Scenario data for Hannover Messe 2026.
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
import type { EventData } from "./types";

export const hannoverMesse2026Event: EventData = {
  id: "hannover-messe-2026",
  config: {
    eventName: "Hannover Messe 2026",
    currency: "EUR",
    locale: "de-DE",
    userDisplayName: "Ops Manager",
    userDepartment: "Operations",
    userInitials: "OM",
    rulesEngineName: "Europort Demo Rules Engine",
  },
  kpis: [
    { label: "Design Status", value: "Pending", icon: CheckCircle2, status: "warning" },
    { label: "Compliance Score", value: "71%", icon: ShieldCheck, status: "warning", trend: "-4%" },
    { label: "Cost Estimation", value: "Completed", icon: DollarSign, status: "success", badge: "✔️" },
    { label: "Staffing", value: "12/16", icon: Users, status: "warning", sub: "Assigned" },
    { label: "Risk Level", value: "High", icon: AlertTriangle, status: "warning" },
  ],
  healthBars: [
    { label: "Compliance", value: 71, color: "bg-warning" },
    { label: "Budget", value: 88, color: "bg-warning" },
    { label: "Staffing", value: 75, color: "bg-warning" },
    { label: "Risk", value: 82, color: "bg-warning" },
  ],
  aiInsights: [
    { text: "3 compliance warnings unresolved — venue deadline in 5 days.", priority: "high" },
    { text: "4 staff positions unfilled, including 2 heavy assembly specialists.", priority: "high" },
    { text: "Budget at 88% utilization — contingency buffer nearly exhausted.", priority: "high" },
    { text: "Design approval pending venue review. Build date at risk.", priority: "medium" },
  ],
  standInfo: [
    { label: "Stand Name", value: "Hall 6 – Booth M-89" },
    { label: "Stand Type", value: "Linear" },
    { label: "Max Build Height", value: "4.0m" },
    { label: "Banner Area", value: "6m²" },
    { label: "Truss Present", value: "No" },
    { label: "B1 Certified Materials", value: "Pending" },
  ],
  complianceTable: [
    { checkpoint: "Open sides", status: "warn", explanation: "Linear booth at boundary — side clearance borderline" },
    { checkpoint: "Max height", status: "pass", explanation: "4.0m within Hall 6 limit of 4.5m" },
    { checkpoint: "Closed walls", status: "warn", explanation: "Rear wall exceeds 2.5m without neighbour consent" },
    { checkpoint: "Fire safety", status: "warn", explanation: "B1 certificate pending from supplier" },
    { checkpoint: "Rigging", status: "pass", explanation: "No rigging — within regulations" },
    { checkpoint: "Banners", status: "pass", explanation: "6m² within allowed limit" },
  ],
  detailedAnalysis: [
    {
      title: "Design Review Status",
      content:
        "Stand design submitted to Deutsche Messe venue office on March 1. Awaiting sign-off on rear wall height exemption and neighbour consent documentation. Until approved, build permit cannot be issued.",
    },
    {
      title: "B1 Fire Certificate Gap",
      content:
        "Primary wall panel supplier has not yet provided updated B1 certification. Existing certificate expired February 2025. Alternative certified supplier identified — switch decision required by March 8 to maintain build timeline.",
    },
    {
      title: "Staffing Risk Assessment",
      content:
        "4 of 16 required positions remain unfilled, including 2 heavy assembly specialists required for 4m wall system installation. Current sourcing pipeline has 3 candidates under review. Recommend escalation to secondary staffing agency.",
    },
  ],
  costBreakdown: [
    { item: "Construction Materials", amount: 41000 },
    { item: "Labor", amount: 24500 },
    { item: "Electrical & AV", amount: 9000 },
    { item: "Logistics", amount: 11200 },
  ],
  budgetUtilization: 88,
  offerDocuments: ["HM_Cost_Estimation_v1.pdf", "HM_Client_Offer_Draft.pdf"],
  deliverySchedule: [
    { item: "Wall Panel System", date: "Mar 19", risk: true },
    { item: "Electrical Fittings", date: "Mar 18", risk: false },
    { item: "Branded Graphics", date: "Mar 20", risk: true },
    { item: "Flooring", date: "Mar 19", risk: true },
  ],
  candidates: [
    {
      name: "Klaus Meier",
      match: 88,
      details: ["Heavy assembly certified", "Speaks German", "Available from Day 1", "15 previous events"],
      top: true,
    },
    {
      name: "Fatima Yilmaz",
      match: 74,
      details: ["Certified builder", "Speaks German/Turkish", "Available from Day 2", "8 previous events"],
      top: false,
    },
    {
      name: "Rolf Brandt",
      match: 69,
      details: ["Certified builder", "Speaks German", "Available", "4 previous events"],
      top: false,
    },
  ],
  matchBreakdown: [
    { label: "Certification match", status: true },
    { label: "Language match", status: true },
    { label: "Availability", status: false },
    { label: "Skill overlap", value: "74%" },
  ],
  shifts: [
    { day: "Mon", slots: ["Klaus M.", "Fatima Y.", "—", "—"] },
    { day: "Tue", slots: ["Klaus M.", "Fatima Y.", "Rolf B.", "—"] },
    { day: "Wed", slots: ["Klaus M.", "—", "Rolf B.", "—"] },
    { day: "Thu", slots: ["Klaus M.", "Fatima Y.", "Rolf B.", "—"] },
    { day: "Fri", slots: ["Klaus M.", "Fatima Y.", "—", "—"] },
  ],
  shiftLabels: ["Morning", "Afternoon", "Evening", "Night"],
  inventory: [
    { name: "Wall Panel System", status: "Ordered", units: "42 panels", icon: "🧱" },
    { name: "Electrical Fittings", status: "Reserved", units: "1 set", icon: "⚡" },
    { name: "Branded Graphics", status: "In Production", units: "8 prints", icon: "🖼️" },
    { name: "Flooring", status: "Ordered", units: "85m²", icon: "🟫" },
  ],
  issues: [
    { issue: "B1 certificate not renewed", impact: "High", evidence: "Supplier certificate expired Feb 2025." },
    { issue: "Rear wall height non-compliance", impact: "Medium", evidence: "Neighbour consent outstanding." },
  ],
  lessons: [
    "Verify all material certifications 90 days before event, not 30.",
    "Obtain neighbour consent signatures as part of initial stand registration.",
    "Maintain a pre-qualified backup staffing pool for large-format builds.",
  ],
  actions: [
    { action: "Switch to certified panel supplier", owner: "Procurement", priority: "High" },
    { action: "Chase neighbour consent form", owner: "Ops Lead", priority: "High" },
    { action: "Engage backup staffing agency", owner: "HR", priority: "High" },
  ],
  confidenceSections: [
    { label: "Executive Summary", confidence: 82 },
    { label: "Issues Analysis", confidence: 78 },
    { label: "Lessons Learned", confidence: 85 },
    { label: "Action Items", confidence: 90 },
  ],
  milestones: [
    { label: "Design Submitted", icon: PenTool, date: "Mar 1, 2026", auto: true, done: true },
    { label: "Compliance Approved", icon: ShieldCheck, date: "Mar 8, 2026", auto: true, done: false },
    { label: "Offer Sent", icon: Send, date: "Feb 20, 2026", auto: false, done: true },
    { label: "Staff Assigned", icon: Users, date: "Mar 10, 2026", auto: true, done: false },
    { label: "Materials Reserved", icon: Package, date: "Mar 5, 2026", auto: true, done: false },
    { label: "Build Completed", icon: Hammer, date: "Mar 22, 2026", auto: false, done: false },
    { label: "Evaluation Scheduled", icon: BarChart3, date: "Mar 27, 2026", auto: true, done: false },
  ],
  notifications: [
    { id: "hm-1", title: "B1 certificate missing — action required", body: "Primary supplier certificate expired Feb 2025. Build permit will be denied without valid documentation. Switch to backup supplier by Mar 8.", priority: "high" as const, time: "30m ago" },
    { id: "hm-2", title: "4 staff positions still unfilled", body: "2 heavy assembly specialists and 2 general crew remain unassigned. Build starts in 4 weeks. Escalate to secondary agency immediately.", priority: "high" as const, time: "2h ago" },
    { id: "hm-3", title: "Design approval pending — build date at risk", body: "Deutsche Messe venue office has not issued sign-off. Rear wall height exemption and neighbour consent both outstanding.", priority: "high" as const, time: "4h ago" },
    { id: "hm-4", title: "Neighbour consent form outstanding", body: "Booth M-88 occupant has not returned signed consent for the 4m rear wall. Deadline is March 10.", priority: "medium" as const, time: "1d ago" },
    { id: "hm-5", title: "Budget contingency nearly exhausted", body: "Utilization at 88%. Only €10,300 of contingency remaining. Any supplier switch or delay will breach budget.", priority: "high" as const, time: "1d ago" },
  ],
  executiveSummary: [
    { positive: false, text: "B1 fire certificate outstanding — build permit cannot be issued until resolved." },
    { positive: false, text: "4 staff positions unfilled with 4 weeks remaining before build start." },
    { positive: false, text: "Budget contingency at 88% — any supplier switch will breach ceiling." },
    { positive: true,  text: "Initial stand design submitted on time and accepted by Deutsche Messe." },
  ],
  narrativeSummary: `Hannover Messe 2026 is the most operationally complex event currently in planning, and as of today it carries the highest risk profile in the portfolio. The stand — a 120m² island build in Hall 9 — requires B1-certified fire-retardant panels, neighbour consent from an adjacent occupant, and a full venue-issued build permit before assembly can begin. None of these are yet in hand.

The most urgent issue is the material certification gap. The primary supplier's B1 certificate lapsed in February 2025, making their panels ineligible under Deutsche Messe's fire safety rules. A switch to a certified backup supplier is in motion, but it introduces cost pressure at a moment when the budget contingency has already reached 88%. There is very little room for further variance.

On the staffing side, four positions remain unfilled — including two specialist heavy-assembly roles that are difficult to source at short notice. The team is engaging a secondary agency, but the clock is running. Build start is four weeks away, and any further delay in hiring will require a replanning of the assembly sequence.

What makes this event particularly challenging is the compound nature of the risks. Each open item individually is solvable; together, they create a scenario where any single delay could trigger a cascade. Close daily monitoring and rapid escalation of the certification and staffing threads are the highest priority actions between now and March 8.`,
};
