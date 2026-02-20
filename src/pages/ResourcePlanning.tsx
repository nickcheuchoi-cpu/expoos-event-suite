import {
  AlertTriangle,
  CheckCircle2,
  Users,
  Zap,
  Star,
  Globe,
  Calendar,
  Award,
} from "lucide-react";
import { useEvent } from "@/context/EventContext";

export default function ResourcePlanning() {
  const { event } = useEvent();
  const { candidates, matchBreakdown, shifts, shiftLabels } = event;

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Resource Planning</h1>
        <p className="text-sm text-muted-foreground mt-1">Workforce management and intelligent replacement</p>
      </div>

      {/* Alert */}
      <div className="flex items-center gap-3 p-4 rounded-lg border border-warning/30 bg-warning/5">
        <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
        <div>
          <p className="text-sm font-semibold text-foreground">Original Senior Builder called in sick.</p>
          <p className="text-xs text-muted-foreground mt-0.5">AI-matched replacement candidates available below.</p>
        </div>
        <div className="ml-auto badge-ai shrink-0">
          <Zap className="w-2.5 h-2.5" /> Auto-matched
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidates */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">AI-Matched Candidates</h2>
          {candidates.map((c, i) => (
            <div
              key={c.name}
              className={`glass-card p-5 ${c.top ? "glow-primary border-primary/20" : ""}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    c.top ? "gradient-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}>
                    #{i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{c.name}</p>
                    {c.top && <span className="text-[10px] text-primary font-semibold uppercase tracking-wider">Recommended</span>}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xl font-bold ${c.match >= 90 ? "text-gradient-primary" : "text-foreground"}`}>
                    {c.match}%
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Match</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {c.details.map((d) => (
                  <span key={d} className="px-2.5 py-1 rounded-full bg-muted/50 border border-border/50 text-xs text-muted-foreground flex items-center gap-1">
                    {d.includes("Certified") && <Award className="w-3 h-3" />}
                    {d.includes("Speaks") && <Globe className="w-3 h-3" />}
                    {d.includes("Available") && <Calendar className="w-3 h-3" />}
                    {d.includes("previous") && <Star className="w-3 h-3" />}
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Match breakdown */}
        <div className="space-y-4">
          <div className="glass-card-elevated p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Deterministic Breakdown</h3>
            <div className="space-y-3">
              {matchBreakdown.map((m) => (
                <div key={m.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{m.label}</span>
                  {m.value ? (
                    <span className="text-sm font-semibold text-foreground">{m.value}</span>
                  ) : (
                    <CheckCircle2 className={`w-4 h-4 ${m.status ? "text-success" : "text-destructive"}`} />
                  )}
                </div>
              ))}
            </div>
            <button className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg gradient-primary text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
              <Users className="w-4 h-4" />
              Assign Replacement
            </button>
          </div>

          <div className="badge-engine w-fit">
            <Zap className="w-2.5 h-2.5" /> AI Insight Layer Active
          </div>
        </div>
      </div>

      {/* Shift schedule */}
      <div className="glass-card-elevated overflow-hidden">
        <div className="p-5 border-b border-border flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Staffing Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Shift</th>
                {shifts.map((s) => (
                  <th key={s.day} className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{s.day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shiftLabels.map((label, si) => (
                <tr key={label} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-5 text-sm font-medium text-foreground">{label}</td>
                  {shifts.map((s) => (
                    <td key={s.day} className="py-3 px-5">
                      <span className={`text-sm ${s.slots[si] === "—" ? "text-muted-foreground" : "text-foreground"}`}>
                        {s.slots[si]}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
