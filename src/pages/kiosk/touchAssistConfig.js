/* MODI 키오스크 전용 터치 대상과 1080×1920 디자인 기준 거리 */
export const kioskTouchAssistConfig = Object.freeze({
  designWidth: 1080,
  moveTolerance: 12,
  defaultRadius: 60,
  smallTargetSize: 80,
  defaultCandidateSelector: 'button:not(:disabled)',
  interactiveSelector:
    'button, a, input, select, textarea, label, summary, [role="button"]',
  scopeSelector: 'dialog[open]',
  rules: Object.freeze([
    { selector: '.quantity button, .dessert-quantity button', radius: 110 },
    { selector: '.personal-options', radius: 150 },
    {
      selector:
        '.detail-fields fieldset button, .personal-heading button, .personal-choices button, .bubble-choice',
      radius: 50,
    },
  ]),
})
