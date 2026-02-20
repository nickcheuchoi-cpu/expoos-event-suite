import {
  Package,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Truck,
  Clock,
} from "lucide-react";
import { useEvent } from "@/context/EventContext";

export default function MaterialsManagement() {
  const { event } = useEvent();
  const { inventory, deliverySchedule } = event;

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Materials Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Inventory tracking and logistics coordination</p>
      </div>

      {/* Warning */}
      <div className="flex items-center gap-3 p-4 rounded-lg border border-warning/30 bg-warning/5">
        <Clock className="w-5 h-5 text-warning shrink-0" />
        <div>
          <p className="text-sm font-semibold text-foreground">2 items arriving 1 day before build.</p>
          <p className="text-xs text-muted-foreground mt-0.5">Tight delivery window may impact build schedule.</p>
        </div>
      </div>

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

      {/* Logistics */}
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
