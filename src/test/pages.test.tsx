// Smoke tests: each page must render without throwing.
// These are not behaviour tests — they give us a stable demo signal.

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import Dashboard from "@/pages/Dashboard";
import DesignValidation from "@/pages/DesignValidation";
import CostOffers from "@/pages/CostOffers";
import ResourcePlanning from "@/pages/ResourcePlanning";
import MaterialsManagement from "@/pages/MaterialsManagement";
import EvaluationInsights from "@/pages/EvaluationInsights";
import EventHistory from "@/pages/EventHistory";
import SettingsPage from "@/pages/SettingsPage";

// Pages that use useLocation need a router context.
const wrap = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("Page smoke tests", () => {
  it("renders Dashboard", () => { wrap(<Dashboard />); });
  it("renders DesignValidation", () => { wrap(<DesignValidation />); });
  it("renders CostOffers", () => { wrap(<CostOffers />); });
  it("renders ResourcePlanning", () => { wrap(<ResourcePlanning />); });
  it("renders MaterialsManagement", () => { wrap(<MaterialsManagement />); });
  it("renders EvaluationInsights", () => { wrap(<EvaluationInsights />); });
  it("renders EventHistory", () => { wrap(<EventHistory />); });
  it("renders SettingsPage", () => { wrap(<SettingsPage />); });
});
