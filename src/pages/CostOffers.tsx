import {
  DollarSign,
  CheckCircle2,
  Send,
  FileText,
  Zap,
  TrendingDown,
  RefreshCw,
} from "lucide-react";
import { useEvent } from "@/context/EventContext";

export default function CostOffers() {
  const { event } = useEvent();
  const { costBreakdown, budgetUtilization, offerDocuments, config } = event;
  const total = costBreakdown.reduce((sum, c) => sum + c.amount, 0);

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

            <button className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg gradient-primary text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
              <RefreshCw className="w-4 h-4" />
              Generate Revised Offer
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
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Documents</h3>
            </div>
            <div className="space-y-2">
              {offerDocuments.map((doc) => (
                <div key={doc} className="flex items-center gap-2 p-2 rounded-lg bg-muted/20 border border-border/50 text-xs text-foreground hover:bg-muted/40 transition-colors cursor-pointer">
                  <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                  {doc}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
