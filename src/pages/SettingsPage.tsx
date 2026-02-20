import { Settings as SettingsIcon, Zap } from "lucide-react";
import { clientConfig } from "@/config/client";

const configRows = [
  { label: "Active Event", value: clientConfig.eventName },
  { label: "Currency", value: clientConfig.currency },
  { label: "Locale", value: clientConfig.locale },
  { label: "Rules Engine", value: clientConfig.rulesEngineName },
  { label: "User Role", value: clientConfig.userDisplayName },
  { label: "Department", value: clientConfig.userDepartment },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Active configuration for this demo scenario</p>
        </div>
        <div className="badge-engine">
          <Zap className="w-2.5 h-2.5" /> Read-only
        </div>
      </div>

      <div className="glass-card-elevated p-6">
        <div className="flex items-center gap-2 mb-5">
          <SettingsIcon className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Client Configuration</h2>
        </div>
        <div className="divide-y divide-border/50">
          {configRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between py-3">
              <span className="text-sm text-muted-foreground">{row.label}</span>
              <span className="text-sm font-semibold text-foreground">{row.value}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          To adapt this scenario for a new client, update <code className="text-primary">src/config/client.ts</code> and <code className="text-primary">src/data/euroShop2026.ts</code>.
        </p>
      </div>
    </div>
  );
}
