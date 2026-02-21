import {
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Zap,
  FileText,
  TrendingUp,
  Target,
  XCircle,
} from "lucide-react";
import { useEvent } from "@/context/EventContext";

const priorityStyle: Record<string, string> = {
  High:   "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Low:    "bg-success/10 text-success border-success/20",
};

export default function EvaluationInsights() {
  const { event } = useEvent();
  const { issues, lessons, actions, confidenceSections, executiveSummary } = event;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Evaluation & Insights</h1>
          <p className="text-sm text-muted-foreground mt-1">Post-event analysis and continuous improvement</p>
        </div>
        <div className="badge-ai">
          <Zap className="w-2.5 h-2.5" /> AI Confidence Layer
        </div>
      </div>

      {/* Status */}
      <div className="glass-card p-5 flex items-center gap-3">
        <Clock className="w-5 h-5 text-primary" />
        <div>
          <p className="text-sm font-semibold text-foreground">Post-Event Evaluation Status</p>
          <p className="text-xs text-muted-foreground">Scheduled automatically for 2 days after event.</p>
        </div>
        <span className="ml-auto badge-engine"><Zap className="w-2.5 h-2.5" /> Auto-scheduled</span>
      </div>

      {/* AI Confidence per section */}
      <div className="glass-card-elevated p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">AI Confidence by Section</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {confidenceSections.map((s) => (
            <div key={s.label} className="p-3 rounded-lg bg-muted/20 border border-border/50 text-center">
              <p className={`text-2xl font-bold ${s.confidence >= 90 ? "text-success" : s.confidence >= 80 ? "text-foreground" : "text-warning"}`}>
                {s.confidence}%
              </p>
              <div className="mt-2 progress-track h-1">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${s.confidence >= 90 ? "bg-success" : s.confidence >= 80 ? "bg-primary" : "bg-warning"}`}
                  style={{ width: `${s.confidence}%` }}
                />
              </div>
              <p className="text-[11px] text-muted-foreground mt-2 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Executive Summary — event-driven */}
      <div className="glass-card-elevated p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Executive Summary</h2>
        </div>
        <div className="space-y-2">
          {executiveSummary.map((item, i) => (
            <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${item.positive ? "border-success/20 bg-success/5" : "border-destructive/20 bg-destructive/5"}`}>
              {item.positive
                ? <TrendingUp className="w-4 h-4 text-success shrink-0 mt-0.5" />
                : <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />}
              <span className="text-sm text-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Issues table */}
      <div className="glass-card-elevated overflow-hidden">
        <div className="p-5 border-b border-border flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          <h2 className="text-lg font-semibold text-foreground">Issues</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Issue</th>
              <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Impact</th>
              <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Evidence</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((row, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3.5 px-5 text-sm text-foreground">{row.issue}</td>
                <td className="py-3.5 px-5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${priorityStyle[row.impact] ?? priorityStyle["Medium"]}`}>{row.impact}</span>
                </td>
                <td className="py-3.5 px-5 text-sm text-muted-foreground italic">"{row.evidence}"</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lessons */}
        <div className="glass-card-elevated p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Lessons Learned</h2>
          </div>
          <ul className="space-y-2">
            {lessons.map((l, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0 mt-0.5">{i + 1}</span>
                {l}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="glass-card-elevated p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Action Items</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
                <th className="text-left py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Owner</th>
                <th className="text-left py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Priority</th>
              </tr>
            </thead>
            <tbody>
              {actions.map((a, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="py-2.5 text-sm text-foreground">{a.action}</td>
                  <td className="py-2.5 text-sm text-muted-foreground">{a.owner}</td>
                  <td className="py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${priorityStyle[a.priority] ?? priorityStyle["Medium"]}`}>
                      {a.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confidence footer */}
      <div className="flex items-center gap-2">
        <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="badge-engine text-[9px]">
          <Zap className="w-2.5 h-2.5" /> Powered by Internal Rule Engine
        </span>
      </div>
    </div>
  );
}
