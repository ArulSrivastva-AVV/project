import { motion, AnimatePresence } from "motion/react";
import { Clock, AlertCircle, CheckCircle2, TrendingUp, X } from "lucide-react";

interface PostMortemSidebarProps {
  show: boolean;
  onClose: () => void;
}

export function PostMortemSidebar({ show, onClose }: PostMortemSidebarProps) {
  const fiveWhys = [
    {
      question: "Why did the API timeout?",
      answer: "Database query took 45 seconds",
    },
    {
      question: "Why did the query take so long?",
      answer: "Missing index on users table",
    },
    {
      question: "Why was the index missing?",
      answer: "Migration wasn't run in production",
    },
    {
      question: "Why wasn't the migration run?",
      answer: "Deploy checklist wasn't followed",
    },
    {
      question: "Why wasn't the checklist followed?",
      answer: "No automated enforcement of pre-deploy steps",
    },
  ];

  const timeline = [
    {
      time: "14:23",
      event: "Error spike detected",
      type: "error" as const,
      icon: AlertCircle,
    },
    {
      time: "14:35",
      event: "Team notified via Slack",
      type: "info" as const,
      icon: Clock,
    },
    {
      time: "14:52",
      event: "Root cause identified",
      type: "info" as const,
      icon: TrendingUp,
    },
    {
      time: "15:08",
      event: "Migration deployed",
      type: "success" as const,
      icon: CheckCircle2,
    },
    {
      time: "15:15",
      event: "System recovered",
      type: "success" as const,
      icon: CheckCircle2,
    },
  ];

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Mobile overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
          />

          <motion.aside
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-80 md:w-96 border-l border-border bg-card overflow-y-auto fixed md:relative right-0 top-0 h-full z-50"
          >
            <div className="p-4 md:p-6">
              {/* Close button for mobile */}
              <button
                onClick={onClose}
                className="md:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-accent transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl mb-2" style={{ color: "var(--violet)" }}>
                  Automated Post-Mortem
                </h2>
                <p className="text-sm text-muted-foreground">
                  Incident: API Timeout - Production
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Generated on March 21, 2026 at 15:30
                </p>
              </div>

              {/* Five Whys Section */}
              <div className="mb-8">
                <h3 className="mb-4 flex items-center gap-2 text-base md:text-lg">
                  <span style={{ color: "var(--violet)" }}>Five Whys Analysis</span>
                </h3>
                <div className="space-y-4">
                  {fiveWhys.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="relative pl-6 border-l-2"
                      style={{ borderColor: "var(--violet)" }}
                    >
                      <div
                        className="absolute left-[-9px] top-0 w-4 h-4 rounded-full"
                        style={{
                          background: "var(--violet)",
                          boxShadow: "0 0 10px var(--violet-glow)",
                        }}
                      />
                      <div className="mb-2">
                        <p className="text-sm font-medium">{item.question}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Event Timeline */}
              <div>
                <h3 className="mb-4 text-base md:text-lg" style={{ color: "var(--violet)" }}>
                  Event Timeline
                </h3>
                <div className="space-y-3">
                  {timeline.map((event, index) => {
                    const Icon = event.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0 + index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                      >
                        <div
                          className="mt-0.5 p-1.5 rounded-full flex-shrink-0"
                          style={{
                            background:
                              event.type === "error"
                                ? "var(--destructive)"
                                : event.type === "success"
                                ? "var(--violet)"
                                : "var(--muted)",
                          }}
                        >
                          <Icon className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-2 mb-1">
                            <span className="text-xs font-mono text-muted-foreground">
                              {event.time}
                            </span>
                            <span className="text-sm">{event.event}</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="mt-8 p-4 rounded-lg border border-border bg-background"
              >
                <h4 className="mb-3 text-sm" style={{ color: "var(--violet)" }}>
                  Recommendations
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span style={{ color: "var(--violet)" }}>•</span>
                    <span>Add pre-deploy automation checks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: "var(--violet)" }}>•</span>
                    <span>Create database index monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: "var(--violet)" }}>•</span>
                    <span>Update deployment runbook</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}