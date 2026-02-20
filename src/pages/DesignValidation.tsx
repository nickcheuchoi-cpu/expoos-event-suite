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
} from "lucide-react";
import { useState } from "react";
import { standInfo, complianceTable, detailedAnalysis } from "@/data/euroShop2026";
import { clientConfig } from "@/config/client";

export default function DesignValidation() {
  const [expanded, setExpanded] = useState(false);

  const passCount = complianceTable.filter((c) => c.status === "pass").length;
  const warnCount = complianceTable.filter((c) => c.status === "warn").length;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Design & Validation</h1>
          <p className="text-sm text-muted-foreground mt-1">Stand specifications and compliance verification</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-engine"><Zap className="w-2.5 h-2.5" /> {clientConfig.rulesEngineName}</span>
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
            <p className="text-xs text-muted-foreground">Passed</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-warning/10">
            <AlertTriangle className="w-4 h-4 text-warning" />
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">{warnCount}</p>
            <p className="text-xs text-muted-foreground">Warnings</p>
          </div>
        </div>
      </div>

      {/* Compliance Table */}
      <div className="glass-card-elevated overflow-hidden">
        <div className="p-5 border-b border-border flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Compliance Checkpoints</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Checkpoint</th>
                <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Explanation</th>
              </tr>
            </thead>
            <tbody>
              {complianceTable.map((row, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-3.5 px-5 text-sm font-medium text-foreground flex items-center gap-2">
                    {row.checkpoint === "Fire safety" ? <Flame className="w-3.5 h-3.5 text-muted-foreground" /> :
                     row.checkpoint === "Open sides" ? <Eye className="w-3.5 h-3.5 text-muted-foreground" /> :
                     row.checkpoint === "Banners" ? <Flag className="w-3.5 h-3.5 text-muted-foreground" /> :
                     <Shield className="w-3.5 h-3.5 text-muted-foreground" />}
                    {row.checkpoint}
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
                </tr>
              ))}
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
                <Zap className="w-2.5 h-2.5" /> Validated via {clientConfig.rulesEngineName}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
