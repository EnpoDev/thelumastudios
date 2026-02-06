import { motion } from 'framer-motion';

export default function GlowText({
  children,
  as = 'span',
  variant = 'gradient', // gradient, cyan, pink, purple, flicker
  size = 'inherit', // inherit, sm, md, lg, xl, 2xl, 3xl, 4xl
  weight = 'bold',
  animate = true,
  glitch = false,
  className = '',
  ...props
}) {
  const Tag = motion[as] || motion.span;

  const sizeStyles = {
    inherit: '',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl md:text-4xl',
    '4xl': 'text-4xl md:text-5xl lg:text-6xl',
    '5xl': 'text-5xl md:text-6xl lg:text-7xl',
  };

  const weightStyles = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black',
  };

  const variantStyles = {
    gradient: `
      bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple
      bg-clip-text text-transparent
      bg-[length:200%_200%]
    `,
    cyan: 'text-neon-cyan',
    pink: 'text-neon-pink',
    purple: 'text-neon-purple',
    green: 'text-neon-green',
    white: 'text-white',
  };

  const glowStyles = {
    gradient: '', // Gradient doesn't have text-shadow
    cyan: 'drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] drop-shadow-[0_0_20px_rgba(0,255,255,0.3)]',
    pink: 'drop-shadow-[0_0_10px_rgba(255,0,255,0.5)] drop-shadow-[0_0_20px_rgba(255,0,255,0.3)]',
    purple: 'drop-shadow-[0_0_10px_rgba(191,0,255,0.5)] drop-shadow-[0_0_20px_rgba(191,0,255,0.3)]',
    green: 'drop-shadow-[0_0_10px_rgba(0,255,136,0.5)] drop-shadow-[0_0_20px_rgba(0,255,136,0.3)]',
    white: 'drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]',
  };

  const animationProps = animate && variant === 'gradient' ? {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    },
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'linear',
    },
  } : {};

  const glitchAnimation = glitch ? {
    whileHover: {
      x: [0, -2, 2, -2, 2, 0],
      transition: { duration: 0.3 },
    },
  } : {};

  return (
    <Tag
      className={`
        ${sizeStyles[size]}
        ${weightStyles[weight]}
        ${variantStyles[variant]}
        ${glowStyles[variant]}
        ${className}
      `.trim()}
      {...animationProps}
      {...glitchAnimation}
      {...props}
    >
      {children}
    </Tag>
  );
}

// Preset components for common use cases
export function GradientHeading({ children, level = 1, className = '', ...props }) {
  const sizes = {
    1: '5xl',
    2: '4xl',
    3: '3xl',
    4: '2xl',
    5: 'xl',
    6: 'lg',
  };

  return (
    <GlowText
      as={`h${level}`}
      variant="gradient"
      size={sizes[level]}
      weight="bold"
      className={className}
      {...props}
    >
      {children}
    </GlowText>
  );
}

export function NeonHeading({ children, color = 'cyan', level = 1, className = '', ...props }) {
  const sizes = {
    1: '5xl',
    2: '4xl',
    3: '3xl',
    4: '2xl',
    5: 'xl',
    6: 'lg',
  };

  return (
    <GlowText
      as={`h${level}`}
      variant={color}
      size={sizes[level]}
      weight="bold"
      className={className}
      {...props}
    >
      {children}
    </GlowText>
  );
}
