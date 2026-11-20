export const accessibilityOptions = [
  ['contrast', '색상 고대비'],
  ['guidance', '터치 위치 안내'],
  ['large', '큰 글씨'],
  ['reach', '화면 하단 조작'],
  ['touch', '터치 입력 보정'],
]

export const defaultProfile = Object.fromEntries(
  accessibilityOptions.map(([key]) => [key, false]),
)
