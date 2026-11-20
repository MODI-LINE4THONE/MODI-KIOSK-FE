
import { useEffect, useRef } from 'react';

const UID_PATTERN = /^[0-9a-f]{14}$/i;
const KEY_TIMEOUT = 100;
const DUPLICATE_TIMEOUT = 1500;

// 물리 키 위치를 기준으로 영문 변환
function getNfcCharacter(event) {
  if (/^Key[A-F]$/.test(event.code)) {
    return event.code.slice(3).toLowerCase();
  }

  if (/^Digit[0-9]$/.test(event.code)) {
    return event.code.slice(5);
  }

  if (/^Numpad[0-9]$/.test(event.code)) {
    return event.code.slice(6);
  }

  return null;
}

export function useNfcInput({
  onTagScanned,
  enabled = true
}) {
  const bufferRef = useRef('');
  const lastKeyTimeRef = useRef(0);

  const lastScanRef = useRef({
    uid: '',
    time: 0
  });

  const callbackRef = useRef(onTagScanned);

  // 최신 콜백 유지
  useEffect(() => {
    callbackRef.current = onTagScanned;
  }, [onTagScanned]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      const now = Date.now();

      // 입력 간격이 100ms를 초과하면 초기화
      if (now - lastKeyTimeRef.current > KEY_TIMEOUT) {
        bufferRef.current = '';
      }

      lastKeyTimeRef.current = now;

      // Enter 입력 시 UID 처리
      if (event.key === 'Enter') {
        const uid = bufferRef.current.trim().toLowerCase();
        bufferRef.current = '';

        if (!UID_PATTERN.test(uid)) return;

        // 중복 태그 방지
        const lastScan = lastScanRef.current;

        if (
          lastScan.uid === uid &&
          now - lastScan.time < DUPLICATE_TIMEOUT
        ) {
          return;
        }

        lastScanRef.current = {
          uid,
          time: now
        };

        console.log('[NFC] UID 인식:', uid);

        callbackRef.current?.(uid);
        return;
      }

      // 한글/영문 입력 상태와 관계없이 UID 수집
      const char = getNfcCharacter(event);

      if (char !== null && !event.repeat) {
        bufferRef.current += char;

        if (bufferRef.current.length > 14) {
          bufferRef.current = '';
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled]);
}
