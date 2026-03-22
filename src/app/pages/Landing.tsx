import { useNavigate } from "react-router";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useInView } from "framer-motion"; // Changed motion/react to framer-motion for standard compatibility

import { KnowledgeNet } from "../components/KnowledgeNet";
import { ThemeToggle } from "../components/ThemeToggle";
import { Footer } from "../components/Footer";
import { InteractiveFeatureCard } from "../components/InteractiveFeatureCard";
import {
  Crown,
  Github,
  MessageSquare,
  ListTodo,
  GitBranch,
  Zap,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";


// --- Sub-component for Fast Counting ---
const StatCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString() + suffix);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      // duration 0.8 is fast; decrease to 0.4 for even faster "pop"
      const controls = animate(count, value, { duration: 0.8, ease: "easeOut" });
      return controls.stop;
    }
  }, [value, isInView, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

export function Landing() {
  const navigate = useNavigate();
  const [expandedFeature, setExpandedFeature] = useState<
    number | null
  >(null);
  const [hoveredIntegration, setHoveredIntegration] = useState<
    string | null
  >(null);
  const [activeStats, setActiveStats] = useState({
    decisions: 0,
    time: 0,
    accuracy: 0,
  });
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [hoveredFeatureIndex, setHoveredFeatureIndex] =
    useState<number | null>(null);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () =>
      window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animated counters for stats
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStats((prev) => ({
        decisions:
          prev.decisions < 6769 ? prev.decisions + 47 : 6769,
        time: prev.time < 32 ? prev.time + 3 : 32,
        accuracy: prev.accuracy < 92 ? prev.accuracy + 2 : 92,
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Decision Flow",
      icon: GitBranch,
      shortDesc:
        "Visualize complex decision paths across your engineering tools in real-time.",
      longDesc:
        "Map every architectural decision to its origin. See how Slack conversations become GitHub PRs, and how PRs influence Jira tickets. Never lose track of why a decision was made.",
      benefits: [
        "Real-time visualization",
        "Cross-platform tracking",
        "Historical context",
      ],
      link: "/dashboard",
    },
    {
      title: "Automated Post-Mortems",
      icon: BarChart3,
      shortDesc:
        "Generate structured incident analysis using the Five Whys methodology automatically.",
      longDesc:
        "Turn incidents into learning opportunities. Our AI automatically generates comprehensive post-mortems by analyzing your team's communications and code changes.",
      benefits: [
        "AI-powered analysis",
        "Five Whys methodology",
        "Actionable insights",
      ],
      link: "/dashboard",
    },
    {
      title: "Shadow Detection",
      icon: Zap,
      shortDesc:
        "AI-powered detection of undocumented decisions in chat conversations.",
      longDesc:
        "Catch decisions before they become technical debt. Our AI monitors Slack, detects architectural discussions, and prompts teams to document them properly.",
      benefits: [
        "Proactive detection",
        "Smart notifications",
        "Zero documentation debt",
      ],
      link: "/dashboard",
    },
  ];

  const integrations = [
    {
      id: "slack",
      name: "Slack",
      icon: MessageSquare,
      description:
        "Monitor all engineering channels for decision signals",
      metrics: "1,247 decisions detected",
      status: "Connected",
    },
    {
      id: "github",
      name: "GitHub",
      icon: Github,
      description:
        "Link PRs and commits to architectural choices",
      metrics: "892 PRs analyzed",
      status: "Connected",
    },
    {
      id: "jira",
      name: "Jira",
      icon: ListTodo,
      description: "Connect tickets to the context behind them",
      metrics: "1,543 tickets enriched",
      status: "Connected",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-violet-tint)] via-background to-background opacity-60" />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: "var(--violet)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Top Navigation */}
      <div className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Crown
            className="w-6 h-6"
            style={{ color: "var(--violet)" }}
          />
          <span className="text-lg font-medium">Project</span>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-lg border-2 text-sm transition-all"
            style={{
              borderColor: "var(--violet)",
              color: "var(--violet)",
            }}
          >
            Log In
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/pricing")}
            className="px-4 py-2 rounded-lg text-sm transition-all text-white"
            style={{
              backgroundColor: "var(--violet)",
            }}
          >
            Pricing
          </motion.button>
          <ThemeToggle />
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div
            className="flex items-center justify-center gap-2 mb-4 md:mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Crown
                className="w-6 h-6 md:w-8 md:h-8"
                style={{ color: "var(--violet)" }}
              />
            </motion.div>
            <h1
              className="text-4xl md:text-5xl lg:text-7xl tracking-tight"
              style={{
                fontFamily:
                  "SF Pro Rounded, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              Project
            </h1>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl md:text-4xl lg:text-6xl mb-4 md:mb-6 max-w-4xl mx-auto leading-tight px-4"
          >
            Move Beyond Chat.{" "}
            <span style={{ color: "var(--violet)" }}>
              Automate
            </span>{" "}
            your Architecture.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto px-4"
          >
            Decision Net connects Slack, GitHub, and Jira into
            an autonomous intelligence layer.
          </motion.p>
        </motion.div>

        {/* 3D Knowledge Net Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          whileHover={{ scale: 1.02 }}
          className="w-full max-w-4xl h-[300px] md:h-[400px] mb-8 md:mb-12 px-4"
        >
          <KnowledgeNet />
        </motion.div>

        {/* Interactive Integration Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8 md:mb-12 px-4"
        >
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <motion.div
                key={integration.id}
                className="relative cursor-pointer"
                onHoverStart={() =>
                  setHoveredIntegration(integration.id)
                }
                onHoverEnd={() => setHoveredIntegration(null)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className="flex items-center gap-2 px-4 md:px-5 py-3 rounded-xl bg-card border-2 transition-all duration-300"
                  style={{
                    borderColor:
                      hoveredIntegration === integration.id
                        ? "var(--violet)"
                        : "var(--border)",
                    boxShadow:
                      hoveredIntegration === integration.id
                        ? "0 0 20px var(--violet-glow)"
                        : "none",
                  }}
                >
                  <Icon
                    className="w-5 h-5 md:w-6 md:h-6"
                    style={{ color: "var(--violet)" }}
                  />
                  <span className="text-sm md:text-base font-medium">
                    {integration.name}
                  </span>
                  <CheckCircle2
                    className="w-4 h-4 ml-1"
                    style={{ color: "var(--violet)" }}
                  />
                </div>

                {/* Hover tooltip */}
                <AnimatePresence>
                  {hoveredIntegration === integration.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-card border-2 rounded-xl p-4 shadow-xl z-50 min-w-[250px]"
                      style={{ borderColor: "var(--violet)" }}
                    >
                      <div
                        className="text-sm mb-2 font-medium"
                        style={{ color: "var(--violet)" }}
                      >
                        {integration.description}
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {integration.metrics}
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>{integration.status}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="grid grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12 px-4 max-w-3xl w-full"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center p-4 md:p-6 rounded-xl bg-card border border-border hover:border-[var(--violet)] transition-all cursor-pointer"
          >
            <div
              className="text-2xl md:text-4xl font-bold mb-1 md:mb-2"
              style={{ color: "var(--violet)" }}
            >
              {activeStats.decisions.toLocaleString()}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Decisions Tracked
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center p-4 md:p-6 rounded-xl bg-card border border-border hover:border-[var(--violet)] transition-all cursor-pointer"
          >
            <div
              className="text-2xl md:text-4xl font-bold mb-1 md:mb-2"
              style={{ color: "var(--violet)" }}
            >
              {activeStats.time}%
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Time Saved
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center p-4 md:p-6 rounded-xl bg-card border border-border hover:border-[var(--violet)] transition-all cursor-pointer"
          >
            <div
              className="text-2xl md:text-4xl font-bold mb-1 md:mb-2"
              style={{ color: "var(--violet)" }}
            >
              {activeStats.accuracy}%
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Accuracy
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 md:mb-20">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            onClick={() => navigate("/dashboard")}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(81,3,153,0.8)",
            }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 md:px-10 py-3 md:py-4 rounded-xl text-base md:text-lg text-white shadow-2xl transition-all duration-300 flex items-center gap-2"
            style={{
              backgroundColor: "var(--violet)",
              fontFamily:
                "SF Pro Rounded, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Start Free Sprint
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            onClick={() => navigate("/history")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 md:px-8 py-3 md:py-4 rounded-xl text-sm md:text-base border-2 transition-all duration-300"
            style={{
              borderColor: "var(--violet)",
              color: "var(--violet)",
              fontFamily:
                "SF Pro Rounded, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            View Decision History
          </motion.button>
        </div>

        {/* Interactive Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl w-full px-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isExpanded = expandedFeature === index;
            const isHovered = hoveredFeatureIndex === index;

            return (
              <InteractiveFeatureCard
                key={index}
                feature={feature}
                index={index}
                Icon={Icon}
                isExpanded={isExpanded}
                isHovered={isHovered}
                onExpand={() =>
                  setExpandedFeature(isExpanded ? null : index)
                }
                onHoverChange={(hovered) =>
                  setHoveredFeatureIndex(hovered ? index : null)
                }
                navigate={navigate}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}