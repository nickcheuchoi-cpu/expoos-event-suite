import {
  DollarSign,
  CheckCircle2,
  Send,
  FileText,
  Zap,
  TrendingDown,
  RefreshCw,
  Download,
  Eye,
  X,
  Pencil,
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useEvent } from "@/context/EventContext";

interface Toast {
  id: number;
  message: string;
  type: "info" | "success";
}

let toastCounter = 0;

export default function CostOffers() {
  const { event } = useEvent();
  const { costBreakdown, budgetUtilization, offerDocuments, config } = event;
  const [amountOverrides, setAmountOverrides] = useState<Record<string, number>>({});
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [generatingOffer, setGeneratingOffer] = useState(false);

  const getAmount = (item: string, base: number) => amountOverrides[item] ?? base;
  const total = costBreakdown.reduce((sum, c) => sum + getAmount(c.item, c.amount), 0);
  const baseTotal = costBreakdown.reduce((sum, c) => sum + c.amount, 0);

  const addToast = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = ++toastCounter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const removeToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const handleDownload = (doc: string) => {
    addToast(`Preparing "${doc}" for download…`);
  };

  const handlePreview = (doc: string) => {
    addToast(`Opening "${doc}" in document viewer…`);
  };

  const handleGenerateOffer = async () => {
    setGeneratingOffer(true);
    await new Promise((r) => setTimeout(r, 1800));
    setGeneratingOffer(false);
    addToast("Revised offer generated and sent to client.", "success");
  };

  // Reset overrides and toasts when event changes
  useEffect(() => { setToasts([]); setAmountOverrides({}); setEditingItem(null); }, [event.id]);

  // Focus edit input when it opens
  useEffect(() => { if (editingItem && editInputRef.current) editInputRef.current.focus(); }, [editingItem]);

  const startEdit = (item: string, current: number) => {
    setEditingItem(item);
    setEditingValue(String(current));
  };

  const commitEdit = (item: string) => {
    const parsed = parseFloat(editingValue);
    if (!isNaN(parsed) && parsed >= 0) {
      setAmountOverrides((prev) => ({ ...prev, [item]: Math.round(parsed) }));
    }
    setEditingItem(null);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Cost & Offers</h1>
        <p className="text-sm text-muted-foreground mt-1">Budget estimation and client offer management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cost breakdown */}
        <div className="lg:col-span-2 glass-card-elevated p-6">
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Cost Breakdown</h2>
          </div>

          <div className="space-y-3">
            {costBreakdown.map((item) => {
              const amount = getAmount(item.item, item.amount);
              const isEditing = editingItem === item.item;
              const isModified = amountOverrides[item.item] !== undefined;
              return (
                <div key={item.item} className={`flex items-center justify-between p-4 rounded-lg border transition-colors group ${isModified ? "bg-primary/5 border-primary/20" : "bg-muted/20 border-border/50"}`}>
                  <span className="text-sm font-medium text-foreground">{item.item}</span>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <input
                        ref={editInputRef}
                        type="number"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        onBlur={() => commitEdit(item.item)}
                        onKeyDown={(e) => { if (e.key === "Enter") commitEdit(item.item); if (e.key === "Escape") setEditingItem(null); }}
                        className="text-sm font-semibold text-foreground bg-background border border-primary/40 rounded-md px-2 py-0.5 outline-none focus:border-primary w-28 text-right"
                      />
                    ) : (
                      <>
                        <span className={`text-sm font-semibold ${isModified ? "text-primary" : "text-foreground"}`}>
                          €{amount.toLocaleString(config.locale)}
                          {isModified && <span className="text-[10px] text-muted-foreground ml-1">(edited)</span>}
                        </span>
                        <button
                          onClick={() => startEdit(item.item, amount)}
                          className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted text-muted-foreground hover:text-foreground"
                          title="Edit amount"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-base font-bold text-foreground">Total Estimated</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-gradient-primary">
                €{total.toLocaleString(config.locale)}
              </span>
              {total !== baseTotal && (
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Original: €{baseTotal.toLocaleString(config.locale)}
                </p>
              )}
            </div>
          </div>

          {/* Budget bar */}
          <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Budget Utilization</span>
              <span className="text-sm font-semibold text-foreground">{budgetUtilization}%</span>
            </div>
            <div className="progress-track">
              <div className="h-full rounded-full bg-success transition-all duration-1000" style={{ width: `${budgetUtilization}%` }} />
            </div>
          </div>
        </div>

        {/* Status panel */}
        <div className="space-y-4">
          <div className="glass-card-elevated p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Offer Status</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-foreground">Offer Generated</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Send className="w-4 h-4 text-primary" />
                <span className="text-foreground">Sent to Client</span>
                <span className="text-xs text-muted-foreground ml-auto">3 days ago</span>
              </div>
            </div>

            <button
              onClick={handleGenerateOffer}
              disabled={generatingOffer}
              className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg gradient-primary text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 ${generatingOffer ? "animate-spin" : ""}`} />
              {generatingOffer ? "Generating…" : "Generate Revised Offer"}
            </button>
          </div>

          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="w-4 h-4 text-success" />
              <h3 className="text-sm font-semibold text-foreground">Budget Risk</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-success/10 text-xs font-semibold text-success border border-success/20">
                Low
              </span>
              <span className="text-xs text-muted-foreground">Within acceptable range</span>
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Documents</h3>
            </div>
            <div className="space-y-2">
              {offerDocuments.map((doc) => (
                <div
                  key={doc}
                  className="flex items-center gap-2 p-2 rounded-lg bg-muted/20 border border-border/50 hover:bg-muted/40 transition-colors group"
                >
                  <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="text-xs text-foreground flex-1 truncate">{doc}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handlePreview(doc)}
                      title="Preview"
                      className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDownload(doc)}
                      title="Download"
                      className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toast stack */}
      {toasts.length > 0 && createPortal(
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-xl text-sm font-medium animate-slide-up max-w-xs ${
                t.type === "success"
                  ? "bg-success/10 border-success/30 text-success"
                  : "bg-popover border-border text-popover-foreground"
              }`}
            >
              {t.type === "success"
                ? <CheckCircle2 className="w-4 h-4 shrink-0" />
                : <FileText className="w-4 h-4 text-primary shrink-0" />
              }
              <span className="flex-1">{t.message}</span>
              <button
                onClick={() => removeToast(t.id)}
                className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}
