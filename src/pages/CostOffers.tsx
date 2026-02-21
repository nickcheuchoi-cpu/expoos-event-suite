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
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
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
  const total = costBreakdown.reduce((sum, c) => sum + c.amount, 0);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [generatingOffer, setGeneratingOffer] = useState(false);

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

  // Reset toasts when event changes
  useEffect(() => { setToasts([]); }, [event.id]);

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
            {costBreakdown.map((item) => (
              <div key={item.item} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/50">
                <span className="text-sm font-medium text-foreground">{item.item}</span>
                <span className="text-sm font-semibold text-foreground">
                  €{item.amount.toLocaleString(config.locale)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-base font-bold text-foreground">Total Estimated</span>
            <span className="text-2xl font-bold text-gradient-primary">
              €{total.toLocaleString(config.locale)}
            </span>
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
