import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, X } from "lucide-react";

interface ShadowDecisionToastProps {
  show: boolean;
  onClose: () => void;
}

export function ShadowDecisionToast({ show, onClose }: ShadowDecisionToastProps) {
  const handleCreateTicket = () => {
    // Simulate ticket creation
    alert("Jira ticket created: PROJ-124 - Database migration strategy discussion");
    onClose();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-auto md:max-w-md z-50"
        >
          <div
            className="rounded-xl border-2 shadow-2xl overflow-hidden backdrop-blur-lg"
            style={{
              borderColor: "var(--violet)",
              background: "var(--card)",
              boxShadow: "0 0 40px var(--violet-glow)",
            }}
          >
            {/* Pulsing top border */}
            <motion.div
              className="h-1"
              style={{ background: "var(--violet)" }}
              animate={{
                opacity: [1, 0.6, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="p-4 md:p-5">
              <div className="flex items-start gap-3">
                {/* Icon with pulse effect */}
                <motion.div
                  className="mt-0.5 p-2 rounded-lg flex-shrink-0"
                  style={{ background: "var(--violet)" }}
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 10px var(--violet-glow)",
                      "0 0 20px var(--violet-glow)",
                      "0 0 10px var(--violet-glow)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </motion.div>

                <div className="flex-1 min-w-0">
                  <h4 className="mb-1.5 text-sm md:text-base">Shadow Decision Detected</h4>
                  <p className="text-xs md:text-sm text-muted-foreground mb-3">
                    Undocumented decision found in{" "}
                    <span style={{ color: "var(--violet)" }}>#eng-chat</span>
                  </p>

                  <div className="p-3 rounded-lg bg-accent mb-4">
                    <p className="text-xs md:text-sm mb-2">
                      <span className="font-medium">LLM Recommendation:</span>
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Discussion about database migration strategy should be
                      tracked. Create a Jira ticket to document the decision
                      and action items.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={handleCreateTicket}
                      className="px-4 py-2 rounded-lg text-sm text-white transition-all hover:scale-105"
                      style={{
                        background: "var(--violet)",
                        boxShadow: "0 4px 12px var(--violet-glow)",
                      }}
                    >
                      Create Ticket
                    </button>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 rounded-lg text-sm bg-accent hover:bg-muted transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-1 rounded hover:bg-accent transition-colors flex-shrink-0"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}