import {
  Package,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Truck,
  RefreshCw,
  Send,
  MessageSquare,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useEvent } from "@/context/EventContext";

type SupplierAlertState = "idle" | "drafting" | "drafted" | "sent";

export default function MaterialsManagement() {
  const { event } = useEvent();
  const { inventory, deliverySchedule, supplierAlert } = event;
  const [alertState, setAlertState] = useState<SupplierAlertState>("idle");

  // Reset on event change
  useEffect(() => { setAlertState("idle"); }, [event.id]);

  // Auto-advance drafting → drafted
  useEffect(() => {
    if (alertState !== "drafting") return;
    const t = setTimeout(() => setAlertState("drafted"), 2500);
    return () => clearTimeout(t);
  }, [alertState]);

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Materials Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Inventory tracking and logistics coordination</p>
      </div>

      {/* ── Supplier alert panel ──────────────────────────────────── */}
      <div className="glass-card-elevated overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <span className="text-sm font-semibold text-foreground">Supplier Alert</span>
          </div>
          <div className="badge-ai"><Zap className="w-2.5 h-2.5" /> AI Reply Draft</div>
        </div>

        {/* Active: show two-col layout */}
        {alertState !== "sent" && (
          <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* WhatsApp incoming message from supplier */}
              <div className="rounded-xl overflow-hidden border border-border/40">
                <div className="flex items-center gap-2.5 px-3 py-2.5" style={{ backgroundColor: "#075e54" }}>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {supplierAlert.supplierInitials}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white leading-tight">{supplierAlert.supplierName}</p>
                    <p className="text-[10px] leading-tight" style={{ color: "rgba(255,255,255,0.65)" }}>{supplierAlert.senderSubtitle}</p>
                  </div>
                </div>
                {/* Incoming message bubble */}
                <div className="p-3 space-y-2" style={{ backgroundColor: "#0b141a" }}>
                  <div className="flex justify-start">
                    <div className="max-w-[90%] px-3 py-2 rounded-lg rounded-tl-none" style={{ backgroundColor: "#202c33" }}>
                      <p className="text-xs leading-relaxed" style={{ color: "#e9edef" }}>
                        {supplierAlert.message}
                      </p>
                      <p className="text-[10px] mt-1" style={{ color: "#8696a0" }}>{supplierAlert.time}</p>
                    </div>
                  </div>
                  {/* AI-drafted outgoing reply */}
                  {alertState === "drafted" && (
                    <div className="flex justify-end animate-slide-up">
                      <div className="max-w-[90%] px-3 py-2 rounded-lg rounded-tr-none" style={{ backgroundColor: "#005c4b" }}>
                        <p className="text-xs leading-relaxed" style={{ color: "#e9edef" }}>
                          {supplierAlert.draftedReply}
                        </p>
                        <p className="text-[10px] mt-1 text-right" style={{ color: "#8696a0" }}>Just now ✓</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* System response panel */}
              <div className="flex flex-col justify-center gap-3">
                <div className="flex items-start gap-2 p-3 rounded-lg border border-destructive/30 bg-destructive/5">
                  <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{supplierAlert.impactLabel}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{supplierAlert.impactDetail}</p>
                  </div>
                </div>

                {alertState === "idle" && (
                  <button
                    onClick={() => setAlertState("drafting")}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg gradient-primary text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    <MessageSquare className="w-4 h-4" /> Draft reply
                  </button>
                )}

                {alertState === "drafting" && (
                  <div className="flex items-start gap-2 p-3 rounded-lg border border-primary/20 bg-primary/5 animate-slide-up">
                    <RefreshCw className="w-4 h-4 text-primary shrink-0 mt-0.5 animate-spin" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">Drafting supplier reply…</p>
                      <p className="text-[11px] text-muted-foreground">Checking build schedule impact and deadlines</p>
                    </div>
                  </div>
                )}

                {alertState === "drafted" && (
                  <div className="flex flex-col gap-2 animate-slide-up">
                    <p className="text-[11px] text-muted-foreground">AI draft ready — review and send</p>
                    <button
                      onClick={() => setAlertState("sent")}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg gradient-primary text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      <Send className="w-4 h-4" /> Send reply
                    </button>
                    <button
                      onClick={() => setAlertState("idle")}
                      className="text-xs text-center text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Sent confirmation */}
        {alertState === "sent" && (
          <div className="p-5 animate-slide-up">
            <div className="flex items-center justify-between p-3 rounded-lg border border-success/30 bg-success/5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Reply sent to {supplierAlert.supplierName}</p>
                  <p className="text-xs text-muted-foreground">{supplierAlert.sentConfirmation}</p>
                </div>
              </div>
              <button
                onClick={() => setAlertState("idle")}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors shrink-0 ml-4"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
      {/* ── End supplier alert panel ──────────────────────────────── */}

      {/* AI suggestion */}
      <div className="flex items-start gap-3 p-4 rounded-lg border border-primary/20 bg-primary/5">
        <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground">AI Recommendation</p>
          <p className="text-sm text-muted-foreground mt-0.5">Consider earlier delivery due to height complexity. 5.5m truss assembly requires extended setup time.</p>
        </div>
        <div className="ml-auto badge-ai shrink-0">
          <Zap className="w-2.5 h-2.5" /> Insight
        </div>
      </div>

      {/* Inventory */}
      <div className="glass-card-elevated p-6">
        <div className="flex items-center gap-2 mb-5">
          <Package className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Inventory</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {inventory.map((item) => (
            <div key={item.name} className="p-4 rounded-lg bg-muted/20 border border-border/50 flex items-center gap-4 hover:bg-muted/30 transition-colors">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.units}</p>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-success/10 border border-success/20 text-xs font-medium text-success shrink-0">
                <CheckCircle2 className="w-3 h-3" />
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery schedule */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Truck className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Delivery Schedule</h2>
        </div>
        <div className="space-y-3">
          {deliverySchedule.map((d) => (
            <div key={d.item} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50">
              <span className="text-sm text-foreground">{d.item}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{d.date}</span>
                {d.risk ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
