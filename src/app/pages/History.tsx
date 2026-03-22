import { useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  BackgroundVariant,
  NodeProps,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { ThemeToggle } from "../components/ThemeToggle";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Crown,
  GitPullRequest,
  MessageSquare,
  GitBranch,
  ExternalLink,
  Calendar,
  Users,
} from "lucide-react";

// Custom Decision Node Component
function DecisionNode({ data }: NodeProps) {
  const Icon = data.icon || GitPullRequest;

  return (
    <div
      className="px-4 py-3 rounded-xl border-2 min-w-[220px] max-w-[280px] shadow-lg"
      style={{
        background: data.isPrimary ? "var(--violet)" : "var(--card)",
        borderColor: data.isPrimary ? "var(--violet-light)" : "var(--violet)",
        color: data.isPrimary ? "white" : "var(--card-foreground)",
        boxShadow: data.isPrimary
          ? "0 0 30px var(--violet-glow)"
          : "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Handle type="target" position={Position.Top} />

      <div className="flex items-start gap-3">
        <div
          className="p-2 rounded-lg shrink-0"
          style={{
            background: data.isPrimary ? "rgba(255,255,255,0.2)" : "var(--violet-glow)",
          }}
        >
          <Icon className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium mb-1">{data.label}</div>
          {data.description && (
            <div
              className="text-xs opacity-80 mb-2 line-clamp-2"
            >
              {data.description}
            </div>
          )}

          {data.metadata && (
            <div className="flex flex-wrap gap-2 text-xs">
              {data.metadata.date && (
                <span className="flex items-center gap-1 opacity-70">
                  <Calendar className="w-3 h-3" />
                  {data.metadata.date}
                </span>
              )}
              {data.metadata.author && (
                <span className="flex items-center gap-1 opacity-70">
                  <Users className="w-3 h-3" />
                  {data.metadata.author}
                </span>
              )}
            </div>
          )}

          {data.links && data.links.length > 0 && (
            <div className="mt-2 pt-2 border-t border-current/20 space-y-1">
              {data.links.map((link: any, idx: number) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs hover:underline opacity-90 hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MessageSquare className="w-3 h-3" />
                  <span className="truncate">{link.label}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

const nodeTypes = {
  decisionNode: DecisionNode,
};

// Sample project history data
const initialNodes: Node[] = [
  {
    id: "root",
    type: "decisionNode",
    position: { x: 400, y: 50 },
    data: {
      label: "Project Inception",
      description: "Initial architecture decision for microservices",
      isPrimary: true,
      icon: Crown,
      metadata: {
        date: "Jan 2025",
        author: "Architecture Team",
      },
      links: [
        {
          label: "Slack: Initial discussion",
          url: "#",
        },
      ],
    },
  },
  {
    id: "auth-decision",
    type: "decisionNode",
    position: { x: 200, y: 200 },
    data: {
      label: "Auth Strategy",
      description: "Chose OAuth 2.0 + JWT for authentication",
      icon: GitBranch,
      metadata: {
        date: "Jan 15, 2025",
        author: "Security Team",
      },
      links: [
        {
          label: "Slack: Auth discussion",
          url: "#",
        },
        {
          label: "GitHub: PR #42",
          url: "#",
        },
      ],
    },
  },
  {
    id: "database-decision",
    type: "decisionNode",
    position: { x: 600, y: 200 },
    data: {
      label: "Database Choice",
      description: "PostgreSQL selected over MongoDB for ACID compliance",
      icon: GitBranch,
      metadata: {
        date: "Jan 20, 2025",
        author: "Backend Team",
      },
      links: [
        {
          label: "Slack: DB trade-offs",
          url: "#",
        },
        {
          label: "Architecture Doc",
          url: "#",
        },
      ],
    },
  },
  {
    id: "api-gateway",
    type: "decisionNode",
    position: { x: 100, y: 350 },
    data: {
      label: "API Gateway",
      description: "Implemented Kong for centralized routing",
      isPrimary: true,
      icon: GitPullRequest,
      metadata: {
        date: "Feb 1, 2025",
        author: "Platform Team",
      },
      links: [
        {
          label: "GitHub: PR #89",
          url: "#",
        },
      ],
    },
  },
  {
    id: "jwt-refresh",
    type: "decisionNode",
    position: { x: 300, y: 350 },
    data: {
      label: "JWT Refresh Tokens",
      description: "Added refresh token mechanism for better UX",
      icon: GitPullRequest,
      metadata: {
        date: "Feb 5, 2025",
        author: "Frontend Team",
      },
      links: [
        {
          label: "Slack: Security review",
          url: "#",
        },
        {
          label: "GitHub: PR #103",
          url: "#",
        },
      ],
    },
  },
  {
    id: "sharding",
    type: "decisionNode",
    position: { x: 500, y: 350 },
    data: {
      label: "Database Sharding",
      description: "Implemented tenant-based sharding for scalability",
      isPrimary: true,
      icon: GitPullRequest,
      metadata: {
        date: "Feb 10, 2025",
        author: "Backend Team",
      },
      links: [
        {
          label: "Slack: Performance discussion",
          url: "#",
        },
        {
          label: "GitHub: PR #128",
          url: "#",
        },
      ],
    },
  },
  {
    id: "caching",
    type: "decisionNode",
    position: { x: 700, y: 350 },
    data: {
      label: "Redis Caching",
      description: "Added Redis for session storage and caching",
      icon: GitPullRequest,
      metadata: {
        date: "Feb 12, 2025",
        author: "Platform Team",
      },
      links: [
        {
          label: "Architecture review",
          url: "#",
        },
      ],
    },
  },
  {
    id: "monitoring",
    type: "decisionNode",
    position: { x: 200, y: 500 },
    data: {
      label: "Observability Stack",
      description: "Datadog chosen for monitoring and APM",
      icon: GitBranch,
      metadata: {
        date: "Feb 20, 2025",
        author: "DevOps Team",
      },
      links: [
        {
          label: "Slack: Vendor comparison",
          url: "#",
        },
      ],
    },
  },
  {
    id: "rate-limiting",
    type: "decisionNode",
    position: { x: 400, y: 500 },
    data: {
      label: "Rate Limiting",
      description: "Token bucket algorithm for API rate limiting",
      isPrimary: true,
      icon: GitPullRequest,
      metadata: {
        date: "Feb 25, 2025",
        author: "Backend Team",
      },
      links: [
        {
          label: "GitHub: PR #167",
          url: "#",
        },
        {
          label: "Slack: Implementation details",
          url: "#",
        },
      ],
    },
  },
  {
    id: "cdn",
    type: "decisionNode",
    position: { x: 600, y: 500 },
    data: {
      label: "CDN Integration",
      description: "CloudFlare CDN for static assets and DDoS protection",
      icon: GitPullRequest,
      metadata: {
        date: "Mar 1, 2025",
        author: "Platform Team",
      },
      links: [
        {
          label: "Cost analysis doc",
          url: "#",
        },
      ],
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e-root-auth",
    source: "root",
    target: "auth-decision",
    animated: true,
    style: { stroke: "var(--violet)", strokeWidth: 2 },
  },
  {
    id: "e-root-db",
    source: "root",
    target: "database-decision",
    animated: true,
    style: { stroke: "var(--violet)", strokeWidth: 2 },
  },
  {
    id: "e-auth-gateway",
    source: "auth-decision",
    target: "api-gateway",
    style: { stroke: "var(--violet)", strokeWidth: 2 },
  },
  {
    id: "e-auth-jwt",
    source: "auth-decision",
    target: "jwt-refresh",
    style: { stroke: "var(--violet)", strokeWidth: 2 },
  },
  {
    id: "e-db-sharding",
    source: "database-decision",
    target: "sharding",
    style: { stroke: "var(--violet)", strokeWidth: 2 },
  },
  {
    id: "e-db-caching",
    source: "database-decision",
    target: "caching",
    style: { stroke: "var(--violet)", strokeWidth: 2 },
  },
  {
    id: "e-gateway-monitoring",
    source: "api-gateway",
    target: "monitoring",
    style: { stroke: "var(--violet)", strokeWidth: 2 },
  },
  {
    id: "e-gateway-rate",
    source: "api-gateway",
    target: "rate-limiting",
    style: { stroke: "var(--violet)", strokeWidth: 2 },
  },
  {
    id: "e-sharding-rate",
    source: "sharding",
    target: "rate-limiting",
    style: { stroke: "var(--violet)", strokeWidth: 2 },
  },
  {
    id: "e-caching-cdn",
    source: "caching",
    target: "cdn",
    style: { stroke: "var(--violet)", strokeWidth: 2 },
  },
];

export function History() {
  const navigate = useNavigate();
  const [nodes] = useState<Node[]>(initialNodes);
  const [edges] = useState<Edge[]>(initialEdges);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border bg-card/50 backdrop-blur-lg flex items-center justify-between px-4 md:px-6 shrink-0">
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
            <h1 className="text-lg md:text-xl">Project History</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-3 py-1.5 rounded-lg bg-[var(--violet)] text-white text-sm hover:bg-[var(--violet-light)] transition-colors"
          >
            Live Canvas
          </button>
          <ThemeToggle />
        </div>
      </header>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--violet)] text-white px-4 md:px-6 py-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 shrink-0"
      >
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 shrink-0" />
          <span className="font-medium">Interactive Decision History</span>
        </div>
        <span className="text-sm opacity-90">
          Visual timeline of architectural decisions • Click nodes for details • Hover edges to see connections
        </span>
      </motion.div>

      {/* React Flow Canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
          style={{
            background: "var(--canvas-bg)",
          }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={16}
            size={1}
            color="var(--violet)"
            style={{ opacity: 0.3 }}
          />
          <Controls
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
          />
          <MiniMap
            nodeColor={(node) => {
              return node.data.isPrimary ? "var(--violet)" : "var(--muted)";
            }}
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
          />
        </ReactFlow>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 right-4 bg-card border border-border rounded-xl p-4 shadow-lg max-w-xs"
        >
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" style={{ color: "var(--violet)" }} />
            Legend
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ background: "var(--violet)" }}></div>
              <span>Major Decision</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2" style={{ borderColor: "var(--violet)", background: "var(--card)" }}></div>
              <span>Implementation</span>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" style={{ color: "var(--violet)" }} />
              <span>Links to source (Slack/GitHub)</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 left-4 bg-card border border-border rounded-xl p-4 shadow-lg"
        >
          <h3 className="font-medium mb-3">Timeline Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between gap-8">
              <span className="text-muted-foreground">Total Decisions:</span>
              <span className="font-medium">{nodes.length}</span>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-muted-foreground">Major Milestones:</span>
              <span className="font-medium">{nodes.filter(n => n.data.isPrimary).length}</span>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-muted-foreground">Period:</span>
              <span className="font-medium">Jan - Mar 2025</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
