import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { CheckCircle2, ArrowRight, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  title: string;
  icon: LucideIcon;
  shortDesc: string;
  longDesc: string;
  benefits: string[];
  link: string;
}

interface InteractiveFeatureCardProps {
  feature: Feature;
  index: number;
  Icon: LucideIcon;
  isExpanded: boolean;
  isHovered: boolean;
  onExpand: () => void;
  onHoverChange: (hovered: boolean) => void;
  navigate: (path: string) => void;
}

export function InteractiveFeatureCard({
  feature,
  index,
  Icon,
  isExpanded,
  isHovered,
  onExpand,
  onHoverChange,
  navigate,
}: InteractiveFeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Motion values for smooth animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smooth movement
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation based on mouse position
    const rotateYValue = ((x - centerX) / centerX) * 10; // Max 10 degrees
    const rotateXValue = ((centerY - y) / centerY) * 10; // Max 10 degrees
    
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
    
    // Set mouse position for spotlight effect
    setMousePosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    onHoverChange(false);
  };
  
  const handleMouseEnter = () => {
    onHoverChange(true);
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 + index * 0.1 }}
      onClick={onExpand}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative p-6 rounded-xl bg-card border-2 transition-all duration-300 cursor-pointer overflow-hidden group"
      whileHover={{ y: -5 }}
    >
      {/* Animated spotlight that follows cursor */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle 300px at ${mousePosition.x}% ${mousePosition.y}%, rgba(81, 3, 153, 0.15), transparent 70%)`,
        }}
      />
      
      {/* Gradient border glow on hover */}
      <motion.div
        className="absolute -inset-[2px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle 400px at ${mousePosition.x}% ${mousePosition.y}%, var(--violet), transparent 60%)`,
          filter: 'blur(8px)',
        }}
      />
      
      {/* Subtle shine effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(${mousePosition.x}deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)`,
        }}
      />
      
      {/* Card border */}
      <div
        className="absolute inset-0 rounded-xl border-2 transition-all duration-300"
        style={{
          borderColor: isExpanded ? 'var(--violet)' : (isHovered ? 'var(--violet)' : 'var(--border)'),
          boxShadow: isExpanded ? '0 0 30px var(--violet-glow)' : (isHovered ? '0 0 20px var(--violet-glow)' : 'none'),
        }}
      />
      
      {/* Content */}
      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-start justify-between mb-3">
          <motion.div
            className="p-3 rounded-lg"
            style={{ backgroundColor: 'var(--violet-glow)' }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Icon className="w-6 h-6" style={{ color: 'var(--violet)' }} />
          </motion.div>
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.2 }}
          >
            {isExpanded ? (
              <X className="w-5 h-5" style={{ color: 'var(--violet)' }} />
            ) : (
              <ArrowRight
                className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity"
                style={{ color: 'var(--violet)' }}
              />
            )}
          </motion.div>
        </div>
        
        <h3 className="mb-3 text-lg md:text-xl" style={{ color: 'var(--violet)' }}>
          {feature.title}
        </h3>
        
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.p
              key="short"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm md:text-base text-muted-foreground"
            >
              {feature.shortDesc}
            </motion.p>
          ) : (
            <motion.div
              key="long"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                {feature.longDesc}
              </p>
              <div className="space-y-2">
                {feature.benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: 'var(--violet)' }} />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(feature.link);
                }}
                className="mt-4 w-full px-4 py-2 rounded-lg text-sm text-white transition-all"
                style={{ backgroundColor: 'var(--violet)' }}
              >
                Try it now
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Floating particles on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: 'var(--violet)',
                left: `${Math.random() * 100}%`,
                top: '100%',
              }}
              animate={{
                y: [0, -300],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
