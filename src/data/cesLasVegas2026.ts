// Scenario data for CES Las Vegas 2026.
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

export const cesLasVegas2026Event: EventData = {
  id: "ces-las-vegas-2026",
  config: {
    eventName: "CES Las Vegas 2026",
    buildStart: "2026-01-05",
    currency: "USD",
    locale: "en-US",
    userDisplayName: "Ops Manager",
    userDepartment: "Operations",
    userInitials: "OM",
    rulesEngineName: "ExpoOS Rules Engine",
  },
  kpis: [
    { label: "Design Status", value: "Approved", icon: CheckCircle2, status: "success", badge: "✔️" },
    { label: "Compliance Score", value: "92%", icon: ShieldCheck, status: "success", trend: "+5%" },
    { label: "Cost Estimation", value: "In Progress", icon: DollarSign, status: "warning" },
    { label: "Staffing", value: "8/8", icon: Users, status: "success", sub: "Assigned", badge: "✔️" },
    { label: "Risk Level", value: "Low", icon: AlertTriangle, status: "success" },
  ],
  healthBars: [
    { label: "Compliance", value: 92, color: "bg-success" },
    { label: "Budget", value: 45, color: "bg-success" },
    { label: "Staffing", value: 100, color: "bg-primary" },
    { label: "Risk", value: 18, color: "bg-success" },
  ],
  aiInsights: [
    { text: "All compliance checkpoints cleared. No action required.", priority: "low" },
    { text: "AV equipment cost running 8% over initial estimate.", priority: "medium" },
    { text: "Full staffing achieved. Team confirmed for all 3 days.", priority: "low" },
    { text: "LED wall delivery confirmed 2 days ahead of schedule.", priority: "low" },
  ],
  standInfo: [
    { label: "Stand Name", value: "Hall A – Booth T-12" },
    { label: "Stand Type", value: "Corner" },
    { label: "Max Build Height", value: "3.0m" },
    { label: "Screen Area", value: "24m²" },
    { label: "Truss Present", value: "No" },
    { label: "Class A Materials", value: "Yes" },
  ],
  complianceTable: [
    { checkpoint: "Open sides", status: "pass", explanation: "Corner booth exceeds 75% open requirement" },
    { checkpoint: "Max height", status: "pass", explanation: "3.0m within 3.5m LVCC Hall A limit" },
    { checkpoint: "Screen lighting", status: "pass", explanation: "Lux levels within LVCC guidelines" },
    { checkpoint: "Fire safety", status: "pass", explanation: "NFPA compliant materials certified" },
    { checkpoint: "Power load", status: "warn", explanation: "AV draw at 94% of allocated circuit capacity" },
    { checkpoint: "Signage", status: "pass", explanation: "Within 2.5m² overhead limit" },
  ],
  detailedAnalysis: [
    {
      title: "Structural Compliance",
      content:
        "Corner booth configuration at 3.0m height is well within LVCC Hall A regulations. No rigging or special approval processes required. Standard assembly permits cover all planned construction activities.",
    },
    {
      title: "AV & Electrical Assessment",
      content:
        "Combined AV system power draw is projected at 94% of the allocated 32A circuit. Recommend coordinating with LVCC electrical services for a dedicated 40A circuit to provide safe headroom and prevent potential trip events during peak demo hours.",
    },
    {
      title: "Fire & Safety Review",
      content:
        "All display materials and flooring meet NFPA 701 flame resistance standards. Documentation verified and on file. Emergency egress paths maintain a minimum 2.0m clearance on both open sides.",
    },
  ],
  costBreakdown: [
    { item: "Construction & Furniture", amount: 28000 },
    { item: "AV & Technology", amount: 45000 },
    { item: "Labor", amount: 12000 },
    { item: "Logistics & Shipping", amount: 6500 },
  ],
  budgetUtilization: 45,
  offerDocuments: ["CES_Cost_Estimate_v2.pdf", "Client_Proposal_Draft.pdf"],
  deliverySchedule: [
    { item: "Display Screens (8 units)", date: "Jan 4", risk: false },
    { item: "Modular Booth Structure", date: "Jan 4", risk: false },
    { item: "AV Rack & Cabling", date: "Jan 5", risk: false },
    { item: "Branded Furnishings", date: "Jan 5", risk: true },
  ],
  candidates: [
    {
      name: "Sarah Mitchell",
      match: 98,
      details: ["Certified AV technician", "Speaks English", "Available all 3 days", "20 previous events"],
      top: true,
    },
    {
      name: "James Ortega",
      match: 85,
      details: ["Certified builder", "Speaks English/Spanish", "Available", "9 previous events"],
      top: false,
    },
    {
      name: "Priya Nair",
      match: 79,
      details: ["Certified builder", "Speaks English", "Available from Day 1", "6 previous events"],
      top: false,
    },
  ],
  matchBreakdown: [
    { label: "Certification match", status: true },
    { label: "Language match", status: true },
    { label: "Availability", status: true },
    { label: "Skill overlap", value: "97%" },
  ],
  shifts: [
    { day: "Mon", slots: ["Sarah M.", "James O.", "Priya N.", "—"] },
    { day: "Tue", slots: ["Sarah M.", "James O.", "Priya N.", "—"] },
    { day: "Wed", slots: ["Sarah M.", "James O.", "Priya N.", "—"] },
  ],
  shiftLabels: ["Morning", "Afternoon", "Evening", "Night"],
  inventory: [
    { name: "Display Screens (8 units)", status: "Confirmed", units: "8 units", icon: "📺" },
    { name: "Modular Booth Structure", status: "Reserved", units: "1 set", icon: "🏗️" },
    { name: "AV Rack & Cabling", status: "Reserved", units: "2 racks", icon: "🎛️" },
    { name: "Branded Furnishings", status: "In Transit", units: "12 pieces", icon: "🪑" },
  ],
  issues: [
    { issue: "AV power draw exceeded estimate", impact: "Low", evidence: "Circuit capacity was underestimated during planning." },
    { issue: "Furnishing delivery delay", impact: "Low", evidence: "Branded furniture arrived 4 hours late on Day 1." },
  ],
  lessons: [
    "Always allocate 120% of estimated AV power draw in booth planning.",
    "Order branded furnishings at least 3 weeks in advance.",
    "Pre-confirm all delivery windows with LVCC logistics 48h before.",
  ],
  actions: [
    { action: "Update AV power budget template", owner: "Tech Lead", priority: "High" },
    { action: "Establish furnishing vendor SLA", owner: "Procurement", priority: "Medium" },
  ],
  confidenceSections: [
    { label: "Executive Summary", confidence: 97 },
    { label: "Issues Analysis", confidence: 91 },
    { label: "Lessons Learned", confidence: 95 },
    { label: "Action Items", confidence: 98 },
  ],
  milestones: [
    { label: "Design Submitted", icon: PenTool, date: "Nov 15, 2025", auto: true, done: true },
    { label: "Compliance Approved", icon: ShieldCheck, date: "Nov 22, 2025", auto: true, done: true },
    { label: "Offer Sent", icon: Send, date: "Nov 28, 2025", auto: false, done: true },
    { label: "Staff Assigned", icon: Users, date: "Dec 5, 2025", auto: true, done: true },
    { label: "Materials Reserved", icon: Package, date: "Dec 10, 2025", auto: true, done: true },
    { label: "Build Completed", icon: Hammer, date: "Jan 6, 2026", auto: false, done: false },
    { label: "Evaluation Scheduled", icon: BarChart3, date: "Jan 10, 2026", auto: true, done: false },
  ],
  notifications: [
    { id: "ces-1", title: "AV power draw above threshold", body: "Combined AV draw at 94% of 32A circuit. Recommend requesting a dedicated 40A circuit from LVCC electrical services.", priority: "medium" as const, time: "3h ago" },
    { id: "ces-2", title: "Branded furnishing delivery at risk", body: "Vendor flagged a potential 1-day delay. Booth opens in 2 days — alternative local hire sourced as backup.", priority: "low" as const, time: "6h ago" },
    { id: "ces-3", title: "Build permit approved", body: "LVCC issued standard assembly permit for Booth T-12. All clear to proceed on build day.", priority: "low" as const, time: "1d ago" },
  ],
  executiveSummary: [
    { positive: true,  text: "Full staffing achieved — 8/8 positions confirmed ahead of schedule." },
    { positive: true,  text: "Compliance approved with zero amendments required." },
    { positive: false, text: "AV power draw exceeded estimate by 12% — dedicated circuit needed." },
    { positive: false, text: "Branded furnishings arrived 4 hours late on Day 1 of build." },
  ],
  narrativeSummary: `CES Las Vegas 2026 was the smoothest execution of the three events benchmarked this period. Booth T-12 in the Central Hall delivered on its brief — a compact, high-impact technology showcase that held its own against neighbouring tier-one exhibitors and drove qualified visitor engagement across all three public days.

The planning phase benefited directly from lessons applied after previous shows. The compliance submission went in early, was approved without amendment, and the team entered build week with full confidence in the design. All eight staffing positions were confirmed well ahead of the deadline — a notable improvement on the previous year's last-minute scramble.

Two minor issues surfaced during the event itself. The AV power draw ran 12% above the estimated circuit load, a consequence of underestimating the combined draw of the interactive product demos. No outage occurred, but the incident was close enough to uncomfortable that a dedicated 40A circuit has now been added to the standard planning template. The branded furnishings also arrived four hours behind schedule on Day 1, though they were in place before the official opening and the client was unaware.

The client expressed strong satisfaction with both the design quality and the on-site team's responsiveness. This event should be used as the planning baseline for future CES cycles.`,
};
