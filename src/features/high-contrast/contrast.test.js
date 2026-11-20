import test from 'node:test'
import assert from 'node:assert/strict'
import { ensureContrast, getContrastRatio, meetsContrast } from './contrast.js'
import { highContrastPalette, highContrastValidation } from '../../pages/kiosk/highContrastTheme.js'

const closeTo = (actual, expected, tolerance = 0.01) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} was not within ${tolerance} of ${expected}`)
}

test('identical colors have a 1:1 contrast ratio', () => {
  assert.equal(getContrastRatio('#123456', '#123456'), 1)
})

test('black and white have a 21:1 contrast ratio', () => {
  assert.equal(getContrastRatio('#000', '#fff'), 21)
})

test('meetsContrast accepts passing colors and rejects failing colors', () => {
  assert.equal(meetsContrast('#000000', '#ffffff'), true)
  assert.equal(meetsContrast('#777777', '#ffffff'), false)
})

test('ensureContrast minimally adjusts a failing foreground until it passes', () => {
  const adjusted = ensureContrast('#777777', '#ffffff')
  assert.notEqual(adjusted.toLowerCase(), '#777777')
  assert.equal(meetsContrast(adjusted, '#ffffff'), true)
})

test('ensureContrast preserves a foreground that already passes', () => {
  assert.equal(ensureContrast('#FFEE00', '#191F28'), '#FFEE00')
})

test('MODI palette and representative contrast ratios remain unchanged', () => {
  assert.deepEqual(highContrastPalette, {
    canvas: '#191f28',
    content: '#ffffff',
    action: '#ffee00',
    selected: '#00e1ff',
  })
  closeTo(highContrastValidation.actionOnCanvas, 13.79)
  closeTo(highContrastValidation.selectedOnCanvas, 10.42)
  closeTo(highContrastValidation.contentOnCanvas, 16.56)
})

test('supports short HEX and threshold boundary values', () => {
  assert.equal(getContrastRatio('#000', '#FFF'), 21)
  assert.equal(meetsContrast('#123456', '#123456', 1), true)
  assert.equal(meetsContrast('#000000', '#ffffff', 21), true)
})

test('rejects unsupported colors and invalid minimum ratios', () => {
  assert.throws(() => getContrastRatio('black', '#ffffff'), TypeError)
  assert.throws(() => getContrastRatio('#00000080', '#ffffff'), TypeError)
  assert.throws(() => meetsContrast('#000000', '#ffffff', Number.NaN), TypeError)
  assert.throws(() => meetsContrast('#000000', '#ffffff', 0.99), RangeError)
  assert.throws(() => ensureContrast('#777777', '#777777', 7), RangeError)
  assert.throws(() => ensureContrast('#000000', '#ffffff', 21.01), RangeError)
})

