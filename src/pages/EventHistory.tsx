import { CheckCircle2, Zap, CircleDot } from "lucide-react";
import { useState, useEffect } from "react";
import { useEvent } from "@/context/EventContext";

export default function EventHistory() {
  const { event } = useEvent();
  const { milestones, config } = event;
  const [extraDone, setExtraDone] = useState<Set<number>>(new Set());

  // Reset when event changes
  useEffect(() => { setExtraDone(new Set()); }, [event.id]);

  const isEffectiveDone = (i: number) => milestones[i].done || extraDone.has(i);

  // Index of the next milestone available to mark complete
  const nextToComplete = milestones.findIndex((_, i) => !isEffectiveDone(i));

  const markComplete = (i: number) => {
    setExtraDone((prev) => new Set([...prev, i]));
  };

  const doneCount = milestones.filter((_, i) => isEffectiveDone(i)).length;
  const allDone = doneCount === milestones.length;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Event History</h1>
          <p className="text-sm text-muted-foreground mt-1">Complete event lifecycle timeline for {config.eventName}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground font-medium">{doneCount}/{milestones.length} complete</span>
          {allDone && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 border border-success/20 text-xs font-semibold text-success">
              <CheckCircle2 className="w-3.5 h-3.5" /> Event lifecycle complete
            </span>
          )}
        </div>
      </div>

      <div className="glass-card-elevated p-6">
        <div className="relative">
          {milestones.map((m, i) => {
            const done = isEffectiveDone(i);
            const isNext = i === nextToComplete;
            const userMarked = !m.done && extraDone.has(i);

            return (
              <div key={m.label} className="flex gap-4 pb-8 last:pb-0 relative">
                {/* Connector line */}
                {i < milestones.length - 1 && (
                  <div className={`absolute left-[19px] top-10 w-0.5 h-[calc(100%-24px)] transition-colors duration-500 ${
                    done ? "bg-primary/30" : "bg-border"
                  }`} />
                )}

                {/* Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-500 ${
                  done
                    ? "gradient-primary glow-primary"
                    : isNext
                    ? "bg-muted border-2 border-primary/50 ring-4 ring-primary/10"
                    : "bg-muted border border-border"
                }`}>
                  {done ? (
                    <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                  ) : isNext ? (
                    <CircleDot className="w-4 h-4 text-primary" />
                  ) : (
                    <m.icon className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`text-sm font-semibold transition-colors duration-300 ${done ? "text-foreground" : isNext ? "text-foreground" : "text-muted-foreground"}`}>
                      {m.label}
                    </p>
                    {m.auto && (
                      <span className="badge-ai text-[9px]">
                        <Zap className="w-2 h-2" /> Automated
                      </span>
                    )}
                    {userMarked && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 border border-success/20 text-[10px] font-semibold text-success">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Marked by you
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {userMarked ? `${m.date} — completed now` : m.date}
                  </p>

                  {/* Mark Complete button — only on next available milestone */}
                  {isNext && (
                    <button
                      onClick={() => markComplete(i)}
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-primary text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
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
