const DEFAULT_INTERACTIVE_SELECTOR =
  'button, a, input, select, textarea, label, summary, [role="button"]'

function distanceToRect(x, y, rect) {
  const dx = Math.max(rect.left - x, 0, x - rect.right)
  const dy = Math.max(rect.top - y, 0, y - rect.bottom)
  return Math.hypot(dx, dy)
}

function isVisible(target, rect) {
  if (rect.width === 0 || rect.height === 0) return false
  const hit = target.ownerDocument.elementFromPoint(
    rect.left + rect.width / 2,
    rect.top + rect.height / 2,
  )
  return Boolean(hit) && (hit === target || target.contains(hit))
}

function createCandidateSelector(defaultSelector, rules) {
  return [defaultSelector, ...rules.map(({ selector }) => selector)].filter(Boolean).join(', ')
}

/**
 * DOM 기반 터치 보정 엔진을 만든다.
 * UI 프레임워크나 접근성 프로필을 알지 못하며, 모든 제품별 차이는 config로 받는다.
 */
export function createTouchAssist(config) {
  const {
    designWidth,
    moveTolerance,
    defaultRadius,
    smallTargetSize,
    rules = [],
    defaultCandidateSelector = 'button:not(:disabled)',
    interactiveSelector = DEFAULT_INTERACTIVE_SELECTOR,
    scopeSelector,
  } = config
  const candidateSelector = createCandidateSelector(defaultCandidateSelector, rules)

  function getScale(frame) {
    return frame.getBoundingClientRect().width / designWidth
  }

  function getRadius(target, rect, scale) {
    if (target.matches(':disabled, [aria-disabled="true"]')) return 0
    const rule = rules.find(({ selector }) => target.matches(selector))
    if (rule) return rule.radius
    return Math.min(rect.width, rect.height) < smallTargetSize * scale ? defaultRadius : 0
  }

  function findTarget(root, x, y, scale) {
    let nearest = null
    let bestDistance = Infinity

    for (const target of root.querySelectorAll(candidateSelector)) {
      const rect = target.getBoundingClientRect()
      const radius = getRadius(target, rect, scale) * scale
      const distance = distanceToRect(x, y, rect)
      if (
        radius > 0 &&
        distance <= radius &&
        distance < bestDistance &&
        isVisible(target, rect)
      ) {
        nearest = target
        bestDistance = distance
      }
    }
    return nearest
  }

  function attach(frame) {
    let start = null

    function onPointerDown(event) {
      start = { x: event.clientX, y: event.clientY, id: event.pointerId }
    }

    function onPointerUp(event) {
      if (!start || start.id !== event.pointerId) return
      const scale = getScale(frame)
      const moved = Math.hypot(event.clientX - start.x, event.clientY - start.y)
      start = null
      if (moved > moveTolerance * scale) return
      if (event.target.closest(interactiveSelector)) return

      const root = (scopeSelector && frame.querySelector(scopeSelector)) || frame
      findTarget(root, event.clientX, event.clientY, scale)?.click()
    }

    frame.addEventListener('pointerdown', onPointerDown)
    frame.addEventListener('pointerup', onPointerUp)
    return () => {
      frame.removeEventListener('pointerdown', onPointerDown)
      frame.removeEventListener('pointerup', onPointerUp)
    }
  }

  return { attach, findTarget, getScale }
}
