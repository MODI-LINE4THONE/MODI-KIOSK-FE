import { useEffect } from 'react'
import { createTouchAssist } from '../../features/touch-assist/createTouchAssist.js'
import { kioskTouchAssistConfig } from './touchAssistConfig.js'

const kioskTouchAssist = createTouchAssist(kioskTouchAssistConfig)

export const findAssistTarget = kioskTouchAssist.findTarget

export function useTouchAssist(frameRef, enabled) {
  useEffect(() => {
    const frame = frameRef.current
    if (!enabled || !frame) return undefined
    return kioskTouchAssist.attach(frame)
  }, [frameRef, enabled])
}
