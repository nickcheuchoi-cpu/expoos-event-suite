import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { clientConfig } from "@/config/client";
import {
  LayoutDashboard,
  PenTool,
  DollarSign,
  Users,
  Package,
  BarChart3,
  Clock,
  Settings,
  ChevronDown,
  Bell,
  Zap,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Design & Validation", icon: PenTool, path: "/design" },
  { label: "Cost & Offers", icon: DollarSign, path: "/cost" },
  { label: "Resource Planning", icon: Users, path: "/resources" },
  { label: "Materials Management", icon: Package, path: "/materials" },
  { label: "Evaluation & Insights", icon: BarChart3, path: "/evaluation" },
  { label: "Event History", icon: Clock, path: "/history" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={`sidebar-gradient border-r border-sidebar-border flex flex-col transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-0 -ml-1"
        } overflow-hidden shrink-0`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-sidebar-border shrink-0">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-foreground">ExpoOS</span>
            <span className="text-[10px] block text-muted-foreground -mt-0.5 tracking-widest uppercase">Operating System</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-primary/10 text-primary glow-primary"
                    : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent"
                }`}
              >
                <item.icon className={`w-[18px] h-[18px] ${isActive ? "text-primary" : "text-sidebar-foreground group-hover:text-foreground"}`} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full gradient-primary" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="badge-engine text-[9px] w-fit">
            <Zap className="w-2.5 h-2.5" /> Rule Engine Active
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 shrink-0 bg-background/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            {/* Event selector */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border cursor-pointer hover:bg-muted transition-colors">
              <div className="w-2 h-2 rounded-full gradient-success" />
              <span className="text-sm font-semibold text-foreground">{clientConfig.eventName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="badge-ai">
              <Zap className="w-2.5 h-2.5" /> AI Active
            </div>
            <button className="relative p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-warning" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                {clientConfig.userInitials}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground leading-none">{clientConfig.userDisplayName}</p>
                <p className="text-xs text-muted-foreground">{clientConfig.userDepartment}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
