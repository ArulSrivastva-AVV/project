import { Crown, ArrowLeft, PanelRightClose, PanelRightOpen, History } from "lucide-react";
import { useNavigate } from "react-router";
import { ThemeToggle } from "./ThemeToggle";

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  showSidebar: boolean;
}

export function DashboardHeader({ onToggleSidebar, showSidebar }: DashboardHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-lg flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-lg hover:bg-accent transition-colors"
          aria-label="Back to landing"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 md:w-6 md:h-6" style={{ color: "var(--violet)" }} />
          <h1 className="text-lg md:text-xl">Project</h1>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={() => navigate("/history")}
          className="p-2 rounded-lg hover:bg-accent transition-colors hidden sm:flex items-center gap-2"
          aria-label="View decision history"
          title="View Decision History"
        >
          <History className="w-5 h-5" style={{ color: "var(--violet)" }} />
        </button>
        <div className="px-2 md:px-3 py-1.5 rounded-lg bg-[var(--violet)] text-white text-xs md:text-sm">
          Free Sprint Active
        </div>
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-accent transition-colors md:hidden"
          aria-label="Toggle sidebar"
        >
          {showSidebar ? (
            <PanelRightClose className="w-5 h-5" />
          ) : (
            <PanelRightOpen className="w-5 h-5" />
          )}
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}