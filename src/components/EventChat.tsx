import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Zap, Send } from "lucide-react";
import { useEvent } from "@/context/EventContext";
import type { EventData } from "@/data/types";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
}

function getAIResponse(query: string, event: EventData): string {
  const q = query.toLowerCase();
  const { config, kpis, healthBars, deliverySchedule, candidates, complianceTable, costBreakdown, budgetUtilization } = event;

  const healthMap: Record<string, number> = Object.fromEntries(
    healthBars.map((b) => [b.label.toLowerCase(), b.value])
  );
  const kpiMap: Record<string, string> = Object.fromEntries(
    kpis.map((k) => [k.label.toLowerCase(), String(k.value)])
  );

  if (q.includes("risk")) {
    return `Risk is currently at ${healthMap["risk"] ?? "?"}%. The main contributors are the tight delivery window for materials and pending compliance items. Compliance and staffing issues are directly linked to your risk score — resolving either will lower it.`;
  }

  if (q.includes("staff") || q.includes("worker") || q.includes("builder") || q.includes("crew")) {
    const top = candidates[0];
    return `Staffing sits at ${kpiMap["staffing"] ?? "N/A"} (${healthMap["staffing"] ?? "?"}% health). One Senior Builder position is currently open following a worker notification this morning. The system matched ${candidates.length} replacement candidates — top match is ${top?.name ?? "N/A"} at ${top?.match ?? "?"}%.`;
  }

  if (q.includes("budget") || q.includes("cost") || q.includes("money") || q.includes("spend")) {
    const largest = [...costBreakdown].sort((a, b) => b.amount - a.amount)[0];
    return `Budget utilization is at ${budgetUtilization}%. Current spend is ${kpiMap["budget"] ?? "on track"}. Largest line item is ${largest?.item ?? "N/A"} at ${config.currency} ${largest?.amount?.toLocaleString() ?? "N/A"}. No overruns currently flagged.`;
  }

  if (q.includes("deliver") || q.includes("material") || q.includes("logistic") || q.includes("truck") || q.includes("supply") || q.includes("van dijk")) {
    const atRisk = deliverySchedule.filter((d) => d.risk);
    const names = atRisk.map((d) => d.item).join(" and ");
    return `${atRisk.length} ${atRisk.length === 1 ? "delivery is" : "deliveries are"} flagged at risk: ${names || "none"}. A supplier (Van Dijk Transport) reported a vehicle breakdown causing a 2-day delay. Recommend confirming the new delivery window to protect the build schedule.`;
  }

  if (q.includes("compli") || q.includes("certif") || q.includes("safety") || q.includes("regulation")) {
    const warnings = complianceTable.filter((c) => c.status === "warn").length;
    return `Compliance is at ${healthMap["compliance"] ?? "?"}%. There ${warnings === 1 ? "is 1 item" : `are ${warnings} items`} flagged for review. All critical safety checkpoints pass — submit any outstanding documentation at least 48 hours before build start.`;
  }

  if (q.includes("build") || q.includes("start") || q.includes("when") || q.includes("schedule") || q.includes("timeline") || q.includes("countdown")) {
    const buildDate = new Date(config.buildStart);
    const diff = Math.ceil((buildDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    const dateStr = buildDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    if (diff > 0) {
      return `The build for ${config.eventName} starts on ${dateStr} — ${diff} day${diff !== 1 ? "s" : ""} from now. All critical materials and staff should be confirmed at least 24 hours before that date.`;
    }
    return `The build for ${config.eventName} started ${Math.abs(diff)} day${Math.abs(diff) !== 1 ? "s" : ""} ago. Check the Event History module for milestone progress and any open action items.`;
  }

  if (q.includes("biggest") || q.includes("top risk") || q.includes("priority") || q.includes("urgent") || q.includes("what should") || q.includes("focus")) {
    return `Top priorities right now: (1) Confirm the delayed supplier delivery — LED Wall Panels and Flooring have a 2-day slip with zero buffer left. (2) Assign the Senior Builder replacement — the staffing gap is still open. (3) Close remaining compliance items before build start.`;
  }

  if (q.match(/^(hi|hello|hey)\b/)) {
    return `Hi! I'm the ExpoOS AI for ${config.eventName}. Ask me about staffing, budget, deliveries, compliance, risk, or the build timeline.`;
  }

  return `I can help with staffing, budget, deliveries, compliance, risk, and the build schedule for ${config.eventName}. What would you like to know?`;
}

export default function EventChat() {
  const { event } = useEvent();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [pendingResponse, setPendingResponse] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset chat when event changes
  useEffect(() => {
    setMessages([{
      id: "welcome",
      role: "ai",
      text: `Hi! Ask me anything about ${event.config.eventName} — staffing, budget, deliveries, compliance, or build timeline.`,
    }]);
    setTyping(false);
    setTypingText("");
    setPendingResponse("");
  }, [event.id]);

  // Typewriter: word-by-word
  useEffect(() => {
    if (!pendingResponse) return;
    const words = pendingResponse.split(" ");
    let i = 0;
    setTypingText("");
    const iv = setInterval(() => {
      i++;
      setTypingText(words.slice(0, i).join(" "));
      if (i >= words.length) {
        clearInterval(iv);
        setMessages((prev) => [...prev, { id: String(Date.now()), role: "ai", text: pendingResponse }]);
        setTyping(false);
        setPendingResponse("");
        setTypingText("");
      }
    }, 38);
    return () => clearInterval(iv);
  }, [pendingResponse]);

  // Scroll to bottom on content change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingText]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || typing) return;
    setInput("");
    setMessages((prev) => [...prev, { id: String(Date.now()), role: "user", text }]);
    setTyping(true);
    setTimeout(() => setPendingResponse(getAIResponse(text, event)), 500);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full gradient-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center"
        aria-label="Toggle AI chat"
      >
        {open ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-[4.5rem] right-6 z-40 w-80 rounded-xl border border-border bg-popover shadow-2xl flex flex-col overflow-hidden animate-slide-up"
          style={{ height: 420 }}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center">
                <Zap className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold text-popover-foreground">Ask ExpoOS AI</span>
            </div>
            <div className="badge-ai text-[9px]"><Zap className="w-2 h-2" /> Live</div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "ai" && (
                  <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-2.5 h-2.5 text-primary-foreground" />
                  </div>
                )}
                <div className={`max-w-[78%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                  m.role === "user"
                    ? "gradient-primary text-primary-foreground rounded-tr-none"
                    : "bg-muted/60 border border-border/60 text-foreground rounded-tl-none"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex gap-2 justify-start">
                <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-2.5 h-2.5 text-primary-foreground" />
                </div>
                <div className="max-w-[78%] px-3 py-2 rounded-xl rounded-tl-none bg-muted/60 border border-border/60 text-xs leading-relaxed text-foreground">
                  {typingText || (
                    <span className="flex gap-1 items-center h-3.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  )}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border shrink-0 flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Ask about risk, staffing, budget…"
              disabled={typing}
              className="flex-1 px-3 py-2 rounded-lg bg-muted/50 border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || typing}
              className="p-2 rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
