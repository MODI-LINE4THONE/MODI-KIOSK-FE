const DEFAULTS = Object.freeze({
  targetSelector: "[data-guide]:not([data-guide='false'])",
  targetClass: 'touch-guidance-target',
  labelAttribute: 'data-guide-label',
  defaultLabel: '여기를 눌러 주세요',
})

export function createTouchGuidance(options = {}) {
  const config = { ...DEFAULTS, ...options }

  return {
    attach(root) {
      if (!(root instanceof HTMLElement)) return () => {}
      const activeTargets = new Set()
      const suppliedLabels = new Set()
      let animationFrame = 0

      function sync() {
        animationFrame = 0
        const targets = new Set(root.querySelectorAll(config.targetSelector))

        for (const target of activeTargets) {
          if (!targets.has(target)) {
            target.classList.remove(config.targetClass)
            if (suppliedLabels.delete(target)) target.removeAttribute(config.labelAttribute)
            activeTargets.delete(target)
          }
        }

        for (const target of targets) {
          target.classList.add(config.targetClass)
          if (!target.hasAttribute(config.labelAttribute)) {
            target.setAttribute(config.labelAttribute, config.defaultLabel)
            suppliedLabels.add(target)
          }
          activeTargets.add(target)
        }
      }

      function schedule() {
        if (!animationFrame) animationFrame = window.requestAnimationFrame(sync)
      }

      const mutationObserver = new MutationObserver(schedule)
      mutationObserver.observe(root, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-guide', 'data-guide-label', 'disabled', 'aria-disabled', 'hidden', 'class', 'open'],
      })
      root.addEventListener('click', schedule, true)
      schedule()

      return () => {
        window.cancelAnimationFrame(animationFrame)
        root.removeEventListener('click', schedule, true)
        mutationObserver.disconnect()
        for (const target of activeTargets) {
          target.classList.remove(config.targetClass)
          if (suppliedLabels.has(target)) target.removeAttribute(config.labelAttribute)
        }
        activeTargets.clear()
        suppliedLabels.clear()
      }
    },
  }
}
