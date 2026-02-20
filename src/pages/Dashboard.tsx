import {
  Zap,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { useEvent } from "@/context/EventContext";

const statusColors = {
  success: "status-success",
  warning: "status-warning",
  info: "status-info",
} as const;

const statusBg = {
  success: "bg-success/10",
  warning: "bg-warning/10",
  info: "bg-info/10",
} as const;

export default function Dashboard() {
  const { event } = useEvent();
  const { kpis, healthBars, aiInsights, config } = event;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Event Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">{config.eventName} — Real-time operational status</p>
        </div>
        <div className="badge-engine">
          <Zap className="w-2.5 h-2.5" /> Live Monitoring
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, i) => (
          <div
            key={kpi.label}
            className="glass-card p-4 animate-fade-in-delayed"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${statusBg[kpi.status]}`}>
                <kpi.icon className={`w-4 h-4 ${statusColors[kpi.status]}`} />
              </div>
              {kpi.trend && (
                <span className="flex items-center gap-0.5 text-xs font-medium status-success">
                  <TrendingUp className="w-3 h-3" /> {kpi.trend}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{kpi.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-bold text-foreground">{kpi.value}</span>
              {kpi.sub && <span className="text-xs text-muted-foreground">{kpi.sub}</span>}
              {kpi.badge && <span className="text-sm">{kpi.badge}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event Health Overview */}
        <div className="lg:col-span-2 glass-card-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Event Health Overview</h2>
            <div className="badge-ai">
              <Zap className="w-2.5 h-2.5" /> Auto-tracked
            </div>
          </div>
          <div className="space-y-5">
            {healthBars.map((bar) => (
              <div key={bar.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{bar.label}</span>
                  <span className="text-sm font-semibold text-foreground">{bar.value}%</span>
                </div>
                <div className="progress-track">
                  <div
                    className={`h-full rounded-full ${bar.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Connection indicators */}
          <div className="mt-6 pt-4 border-t border-border flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowUpRight className="w-3 h-3 text-primary" />
              <span>Compliance → Risk Level linked</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowUpRight className="w-3 h-3 text-success" />
              <span>Staffing → Risk reduced</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowUpRight className="w-3 h-3 text-warning" />
              <span>Evaluation → History feed</span>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="glass-card-elevated p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-foreground">AI Insights</h2>
            <div className="badge-ai">
              <Zap className="w-2.5 h-2.5" /> Insight Layer
            </div>
          </div>
          <div className="space-y-3">
            {aiInsights.map((insight, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border transition-all duration-200 hover:border-primary/30 ${
                  insight.priority === "high"
                    ? "border-warning/20 bg-warning/5"
                    : insight.priority === "medium"
                    ? "border-info/20 bg-info/5"
                    : "border-border bg-muted/30"
                }`}
              >
                <div className="flex gap-2">
                  <Zap
                    className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                      insight.priority === "high"
                        ? "text-warning"
                        : insight.priority === "medium"
                        ? "text-info"
                        : "text-muted-foreground"
                    }`}
                  />
                  <p className="text-sm text-foreground/90 leading-relaxed">{insight.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-border">
            <span className="badge-engine text-[9px]">
              <Zap className="w-2.5 h-2.5" /> Powered by Internal Rule Engine
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
