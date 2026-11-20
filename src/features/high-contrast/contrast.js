const HEX_COLOR = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i
const MIN_CONTRAST_RATIO = 1
const MAX_CONTRAST_RATIO = 21

function parseHexColor(color) {
  if (typeof color !== 'string' || !HEX_COLOR.test(color)) {
    throw new TypeError(`Expected an opaque HEX color (#RGB or #RRGGBB), received: ${String(color)}`)
  }

  const value = color.slice(1)
  const expanded = value.length === 3
    ? value.split('').map((channel) => channel.repeat(2)).join('')
    : value

  return {
    red: Number.parseInt(expanded.slice(0, 2), 16),
    green: Number.parseInt(expanded.slice(2, 4), 16),
    blue: Number.parseInt(expanded.slice(4, 6), 16),
  }
}

function validateMinimumRatio(minimumRatio) {
  if (!Number.isFinite(minimumRatio)) {
    throw new TypeError('minimumRatio must be a finite number')
  }
  if (minimumRatio < MIN_CONTRAST_RATIO || minimumRatio > MAX_CONTRAST_RATIO) {
    throw new RangeError(`minimumRatio must be between ${MIN_CONTRAST_RATIO} and ${MAX_CONTRAST_RATIO}`)
  }
}

function linearize(channel) {
  const value = channel / 255
  return value <= 0.04045
    ? value / 12.92
    : ((value + 0.055) / 1.055) ** 2.4
}

function getRelativeLuminance(color) {
  const { red, green, blue } = parseHexColor(color)
  return 0.2126 * linearize(red) + 0.7152 * linearize(green) + 0.0722 * linearize(blue)
}

function toHex({ red, green, blue }) {
  const channel = (value) => Math.round(value).toString(16).padStart(2, '0')
  return `#${channel(red)}${channel(green)}${channel(blue)}`.toUpperCase()
}

function mixToward(color, endpoint, step) {
  const amount = step / 255
  return {
    red: Math.round(color.red + (endpoint.red - color.red) * amount),
    green: Math.round(color.green + (endpoint.green - color.green) * amount),
    blue: Math.round(color.blue + (endpoint.blue - color.blue) * amount),
  }
}

function colorDistanceSquared(first, second) {
  return (first.red - second.red) ** 2
    + (first.green - second.green) ** 2
    + (first.blue - second.blue) ** 2
}

/** Calculate the WCAG contrast ratio for two opaque HEX colors. */
export function getContrastRatio(foreground, background) {
  const foregroundLuminance = getRelativeLuminance(foreground)
  const backgroundLuminance = getRelativeLuminance(background)
  const lighter = Math.max(foregroundLuminance, backgroundLuminance)
  const darker = Math.min(foregroundLuminance, backgroundLuminance)
  return (lighter + 0.05) / (darker + 0.05)
}

/** Check whether two opaque HEX colors meet a requested WCAG contrast ratio. */
export function meetsContrast(foreground, background, minimumRatio = 4.5) {
  validateMinimumRatio(minimumRatio)
  return getContrastRatio(foreground, background) >= minimumRatio
}

function findCandidate(foreground, background, endpoint, minimumRatio) {
  const endpointHex = toHex(endpoint)
  if (!meetsContrast(endpointHex, background, minimumRatio)) return null

  let low = 1
  let high = 255
  while (low < high) {
    const middle = Math.floor((low + high) / 2)
    const candidate = toHex(mixToward(foreground, endpoint, middle))
    if (meetsContrast(candidate, background, minimumRatio)) high = middle
    else low = middle + 1
  }

  const color = mixToward(foreground, endpoint, low)
  return {
    color: toHex(color),
    distance: colorDistanceSquared(foreground, color),
  }
}

/**
 * Return the original foreground when it already passes. Otherwise, find the
 * smallest sRGB change along the original-to-black or original-to-white paths.
 * Throws when the requested ratio cannot be reached with an opaque sRGB color.
 */
export function ensureContrast(foreground, background, minimumRatio = 4.5) {
  validateMinimumRatio(minimumRatio)
  const foregroundColor = parseHexColor(foreground)
  parseHexColor(background)

  if (meetsContrast(foreground, background, minimumRatio)) return foreground

  const candidates = [
    findCandidate(foregroundColor, background, { red: 0, green: 0, blue: 0 }, minimumRatio),
    findCandidate(foregroundColor, background, { red: 255, green: 255, blue: 255 }, minimumRatio),
  ].filter(Boolean)

  if (candidates.length === 0) {
    throw new RangeError(`No opaque sRGB foreground can reach a ${minimumRatio}:1 contrast ratio on ${background}`)
  }

  candidates.sort((first, second) => first.distance - second.distance)
  return candidates[0].color
}

