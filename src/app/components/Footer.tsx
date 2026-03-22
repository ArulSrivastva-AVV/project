import { Crown } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-card/50 backdrop-blur-lg py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5" style={{ color: "var(--violet)" }} />
            <span className="text-sm text-muted-foreground">
              © 2026 Project.
            </span>
            <span className="text-sm text-muted-foreground">
              Enterprise Workflow Automation.
            </span>
          </div>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <button className="hover:text-foreground transition-colors">
              Privacy
            </button>
            <button className="hover:text-foreground transition-colors">
              Terms
            </button>
            <button className="hover:text-foreground transition-colors">
              Documentation
            </button>
            <button className="hover:text-foreground transition-colors">
              Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
