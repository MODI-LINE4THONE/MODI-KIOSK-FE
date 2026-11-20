export const kioskGuidanceMessages = Object.freeze({
  addToCart: '장바구니에 담으려면 눌러 주세요',
  savePersonalOptions: '옵션을 다 고르셨으면 눌러 주세요',
  submitOrder: '다 고르셨으면 눌러 주세요',
})

export const kioskTouchGuidanceConfig = Object.freeze({
  designWidth: 1080,
  targetSelector: "[data-guide]:not([data-guide='false'])",
  targetClass: 'touch-guidance-target',
  labelAttribute: 'data-guide-label',
  defaultLabel: '여기를 눌러 주세요',
})
