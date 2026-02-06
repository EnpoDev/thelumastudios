import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Floating particles component
function FloatingParticles({ count = 20 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const colors = ['#00FFFF', '#FF00FF', '#BF00FF', '#00D4FF', '#00FF88'];
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}, 0 0 ${particle.size * 4}px ${particle.color}`,
          }}
          animate={{
            y: [0, -100, -50, -150, 0],
            x: [0, 30, -20, 50, 0],
            opacity: [0.3, 0.7, 0.5, 0.8, 0.3],
            scale: [1, 1.5, 1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Cyber grid background
function CyberGrid({ animated = true, opacity = 0.03 }) {
  return (
    <div
      className={`absolute inset-0 ${animated ? 'cyber-grid-animated' : ''}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 255, 255, ${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, ${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
      }}
    />
  );
}

// Gradient orbs
function GradientOrbs() {
  return (
    <>
      {/* Cyan orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
          top: '-10%',
          right: '-10%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Pink orb */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(255, 0, 255, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
          bottom: '10%',
          left: '-5%',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Purple orb */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(191, 0, 255, 0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
          top: '40%',
          left: '30%',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </>
  );
}

// Scanlines effect
function Scanlines({ opacity = 0.03 }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          rgba(0, 0, 0, ${opacity}) 0px,
          rgba(0, 0, 0, ${opacity}) 1px,
          transparent 1px,
          transparent 2px
        )`,
      }}
    />
  );
}

// Main CyberBackground component
export default function CyberBackground({
  children,
  variant = 'full', // full, minimal, particles-only, grid-only
  className = '',
  particleCount = 15,
  showGrid = true,
  showParticles = true,
  showOrbs = true,
  showScanlines = false,
  gridAnimated = true,
  gridOpacity = 0.03,
}) {
  const variants = {
    full: { showGrid: true, showParticles: true, showOrbs: true, showScanlines: true },
    minimal: { showGrid: true, showParticles: false, showOrbs: true, showScanlines: false },
    'particles-only': { showGrid: false, showParticles: true, showOrbs: false, showScanlines: false },
    'grid-only': { showGrid: true, showParticles: false, showOrbs: false, showScanlines: false },
  };

  const config = variant === 'full' || variant === 'minimal' || variant === 'particles-only' || variant === 'grid-only'
    ? variants[variant]
    : { showGrid, showParticles, showOrbs, showScanlines };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background elements */}
      {config.showGrid && <CyberGrid animated={gridAnimated} opacity={gridOpacity} />}
      {config.showOrbs && <GradientOrbs />}
      {config.showParticles && <FloatingParticles count={particleCount} />}
      {config.showScanlines && <Scanlines />}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Export individual components for custom compositions
export { FloatingParticles, CyberGrid, GradientOrbs, Scanlines };
