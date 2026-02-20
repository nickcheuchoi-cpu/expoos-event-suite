// Registry of all available demo events.
// Add a new EventData object here to make it available in the event selector.

import { euroShop2026Event } from "./euroShop2026";
import { cesLasVegas2026Event } from "./cesLasVegas2026";
import { hannoverMesse2026Event } from "./hannoverMesse2026";
import type { EventData } from "./types";

export const allEvents: EventData[] = [
  euroShop2026Event,
  cesLasVegas2026Event,
  hannoverMesse2026Event,
];
