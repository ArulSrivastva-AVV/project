import { useEffect, useRef } from "react";
import { motion } from "motion/react";

interface Node {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  connections: number[];
  pulseOffset: number;
}

export function KnowledgeNet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const timeRef = useRef<number>(0);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseenter", () => isHoveringRef.current = true);
    canvas.addEventListener("mouseleave", () => isHoveringRef.current = false);

    // init nodes
    const nodeCount = 40;
    nodesRef.current = Array.from({ length: nodeCount }, (_, i) => ({
      x: Math.random() * canvas.offsetWidth - canvas.offsetWidth / 2,
      y: Math.random() * canvas.offsetHeight - canvas.offsetHeight / 2,
      z: Math.random() * 500 - 250,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 0.3,
      connections: Array.from(
        { length: Math.floor(Math.random() * 4) + 1 },
        () => Math.floor(Math.random() * nodeCount)
      ).filter((c) => c !== i),
      pulseOffset: Math.random() * Math.PI * 2,
    }));

    const animate = () => {
      timeRef.current += 0.02;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2);

      const isDark = document.documentElement.classList.contains("dark");
      const violetColor = isDark ? "#7a18d4" : "#510399";
      const glowColor = isDark ? "rgba(122, 24, 212, 0.6)" : "rgba(81, 3, 153, 0.5)";
      const highlightColor = isDark ? "rgba(200, 100, 255, 0.9)" : "rgba(150, 50, 255, 0.8)";

      nodesRef.current.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        const boundary = 350;
        if (Math.abs(node.x) > boundary) {
          node.vx *= -0.95;
          node.x = Math.sign(node.x) * boundary;
        }
        if (Math.abs(node.y) > boundary) {
          node.vy *= -0.95;
          node.y = Math.sign(node.y) * boundary;
        }
        if (Math.abs(node.z) > 250) {
          node.vz *= -0.95;
          node.z = Math.sign(node.z) * 250;
        }

        // attract to mouse
        if (isHoveringRef.current) {
          const dx = mousePosRef.current.x - node.x;
          const dy = mousePosRef.current.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 250;

          if (dist < radius && dist > 0) {
            const force = (radius - dist) / radius;
            node.vx += (dx / dist) * force * 0.08;
            node.vy += (dy / dist) * force * 0.08;
          }
        }
      });

      const sortedNodes = [...nodesRef.current].sort((a, b) => a.z - b.z);

      // draw connections
      sortedNodes.forEach((node) => {
        const scale1 = 1 + node.z / 300;
        const x1 = node.x * scale1;
        const y1 = node.y * scale1;

        node.connections.forEach((targetIdx) => {
          const target = nodesRef.current[targetIdx];
          const scale2 = 1 + target.z / 300;
          const x2 = target.x * scale2;
          const y2 = target.y * scale2;

          const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          const maxDist = 300;

          if (dist < maxDist) {
            const opacity = Math.max(0, (1 - dist / maxDist) * 0.8);
            const pulse = Math.sin(timeRef.current * 2 + node.pulseOffset) * 0.2 + 0.8;

            let lineBoost = 1;
            let lineColor = violetColor;

            if (isHoveringRef.current) {
              const mx = mousePosRef.current.x;
              const my = mousePosRef.current.y;

              // distance from point to line segment
              const A = mx - x1;
              const B = my - y1;
              const C = x2 - x1;
              const D = y2 - y1;

              const dot = A * C + B * D;
              const lenSq = C * C + D * D;
              let param = -1;

              if (lenSq !== 0) param = dot / lenSq;

              let xx, yy;
              if (param < 0) {
                xx = x1;
                yy = y1;
              } else if (param > 1) {
                xx = x2;
                yy = y2;
              } else {
                xx = x1 + param * C;
                yy = y1 + param * D;
              }

              const d = Math.sqrt((mx - xx) ** 2 + (my - yy) ** 2);
              const highlightRadius = 80;

              if (d < highlightRadius) {
                lineBoost = 2.5 + (1 - d / highlightRadius) * 1.5;
                lineColor = highlightColor;
              }
            }

            const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
            const c1 = lineColor.replace(/[\d.]+\)$/, `${opacity * pulse * lineBoost * 0.8})`);
            const c2 = lineColor.replace(/[\d.]+\)$/, `${opacity * pulse * lineBoost * 0.4})`);
            gradient.addColorStop(0, c1);

            // hex to rgba
            const r = parseInt(violetColor.slice(1, 3), 16);
            const g = parseInt(violetColor.slice(3, 5), 16);
            const b = parseInt(violetColor.slice(5, 7), 16);
            gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${opacity * pulse * lineBoost * 0.8})`);
            gradient.addColorStop(1, c2);

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = Math.max(0.5, scale1 * 2 * pulse * Math.min(lineBoost, 2));

            if (lineBoost > 1) {
              ctx.shadowBlur = 15 * lineBoost;
              ctx.shadowColor = violetColor;
            }

            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        });
      });

      // draw nodes
      sortedNodes.forEach((node) => {
        const scale = 1 + node.z / 300;
        const x = node.x * scale;
        const y = node.y * scale;
        const baseSize = 3;
        let size = Math.max(1.5, scale * baseSize);
        const pulse = Math.sin(timeRef.current * 2 + node.pulseOffset) * 0.3 + 0.7;

        let nodeBoost = 1;
        if (isHoveringRef.current) {
          const dx = mousePosRef.current.x - node.x;
          const dy = mousePosRef.current.y - node.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const hoverRadius = 150;

          if (d < hoverRadius) {
            nodeBoost = 1 + (1 - d / hoverRadius) * 1.5;
            size *= nodeBoost;
          }
        }

        // outer glow
        const outerGrad = ctx.createRadialGradient(x, y, 0, x, y, size * 6 * nodeBoost);
        outerGrad.addColorStop(0, glowColor.replace(/[\d.]+\)$/, `${0.3 * pulse * nodeBoost})`));
        outerGrad.addColorStop(0.5, glowColor.replace(/[\d.]+\)$/, `${0.15 * pulse * nodeBoost})`));
        outerGrad.addColorStop(1, "transparent");
        ctx.fillStyle = outerGrad;
        ctx.beginPath();
        ctx.arc(x, y, size * 6 * nodeBoost, 0, Math.PI * 2);
        ctx.fill();

        // inner glow
        const grad = ctx.createRadialGradient(x, y, 0, x, y, size * 2.5);
        grad.addColorStop(0, violetColor);
        grad.addColorStop(0.5, glowColor.replace(/[\d.]+\)$/, `${0.6 * pulse * nodeBoost})`));
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, size * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // core
        ctx.fillStyle = violetColor;
        ctx.shadowBlur = 15 * pulse * nodeBoost;
        ctx.shadowColor = violetColor;
        ctx.beginPath();
        ctx.arc(x, y, size * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // highlight
        const hlGrad = ctx.createRadialGradient(
          x - size * 0.3,
          y - size * 0.3,
          0,
          x,
          y,
          size
        );
        hlGrad.addColorStop(0, `rgba(255, 255, 255, ${0.6 * nodeBoost})`);
        hlGrad.addColorStop(1, "transparent");
        ctx.fillStyle = hlGrad;
        ctx.beginPath();
        ctx.arc(x, y, size * pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "var(--canvas-bg)",
        border: "2px solid var(--border)",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      whileHover={{ scale: 1.01 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, transparent 0%, var(--background) 100%)`,
          opacity: 0.2,
        }}
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, var(--violet-glow) 0%, transparent 70%)`,
          opacity: 0.3,
        }}
      />
    </motion.div>
  );
}
