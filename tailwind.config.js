/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00FFFF',
          pink: '#FF00FF',
          purple: '#BF00FF',
          blue: '#00D4FF',
          green: '#00FF88',
          yellow: '#FFFF00',
          orange: '#FF6600',
        },
        cyber: {
          dark: '#0a0a0a',
          darker: '#050508',
          card: '#1a1a2e',
          surface: '#141420',
          border: '#2a2a4e',
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)',
        'neon-cyan-sm': '0 0 10px rgba(0, 255, 255, 0.4), 0 0 20px rgba(0, 255, 255, 0.2)',
        'neon-pink': '0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.3)',
        'neon-pink-sm': '0 0 10px rgba(255, 0, 255, 0.4), 0 0 20px rgba(255, 0, 255, 0.2)',
        'neon-purple': '0 0 20px rgba(191, 0, 255, 0.5), 0 0 40px rgba(191, 0, 255, 0.3)',
        'neon-glow': '0 0 30px rgba(0, 255, 255, 0.4), 0 0 60px rgba(255, 0, 255, 0.2)',
        'neon-glow-lg': '0 0 40px rgba(0, 255, 255, 0.5), 0 0 80px rgba(255, 0, 255, 0.3), 0 0 120px rgba(191, 0, 255, 0.2)',
        'cyber-card': '0 4px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.05)',
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #00FFFF 0%, #FF00FF 50%, #BF00FF 100%)',
        'gradient-neon-pink': 'linear-gradient(135deg, #FF00FF 0%, #FF6B9D 100%)',
        'gradient-neon-blue': 'linear-gradient(135deg, #00D4FF 0%, #00FFFF 100%)',
        'gradient-aurora': 'linear-gradient(135deg, #00FFFF 0%, #BF00FF 25%, #FF00FF 50%, #00FF88 75%, #00D4FF 100%)',
        'gradient-cyber-dark': 'linear-gradient(180deg, #0a0a0a 0%, #141420 50%, #0a0a0a 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'neon-flicker': 'neonFlicker 3s ease-in-out infinite',
        'cyber-scan': 'cyberScan 3s linear infinite',
        'float-glow': 'floatGlow 4s ease-in-out infinite',
        'gradient-flow': 'gradientFlow 8s ease infinite',
        'glitch': 'glitch 5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'border-dance': 'borderDance 4s ease infinite',
        'particle-float': 'particleFloat 10s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        neonPulse: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)',
            borderColor: 'rgba(0, 255, 255, 0.5)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(0, 255, 255, 0.8), 0 0 80px rgba(255, 0, 255, 0.4)',
            borderColor: 'rgba(255, 0, 255, 0.7)',
          },
        },
        neonFlicker: {
          '0%, 18%, 22%, 25%, 53%, 57%, 100%': {
            opacity: '1',
            textShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF',
          },
          '20%, 24%, 55%': {
            opacity: '0.8',
            textShadow: '0 0 5px #00FFFF, 0 0 10px #00FFFF',
          },
        },
        cyberScan: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        floatGlow: {
          '0%, 100%': {
            transform: 'translateY(0)',
            filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))',
          },
          '50%': {
            transform: 'translateY(-20px)',
            filter: 'drop-shadow(0 0 40px rgba(255, 0, 255, 0.7))',
          },
        },
        gradientFlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glitch: {
          '0%, 90%, 100%': { transform: 'translate(0)' },
          '91%': { transform: 'translate(-2px, 2px)' },
          '92%': { transform: 'translate(2px, -2px)' },
          '93%': { transform: 'translate(-2px, -2px)' },
          '94%': { transform: 'translate(2px, 2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        borderDance: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translate(0, 0)', opacity: '0.3' },
          '50%': { transform: 'translate(50px, -50px)', opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};
