/* =========================================================
   PICGELATO — CONFIGURACIÓN DE TAILWIND
   ========================================================= */

window.tailwind = window.tailwind || {};\nwindow.tailwind.config = {
    theme: {
      extend: {
        colors: {
          lime: '#c6f000',
          orange: '#ff9500',
          yellow: '#ffd600',
          black: '#0b0b0b',
          purple: '#25105e',
          red: '#e53b2e',
          darkBg: '#08080a',
          darkCard: '#121217',
        },
        fontFamily: {
          anton: ['Anton', 'sans-serif'],
          poppins: ['Poppins', 'sans-serif'],
        },
        boxShadow: {
          'neo-lime': '5px 5px 0px 0px #c6f000',
          'neo-orange': '5px 5px 0px 0px #ff9500',
          'neo-yellow': '5px 5px 0px 0px #ffd600',
          'neo-white': '5px 5px 0px 0px #ffffff',
          'neo-lg-lime': '8px 8px 0px 0px #c6f000',
          'neo-lg-orange': '8px 8px 0px 0px #ff9500',
        }
      }
    }
  }
