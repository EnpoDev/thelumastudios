import { motion } from 'framer-motion';

export default function NeonCard({
  children,
  variant = 'default', // default, animated, glass
  accent = 'cyan', // cyan, pink, purple, gradient
  hover = true,
  className = '',
  onClick,
  ...props
}) {
  const baseStyles = `
    relative overflow-hidden rounded-xl
    transition-all duration-400
  `;

  const variantStyles = {
    default: `
      bg-cyber-card/80 backdrop-blur-sm
      border border-white/5
    `,
    animated: `
      bg-cyber-card
    `,
    glass: `
      bg-white/5 backdrop-blur-xl
      border border-white/10
    `,
    solid: `
      bg-cyber-surface
      border border-cyber-border
    `,
  };

  const accentColors = {
    cyan: {
      border: 'rgba(0, 255, 255, 0.3)',
      glow: 'rgba(0, 255, 255, 0.15)',
      line: '#00FFFF',
    },
    pink: {
      border: 'rgba(255, 0, 255, 0.3)',
      glow: 'rgba(255, 0, 255, 0.15)',
      line: '#FF00FF',
    },
    purple: {
      border: 'rgba(191, 0, 255, 0.3)',
      glow: 'rgba(191, 0, 255, 0.15)',
      line: '#BF00FF',
    },
    gradient: {
      border: 'transparent',
      glow: 'rgba(0, 255, 255, 0.1)',
      line: 'linear-gradient(90deg, #00FFFF, #FF00FF, #BF00FF)',
    },
  };

  const colors = accentColors[accent];

  return (
    <motion.div
      className={`${baseStyles} ${variantStyles[variant]} ${className} group`}
      onClick={onClick}
      whileHover={hover ? { y: -8, scale: 1.01 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        cursor: onClick ? 'pointer' : 'default',
      }}
      {...props}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: accent === 'gradient'
            ? 'linear-gradient(90deg, transparent, #00FFFF, #FF00FF, #BF00FF, transparent)'
            : `linear-gradient(90deg, transparent, ${colors.line}, transparent)`,
        }}
      />

      {/* Animated border for 'animated' variant */}
      {variant === 'animated' && (
        <div
          className="absolute inset-[-2px] rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          style={{
            background: 'linear-gradient(135deg, #00FFFF 0%, #FF00FF 50%, #BF00FF 100%)',
            backgroundSize: '300% 300%',
            animation: 'borderDance 4s ease infinite',
          }}
        />
      )}

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `
            0 10px 40px rgba(0, 0, 0, 0.5),
            0 0 30px ${colors.glow},
            inset 0 0 30px ${colors.glow}
          `,
        }}
      />

      {/* Border color change on hover */}
      <div
        className="absolute inset-0 rounded-xl border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ borderColor: colors.border }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
