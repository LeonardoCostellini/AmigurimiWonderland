// ==================== VISUAL ENHANCEMENTS ONLY ====================
// This file never touches cart, product, auth, or API logic.
// It only adds classes that control purely visual transitions.

document.body.classList.add('js-ready')

// Navbar: solidify with glass/ink background once the page scrolls
const __header = document.getElementById('header')
function __onScroll() {
  if (!__header) return
  if (window.scrollY > 60) __header.classList.add('scrolled')
  else __header.classList.remove('scrolled')
}
window.addEventListener('scroll', __onScroll, { passive: true })
__onScroll()

// Scroll reveal for elements marked [data-reveal]
const __revealTargets = document.querySelectorAll('[data-reveal]')
if ('IntersectionObserver' in window && __revealTargets.length) {
  const __io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
        __io.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' })

  __revealTargets.forEach(el => __io.observe(el))
} else {
  __revealTargets.forEach(el => el.classList.add('in-view'))
}

// Re-run reveal check for product cards injected after fetch (script.js
// builds them dynamically). We watch the grid and observe new cards.
const __grid = document.getElementById('productsGrid')
if (__grid && 'MutationObserver' in window) {
  const __gridObserver = new MutationObserver(() => {
    __grid.querySelectorAll('.product-card:not(.__seen)').forEach((card, i) => {
      card.classList.add('__seen')
      card.style.animation = `fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) ${Math.min(i * 0.05, 0.4)}s both`
    })
  })
  __gridObserver.observe(__grid, { childList: true })
}
