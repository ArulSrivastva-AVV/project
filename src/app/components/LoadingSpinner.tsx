import { motion } from "motion/react";

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer ring */}
        <motion.div
          className="w-16 h-16 rounded-full border-4 border-transparent"
          style={{
            borderTopColor: "var(--violet)",
            borderRightColor: "var(--violet)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-transparent"
          style={{
            borderBottomColor: "var(--violet-light)",
            borderLeftColor: "var(--violet-light)",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Center glow */}
        <div
          className="absolute inset-4 rounded-full"
          style={{
            background: `radial-gradient(circle, var(--violet-glow) 0%, transparent 70%)`,
          }}
        />
      </motion.div>
    </div>
  );
}
