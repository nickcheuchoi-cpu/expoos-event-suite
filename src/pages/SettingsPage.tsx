import { Settings as SettingsIcon, Zap, Pencil, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useEvent } from "@/context/EventContext";

const EDITABLE = new Set(["User Role", "Department", "Rules Engine"]);

export default function SettingsPage() {
  const { event } = useEvent();
  const { config } = event;

  const defaultValues = {
    "User Role": config.userDisplayName,
    Department: config.userDepartment,
    "Rules Engine": config.rulesEngineName,
  } as Record<string, string>;

  const [edits, setEdits] = useState<Record<string, string>>(defaultValues);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset on event change
  useEffect(() => {
    setEdits({
      "User Role": config.userDisplayName,
      Department: config.userDepartment,
      "Rules Engine": config.rulesEngineName,
    });
    setEditingKey(null);
    setSavedKey(null);
  }, [event.id, config]);

  // Focus input when editing starts
  useEffect(() => {
    if (editingKey && inputRef.current) inputRef.current.focus();
  }, [editingKey]);

  const startEdit = (label: string) => setEditingKey(label);

  const commitEdit = (label: string) => {
    setEditingKey(null);
    setSavedKey(label);
    setTimeout(() => setSavedKey(null), 2000);
  };

  const configRows = [
    { label: "Active Event", value: config.eventName },
    { label: "Currency", value: config.currency },
    { label: "Locale", value: config.locale },
    { label: "Rules Engine", value: edits["Rules Engine"] ?? config.rulesEngineName },
    { label: "User Role", value: edits["User Role"] ?? config.userDisplayName },
    { label: "Department", value: edits["Department"] ?? config.userDepartment },
  ];

  const hasEdits = Object.entries(edits).some(([k, v]) => v !== defaultValues[k]);

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Active configuration for this demo scenario</p>
        </div>
        <div className={`badge-engine ${hasEdits ? "border-success/30 text-success" : ""}`}>
          <Zap className="w-2.5 h-2.5" /> {hasEdits ? "Changes saved" : "Configuration"}
        </div>
      </div>

      <div className="glass-card-elevated p-6">
        <div className="flex items-center gap-2 mb-5">
          <SettingsIcon className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Client Configuration</h2>
        </div>
        <div className="divide-y divide-border/50">
          {configRows.map((row) => {
            const editable = EDITABLE.has(row.label);
            const isEditing = editingKey === row.label;
            const justSaved = savedKey === row.label;
            return (
              <div key={row.label} className="flex items-center justify-between py-3 group">
                <span className="text-sm text-muted-foreground">{row.label}</span>
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <input
                      ref={inputRef}
                      value={edits[row.label] ?? row.value}
                      onChange={(e) => setEdits((prev) => ({ ...prev, [row.label]: e.target.value }))}
                      onBlur={() => commitEdit(row.label)}
                      onKeyDown={(e) => { if (e.key === "Enter") commitEdit(row.label); if (e.key === "Escape") setEditingKey(null); }}
                      className="text-sm font-semibold text-foreground bg-muted/40 border border-primary/40 rounded-md px-2 py-0.5 outline-none focus:border-primary w-48"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-foreground">{row.value}</span>
                  )}
                  {editable && !isEditing && (
                    justSaved ? (
                      <Check className="w-3.5 h-3.5 text-success" />
                    ) : (
                      <button
                        onClick={() => startEdit(row.label)}
                        className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted text-muted-foreground hover:text-foreground"
                        title={`Edit ${row.label}`}
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          To adapt this scenario for a new client, update <code className="text-primary">src/config/client.ts</code> and <code className="text-primary">src/data/euroShop2026.ts</code>.
        </p>
      </div>
    </div>
  );
}
