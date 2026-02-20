import { createContext, useContext, useState } from "react";
import type { EventData } from "@/data/types";
import { allEvents } from "@/data/events";

interface EventContextType {
  event: EventData;
  setEvent: (event: EventData) => void;
  allEvents: EventData[];
}

const EventContext = createContext<EventContextType | null>(null);

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [event, setEvent] = useState<EventData>(allEvents[0]);

  return (
    <EventContext.Provider value={{ event, setEvent, allEvents }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useEvent must be used within EventProvider");
  return ctx;
}
