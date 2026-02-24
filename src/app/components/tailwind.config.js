/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. DEFINIR LA ANIMACIÓN (Esto es lo que faltaba)
      animation: {
        'siren-red': 'siren-pulse-red 0.8s infinite alternate',
        'siren-blue': 'siren-pulse-blue 0.8s infinite alternate 0.4s',
      },
      // 2. DEFINIR LOS PASOS (Esto ya lo tenías avanzado)
      keyframes: {
        'siren-pulse-red': {
          '0%': { opacity: '0.4', filter: 'blur(30px) brightness(1)', transform: 'scale(0.9)' },
          '100%': { opacity: '1', filter: 'blur(60px) brightness(1.8)', transform: 'scale(1.1)' },
        },
        'siren-pulse-blue': {
          '0%': { opacity: '0.4', filter: 'blur(30px) brightness(1)', transform: 'scale(0.9)' },
          '100%': { opacity: '1', filter: 'blur(60px) brightness(1.8)', transform: 'scale(1.1)' },
        }
      },
    },
  },
  plugins: [],
}