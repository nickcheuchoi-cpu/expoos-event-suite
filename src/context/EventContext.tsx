import { createContext, useContext, useState, useEffect } from "react";
import type { EventData } from "@/data/types";
import { allEvents } from "@/data/events";

interface EventContextType {
  event: EventData;
  setEvent: (event: EventData) => void;
  allEvents: EventData[];
  assignedCandidateName: string | null;
  setAssignedCandidate: (name: string | null) => void;
}

const EventContext = createContext<EventContextType | null>(null);

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [event, setEvent] = useState<EventData>(allEvents[0]);
  const [assignedCandidateName, setAssignedCandidate] = useState<string | null>(null);

  // Reset assignment when event changes
  useEffect(() => { setAssignedCandidate(null); }, [event.id]);

  return (
    <EventContext.Provider value={{ event, setEvent, allEvents, assignedCandidateName, setAssignedCandidate }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useEvent must be used within EventProvider");
  return ctx;
}
