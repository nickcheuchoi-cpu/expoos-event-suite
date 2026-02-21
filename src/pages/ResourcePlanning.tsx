import {
  CheckCircle2,
  Users,
  Zap,
  Star,
  Globe,
  Calendar,
  Award,
  X,
  Play,
  RefreshCw,
  AlertTriangle,
  UserX,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useEvent } from "@/context/EventContext";

type SimState = "idle" | "incident" | "matching" | "matched";

export default function ResourcePlanning() {
  const { event, assignedCandidateName, setAssignedCandidate } = useEvent();
  const { candidates, matchBreakdown, shifts, shiftLabels } = event;
  const [confirming, setConfirming] = useState<string | null>(null);
  const [simState, setSimState] = useState<SimState>("idle");
  const [scanCount, setScanCount] = useState(0);

  // Reset when event changes
  useEffect(() => { setSimState("idle"); setScanCount(0); }, [event.id]);

  // Auto-advance the simulation
  useEffect(() => {
    if (simState === "incident") {
      const t = setTimeout(() => setSimState("matching"), 2200);
      return () => clearTimeout(t);
    }
    if (simState === "matching") {
      setScanCount(0);
      let count = 0;
      const iv = setInterval(() => {
        count += Math.floor(Math.random() * 12) + 4;
        if (count >= 247) { count = 247; clearInterval(iv); }
        setScanCount(count);
      }, 55);
      const t = setTimeout(() => {
        clearInterval(iv);
        setScanCount(247);
        setSimState("matched");
      }, 3000);
      return () => { clearTimeout(t); clearInterval(iv); };
    }
  }, [simState]);

  const handleConfirm = () => {
    if (confirming) { setAssignedCandidate(confirming); setConfirming(null); }
  };

  const isActive = simState !== "idle";
  const showMessage = simState === "incident" || simState === "matching";

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Resource Planning</h1>
        <p className="text-sm text-muted-foreground mt-1">Workforce management and intelligent replacement</p>
      </div>

      {/* ── Simulation zone ────────────────────────────────────────── */}
      <div className="glass-card-elevated overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Live Simulation</span>
          </div>
          <div className="badge-ai"><Zap className="w-2.5 h-2.5" /> AI Response Layer</div>
        </div>

        {/* Idle */}
        {simState === "idle" && (
          <div className="flex flex-col items-center justify-center py-10 px-6 gap-4 text-center">
            <div className="p-3 rounded-full bg-muted">
              <UserX className="w-7 h-7 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Builder calls in sick — 48 hours before build</p>
              <p className="text-xs text-muted-foreground mt-1">Run the simulation to see how the system responds in real time.</p>
            </div>
            <button
              onClick={() => setSimState("incident")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-primary text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Play className="w-4 h-4" /> Start simulation
            </button>
          </div>
        )}

        {/* Incident → Matching: two-col layout */}
        {showMessage && (
          <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* WhatsApp message */}
              <div className="rounded-xl overflow-hidden border border-border/40 animate-slide-up">
                {/* WA header bar */}
                <div className="flex items-center gap-2.5 px-3 py-2.5" style={{ backgroundColor: "#075e54" }}>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    MJ
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white leading-tight">Mark Jansen</p>
                    <p className="text-[10px] leading-tight" style={{ color: "rgba(255,255,255,0.65)" }}>last seen today at 06:42</p>
                  </div>
                </div>
                {/* WA chat body */}
                <div className="p-3 flex justify-end" style={{ backgroundColor: "#0b141a" }}>
                  <div className="max-w-[90%] px-3 py-2 rounded-lg rounded-tr-none" style={{ backgroundColor: "#005c4b" }}>
                    <p className="text-xs leading-relaxed" style={{ color: "#e9edef" }}>
                      Hey guys, really sorry. Woke up sick this morning, fever won't go down. Can't make it to the build tomorrow. 🤒
                    </p>
                    <p className="text-[10px] mt-1 text-right" style={{ color: "#8696a0" }}>06:43 ✓✓</p>
                  </div>
                </div>
              </div>

              {/* System response */}
              <div className="flex flex-col justify-center gap-3">
                <div
                  className="flex items-start gap-2 p-3 rounded-lg border border-destructive/30 bg-destructive/5 animate-slide-up"
                  style={{ animationDelay: "350ms" }}
                >
                  <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">Staffing gap detected</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Senior Builder — role now unfilled for build start</p>
                  </div>
                </div>

                {simState === "matching" && (
                  <div className="flex items-start gap-2 p-3 rounded-lg border border-primary/20 bg-primary/5 animate-slide-up">
                    <RefreshCw className="w-4 h-4 text-primary shrink-0 mt-0.5 animate-spin" />
                    <div className="w-full">
                      <p className="text-xs font-semibold text-foreground">Scanning your builder network…</p>
                      <p className="text-[11px] text-muted-foreground">{scanCount} / 247 profiles checked</p>
                      <div className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-100"
                          style={{ width: `${(scanCount / 247) * 100}%` }}
                        />
                      </div>
                      <div className="mt-2 space-y-1.5">
                        {[
                          { label: "Certification", threshold: 60 },
                          { label: "Language match", threshold: 130 },
                          { label: "Availability", threshold: 200 },
                        ].map(({ label, threshold }) => (
                          <div key={label} className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${scanCount > threshold ? "bg-success" : "bg-muted-foreground/30"}`} />
                            <span className="text-[10px] text-muted-foreground">{label}</span>
                            {scanCount > threshold && (
                              <span className="text-[10px] text-success ml-auto">verified</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Matched */}
        {simState === "matched" && (
          <div className="p-5 animate-slide-up">
            <div className="flex items-center justify-between p-3 rounded-lg border border-success/30 bg-success/5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">3 replacement candidates found in 2.1 seconds</p>
                  <p className="text-xs text-muted-foreground">Ranked by match score — assign a replacement below</p>
                </div>
              </div>
              <button
                onClick={() => { setSimState("idle"); setScanCount(0); }}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors shrink-0 ml-4"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
      {/* ── End simulation zone ────────────────────────────────────── */}

      {/* Resolved banner (shown when candidate already assigned) */}
      {assignedCandidateName && (
        <div className="flex items-center gap-3 p-4 rounded-lg border border-success/30 bg-success/5">
          <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">Replacement assigned: {assignedCandidateName}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Staffing gap resolved. Dashboard updated.</p>
          </div>
          <div className="ml-auto badge-ai shrink-0">
            <Zap className="w-2.5 h-2.5" /> Confirmed
          </div>
        </div>
      )}

      {/* Candidates + match breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            {isActive ? "AI-Matched Candidates" : "Available Builders"}
          </h2>
          {candidates.map((c, i) => {
            const isAssigned = assignedCandidateName === c.name;
            const otherAssigned = assignedCandidateName !== null && !isAssigned;
            return (
              <div
                key={c.name}
                className={`glass-card p-5 transition-all duration-300 ${
                  isAssigned      ? "border-success/40 bg-success/5" :
                  otherAssigned   ? "opacity-50" :
                  c.top           ? "glow-primary border-primary/20" : ""
                } ${simState === "matched" ? "animate-slide-up" : ""}`}
                style={simState === "matched" ? { animationDelay: `${i * 130}ms` } : {}}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      isAssigned ? "bg-success/20 text-success" :
                      c.top      ? "gradient-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}>
                      {isAssigned ? <CheckCircle2 className="w-5 h-5" /> : `#${i + 1}`}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{c.name}</p>
                      {isAssigned ? (
                        <span className="text-[10px] text-success font-semibold uppercase tracking-wider">Assigned</span>
                      ) : c.top ? (
                        <span className="text-[10px] text-primary font-semibold uppercase tracking-wider">Recommended</span>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={`text-xl font-bold ${c.match >= 90 ? "text-gradient-primary" : "text-foreground"}`}>
                        {c.match}%
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Match</p>
                    </div>
                    {isAssigned ? (
                      <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-success/10 text-success border border-success/20">
                        Assigned ✓
                      </span>
                    ) : !otherAssigned ? (
                      <button
                        onClick={() => setConfirming(c.name)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
                      >
                        Assign
                      </button>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {c.details.map((d) => (
                    <span key={d} className="px-2.5 py-1 rounded-full bg-muted/50 border border-border/50 text-xs text-muted-foreground flex items-center gap-1">
                      {d.includes("Certified") && <Award className="w-3 h-3" />}
                      {d.includes("Speaks")    && <Globe className="w-3 h-3" />}
                      {d.includes("Available") && <Calendar className="w-3 h-3" />}
                      {d.includes("previous")  && <Star className="w-3 h-3" />}
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
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
            {assignedCandidateName ? (
              <div className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-success/10 border border-success/20 text-sm font-semibold text-success">
                <CheckCircle2 className="w-4 h-4" />
                {assignedCandidateName} assigned
              </div>
            ) : (
              <button
                onClick={() => candidates[0] && setConfirming(candidates[0].name)}
                className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg gradient-primary text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Users className="w-4 h-4" />
                Assign Top Match
              </button>
            )}
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

      {/* Confirmation modal */}
      {confirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
          <div className="w-full max-w-sm mx-4 rounded-xl border border-border bg-popover shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-popover-foreground">Confirm Assignment</span>
              </div>
              <button onClick={() => setConfirming(null)} className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-5 py-5">
              <p className="text-sm text-foreground leading-relaxed">
                Assign <span className="font-semibold">{confirming}</span> as the replacement for the Senior Builder role?
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                This will update the staffing count on the dashboard and mark the position as filled.
              </p>
            </div>
            <div className="flex gap-2 px-5 pb-5">
              <button
                onClick={() => setConfirming(null)}
                className="flex-1 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 rounded-lg gradient-primary text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
