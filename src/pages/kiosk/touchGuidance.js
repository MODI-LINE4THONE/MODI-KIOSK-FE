import { useEffect } from 'react'
import { createTouchGuidance } from '../../features/touch-guidance/createTouchGuidance.js'
import { kioskTouchGuidanceConfig } from './touchGuidanceConfig.js'

const kioskTouchGuidance = createTouchGuidance(kioskTouchGuidanceConfig)

export function useTouchGuidance(frameRef, enabled) {
  useEffect(() => {
    if (!enabled || !frameRef.current) return undefined
    return kioskTouchGuidance.attach(frameRef.current)
  }, [enabled, frameRef])
}
