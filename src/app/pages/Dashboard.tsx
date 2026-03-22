import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { ThemeToggle } from "../components/ThemeToggle";
import { PostMortemSidebar } from "../components/PostMortemSidebar";
import { ShadowDecisionToast } from "../components/ShadowDecisionToast";
import { DashboardHeader } from "../components/DashboardHeader";
import { motion } from "motion/react";
import { Crown } from "lucide-react";

const initialNodes = [
  {
    id: "1",
    type: "default",
    data: { label: "Slack: #eng-chat\nDiscussion started" },
    position: { x: 100, y: 100 },
    style: {
      background: "var(--card)",
      color: "var(--card-foreground)",
      border: "2px solid var(--violet)",
      borderRadius: "12px",
      padding: "16px",
      boxShadow: "0 0 20px var(--violet-glow)",
    },
  },
  {
    id: "2",
    type: "default",
    data: { label: "Decision Node\nAPI endpoint change" },
    position: { x: 400, y: 100 },
    style: {
      background: "var(--violet)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      padding: "16px",
      boxShadow: "0 0 30px var(--violet-glow)",
    },
  },
  {
    id: "3",
    type: "default",
    data: { label: "GitHub: PR #234\nImplementation" },
    position: { x: 250, y: 250 },
    style: {
      background: "var(--card)",
      color: "var(--card-foreground)",
      border: "2px solid var(--violet)",
      borderRadius: "12px",
      padding: "16px",
      boxShadow: "0 0 20px var(--violet-glow)",
    },
  },
  {
    id: "4",
    type: "default",
    data: { label: "Jira: PROJ-123\nTracking ticket" },
    position: { x: 550, y: 250 },
    style: {
      background: "var(--card)",
      color: "var(--card-foreground)",
      border: "2px solid var(--violet)",
      borderRadius: "12px",
      padding: "16px",
      boxShadow: "0 0 20px var(--violet-glow)",
    },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "var(--violet)", strokeWidth: 3 },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    style: { stroke: "var(--violet)", strokeWidth: 3 },
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    animated: true,
    style: { stroke: "var(--violet)", strokeWidth: 3 },
  },
];

export function Dashboard() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showToast, setShowToast] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.target) return;

      const newEdge: Edge = {
        ...params,
        source: params.source,
        target: params.target,
        id: `e${params.source}-${params.target}`,
        animated: true,
        style: { stroke: "var(--violet)", strokeWidth: 3 },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  // Show shadow decision toast after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <DashboardHeader onToggleSidebar={() => setShowSidebar(!showSidebar)} showSidebar={showSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Decision Flow Canvas */}
        <div className="flex-1 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
            style={{ background: "var(--canvas-bg)" }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
            >
              <Background
                variant={"dots" as BackgroundVariant}
                gap={20}
                size={1}
                color="var(--violet)"
                style={{ opacity: 0.2 }}
              />
              <Controls
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <MiniMap
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
                nodeColor="var(--violet)"
              />
            </ReactFlow>
          </motion.div>

          {/* Canvas Label */}
          <div className="absolute top-4 left-4 px-3 md:px-4 py-2 rounded-lg bg-card/90 backdrop-blur border border-border">
            <h3 className="text-xs md:text-sm" style={{ color: "var(--violet)" }}>
              Interactive Decision Flow
            </h3>
          </div>
        </div>

        {/* Post-Mortem Sidebar */}
        <PostMortemSidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
      </div>

      {/* Shadow Decision Toast */}
      <ShadowDecisionToast
        show={showToast}
        onClose={() => setShowToast(false)}
      />
      {/* --- GLOBAL FOOTER --- */}
      <footer className="relative z-10 border-t border-border bg-card/50 backdrop-blur-lg py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5" style={{ color: "var(--violet)" }} />
              <span className="text-sm text-muted-foreground">© 2026 Project. Enterprise Workflow Automation.</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors">Privacy</button>
              <button className="hover:text-foreground transition-colors">Terms</button>
              <button className="hover:text-foreground transition-colors">Documentation</button>
              <button className="hover:text-foreground transition-colors">Support</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}