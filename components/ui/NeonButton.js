import { motion } from 'framer-motion';

export default function NeonButton({
  children,
  variant = 'cyan', // cyan, pink, purple, gradient
  size = 'md', // sm, md, lg
  href,
  onClick,
  className = '',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  ...props
}) {
  const baseStyles = `
    relative overflow-hidden font-medium transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    inline-flex items-center justify-center gap-2
  `;

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  const variantStyles = {
    cyan: `
      border-2 border-neon-cyan text-neon-cyan bg-transparent
      shadow-neon-cyan-sm hover:bg-neon-cyan hover:text-cyber-dark
      hover:shadow-neon-cyan
    `,
    pink: `
      border-2 border-neon-pink text-neon-pink bg-transparent
      shadow-neon-pink-sm hover:bg-neon-pink hover:text-cyber-dark
      hover:shadow-neon-pink
    `,
    purple: `
      border-2 border-neon-purple text-neon-purple bg-transparent
      shadow-neon-purple hover:bg-neon-purple hover:text-cyber-dark
    `,
    gradient: `
      border-2 border-transparent text-white
      bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple
      bg-[length:200%_200%] animate-gradient-flow
      hover:shadow-neon-glow
    `,
    outline: `
      border border-white/20 text-white bg-transparent
      hover:border-neon-cyan hover:text-neon-cyan hover:shadow-neon-cyan-sm
    `,
    ghost: `
      border-none text-gray-400 bg-transparent
      hover:text-neon-cyan hover:bg-white/5
    `,
  };

  const buttonContent = (
    <>
      {/* Sweep effect */}
      <span className="absolute inset-0 overflow-hidden">
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700" />
      </span>

      {/* Loading spinner */}
      {loading && (
        <span className="neon-spinner w-4 h-4 border-2" />
      )}

      {/* Icon left */}
      {icon && iconPosition === 'left' && !loading && (
        <span className="flex-shrink-0">{icon}</span>
      )}

      {/* Button text */}
      <span className="relative z-10">{children}</span>

      {/* Icon right */}
      {icon && iconPosition === 'right' && !loading && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </>
  );

  const combinedClassName = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
    group
  `.trim();

  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedClassName}
        whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        {...props}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedClassName}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
}
