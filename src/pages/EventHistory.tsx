import { CheckCircle2, Zap } from "lucide-react";
import { milestones } from "@/data/euroShop2026";
import { clientConfig } from "@/config/client";

export default function EventHistory() {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Event History</h1>
        <p className="text-sm text-muted-foreground mt-1">Complete event lifecycle timeline for {clientConfig.eventName}</p>
      </div>

      <div className="glass-card-elevated p-6">
        <div className="relative">
          {milestones.map((m, i) => (
            <div key={m.label} className="flex gap-4 pb-8 last:pb-0 relative">
              {/* Line */}
              {i < milestones.length - 1 && (
                <div className={`absolute left-[19px] top-10 w-0.5 h-[calc(100%-24px)] ${m.done ? "bg-primary/30" : "bg-border"}`} />
              )}
              {/* Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${
                m.done ? "gradient-primary glow-primary" : "bg-muted border border-border"
              }`}>
                {m.done ? (
                  <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <m.icon className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              {/* Content */}
              <div className="flex-1 pt-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className={`text-sm font-semibold ${m.done ? "text-foreground" : "text-muted-foreground"}`}>{m.label}</p>
                  {m.auto && (
                    <span className="badge-ai text-[9px]">
                      <Zap className="w-2 h-2" /> Automated
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{m.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connection indicators */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Module Connections</h3>
        <div className="flex flex-wrap gap-3">
          {[
            "Compliance → Risk Level",
            "Risk Level → Staffing",
            "Staffing → Risk Reduction",
            "Evaluation → Event History",
          ].map((c) => (
            <span key={c} className="px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-xs text-muted-foreground">
              {c}
            </span>
          ))}
        </div>
        <div className="mt-3">
          <span className="badge-engine text-[9px]">
            <Zap className="w-2.5 h-2.5" /> Powered by Internal Rule Engine
          </span>
        </div>
      </div>
    </div>
  );
}
