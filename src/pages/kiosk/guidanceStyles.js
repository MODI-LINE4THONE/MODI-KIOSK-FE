import { css } from 'styled-components'

export const guidanceStyles = css`
  &&&[data-guidance='true'] {
    --guide-color: var(--guide-surface, #1747d6);
    --guide-text: var(--guide-content, #fff);
    --guide-tail: calc(22 * var(--u));
    --guide-font: calc(42 * var(--u));
    --guide-pad-y: calc(18 * var(--u));
    --guide-pad-x: calc(34 * var(--u));
    --guide-gap: calc(6 * var(--u));

    .touch-guidance-target { z-index: 2; overflow: visible; }
    .touch-guidance-target:not(.payment-grid button, .card-instructions) { position: relative; }

    .touch-guidance-target::before,
    .touch-guidance-target::after {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
    }
    .touch-guidance-target::before {
      content: attr(data-guide-label);
      width: max-content;
      justify-self: start;
      bottom: calc(100% + var(--guide-tail) + var(--guide-gap));
      padding: var(--guide-pad-y) var(--guide-pad-x);
      border-radius: calc(50 * var(--u));
      background: var(--guide-color);
      color: var(--guide-text);
      font-size: var(--guide-font);
      font-weight: var(--guide-font-weight, 600);
      line-height: 1.2;
      white-space: nowrap;
      box-shadow: var(--guide-shadow, 0 calc(6 * var(--u)) calc(18 * var(--u)) #0000004d);
    }
    .touch-guidance-target::after {
      content: '';
      bottom: calc(100% + var(--guide-gap));
      border: var(--guide-tail) solid transparent;
      border-bottom: 0;
      border-top-color: var(--guide-color);
      background: none;
    }

    .order-bar .touch-guidance-target::before,
    .start-actions .touch-guidance-target:last-child:not(:first-child)::before,
    .detail-actions .touch-guidance-target:last-child:not(:first-child)::before {
      left: auto;
      right: calc(12 * var(--u));
      transform: none;
    }
    .order-bar .touch-guidance-target::before { right: calc(80 * var(--u)); }
    .detail-actions .touch-guidance-target:first-child:not(:only-child)::before,
    .start-actions .touch-guidance-target:first-child::before {
      left: calc(12 * var(--u));
      transform: none;
    }

    .dessert-screen .more-menu {
      top: calc(1478 * 100cqw / 1080);
      height: calc(76 * 100cqw / 1080);
    }

    .start-actions .touch-guidance-target {
      --guide-gap: calc(6.85cqw + 6 * var(--u));
      --guide-tail-drop: 3cqw;
    }
    .start-actions .touch-guidance-target::after {
      bottom: calc(100% + var(--guide-gap) - var(--guide-tail-drop));
      border-top-width: calc(var(--guide-tail) + var(--guide-tail-drop));
    }

    .touch-guidance-target[data-guide-place='inside'] { --guide-top: calc(16 * var(--u)); }
    .card-instructions.touch-guidance-target { --guide-top: calc(440 * var(--u)); }
    .complete-message .order-warning { inset-block-start: calc(1262 * var(--u)); }
    .detail-fields .personal-options { bottom: calc(32 * var(--u)); }
    .review-screen .review-cart { height: calc(636 * var(--u)); }
    .review-screen .snack-suggestions { top: calc(905 * var(--u)); }
    .review-screen .review-total { top: calc(1262 * var(--u)); }

    .touch-guidance-target[data-guide-place='inside']::before {
      bottom: auto;
      top: var(--guide-top);
    }
    .touch-guidance-target[data-guide-place='inside']::after {
      bottom: auto;
      top: calc(var(--guide-top) + var(--guide-font) * 1.2 + 2 * var(--guide-pad-y));
    }
  }
`
