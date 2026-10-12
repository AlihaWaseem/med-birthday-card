/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        med: {
          dark: '#030712',
          card: '#0B132B',
          teal: '#00F0FF',
          emerald: '#10B981',
          crimson: '#FF2A6D',
          amber: '#F59E0B',
          cyan: '#06B6D4',
          slate: '#1E293B',
          glow: 'rgba(0, 240, 255, 0.15)',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'code-blue': 'codeBlueFlash 0.6s ease-in-out infinite alternate',
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.9))' }
        },
        codeBlueFlash: {
          '0%': { backgroundColor: 'rgba(239, 68, 68, 0.05)' },
          '100%': { backgroundColor: 'rgba(239, 68, 68, 0.28)' }
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      }
    },
  },
  plugins: [],
}
