import {
  CheckCircle2,
  AlertTriangle,
  Shield,
  Zap,
  ChevronDown,
  ChevronUp,
  Ruler,
  Flame,
  Eye,
  Flag,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useEvent } from "@/context/EventContext";

type UserAction = "approved" | "flagged";

export default function DesignValidation() {
  const { event } = useEvent();
  const { standInfo, complianceTable, detailedAnalysis, config } = event;
  const [expanded, setExpanded] = useState(false);
  const [userActions, setUserActions] = useState<Record<number, UserAction>>({});

  // Reset user review state when event changes
  useEffect(() => { setUserActions({}); }, [event.id]);

  const passCount = complianceTable.filter((c) => c.status === "pass").length;
  const warnCount = complianceTable.filter((c) => c.status === "warn").length;
  const reviewedCount = Object.keys(userActions).length;

  const toggle = (i: number, action: UserAction) => {
    setUserActions((prev) => {
      if (prev[i] === action) {
        const next = { ...prev };
        delete next[i];
        return next;
      }
      return { ...prev, [i]: action };
    });
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Design & Validation</h1>
          <p className="text-sm text-muted-foreground mt-1">Stand specifications and compliance verification</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-engine"><Zap className="w-2.5 h-2.5" /> {config.rulesEngineName}</span>
        </div>
      </div>

      {/* Stand Specifications */}
      <div className="glass-card-elevated p-6">
        <div className="flex items-center gap-2 mb-5">
          <Ruler className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Stand Specifications</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {standInfo.map((item) => (
            <div key={item.label} className="p-3 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">{item.label}</p>
              <p className="text-sm font-semibold text-foreground mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Summary */}
      <div className="flex gap-3">
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10">
            <CheckCircle2 className="w-4 h-4 text-success" />
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">{passCount}</p>
            <p className="text-xs text-muted-foreground">AI Passed</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-warning/10">
            <AlertTriangle className="w-4 h-4 text-warning" />
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">{warnCount}</p>
            <p className="text-xs text-muted-foreground">AI Warnings</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">{reviewedCount}<span className="text-sm font-normal text-muted-foreground">/{complianceTable.length}</span></p>
            <p className="text-xs text-muted-foreground">Reviewed by you</p>
          </div>
        </div>
      </div>

      {/* Compliance Table */}
      <div className="glass-card-elevated overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Compliance Checkpoints</h2>
          </div>
          <p className="text-xs text-muted-foreground">Click Approve or Flag to log your review decision</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Checkpoint</th>
                <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI Status</th>
                <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Explanation</th>
                <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your Review</th>
              </tr>
            </thead>
            <tbody>
              {complianceTable.map((row, i) => {
                const action = userActions[i];
                return (
                  <tr
                    key={i}
                    className={`border-b border-border/50 transition-colors ${
                      action === "approved" ? "bg-success/5" :
                      action === "flagged" ? "bg-destructive/5" :
                      "hover:bg-muted/20"
                    }`}
                  >
                    <td className="py-3.5 px-5 text-sm font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        {row.checkpoint === "Fire safety" ? <Flame className="w-3.5 h-3.5 text-muted-foreground shrink-0" /> :
                         row.checkpoint === "Open sides" ? <Eye className="w-3.5 h-3.5 text-muted-foreground shrink-0" /> :
                         row.checkpoint === "Banners" ? <Flag className="w-3.5 h-3.5 text-muted-foreground shrink-0" /> :
                         <Shield className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
                        {row.checkpoint}
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      {row.status === "pass" ? (
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium status-success">
                          <CheckCircle2 className="w-4 h-4" /> Passed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium status-warning">
                          <AlertTriangle className="w-4 h-4" /> Warning
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-sm text-muted-foreground">{row.explanation}</td>
                    <td className="py-3.5 px-5">
                      {action ? (
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                            action === "approved"
                              ? "bg-success/10 text-success border-success/20"
                              : "bg-destructive/10 text-destructive border-destructive/20"
                          }`}>
                            {action === "approved" ? <ThumbsUp className="w-3 h-3" /> : <ThumbsDown className="w-3 h-3" />}
                            {action === "approved" ? "Approved" : "Flagged"}
                          </span>
                          <button
                            onClick={() => toggle(i, action)}
                            className="text-[10px] text-muted-foreground hover:text-foreground underline underline-offset-2"
                          >
                            Undo
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggle(i, "approved")}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-success/30 text-success hover:bg-success/10 transition-colors"
                          >
                            <ThumbsUp className="w-3 h-3" /> Approve
                          </button>
                          <button
                            onClick={() => toggle(i, "flagged")}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
                          >
                            <ThumbsDown className="w-3 h-3" /> Flag
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="glass-card-elevated overflow-hidden">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full p-5 flex items-center justify-between hover:bg-muted/20 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Detailed Compliance Analysis</h2>
          </div>
          {expanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
        </button>
        {expanded && (
          <div className="px-5 pb-5 space-y-4 animate-slide-up">
            {detailedAnalysis.map((section, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/20 border border-border/50">
                <h3 className="text-sm font-semibold text-foreground mb-2">{section.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            ))}
            <div className="pt-2">
              <span className="badge-engine text-[9px]">
                <Zap className="w-2.5 h-2.5" /> Validated via {config.rulesEngineName}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
