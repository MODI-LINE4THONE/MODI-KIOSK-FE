import { css } from "styled-components";

export const lowerControlsStyles = css`
  &&&&[data-reach="true"]:is(
      [data-screen="menu"],
      [data-screen="payment"],
      [data-screen="complete"]:not([data-large="true"])
    ) {
    --lower-columns: 3;
    --lower-card-width: 180;
    --lower-card-height: 236;
    --lower-card-font: 26;
    --lower-toolbar-height: calc(82 * var(--u));

    .lower-controls-guide {
      flex: 0 0 calc(795 * var(--u) - var(--lower-toolbar-height));
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: calc(34 * var(--u));
      background: #000;
      color: #fff;
      text-align: center;
      font-size: calc(64 * var(--u));
      font-weight: 500;
      line-height: 1.15;
    }

    .lower-controls-guide img {
      width: calc(337 * var(--u));
      height: auto;
    }
    > .toolbar {
      position: sticky;
      top: 0;
      z-index: 1;
      flex: 0 0 var(--lower-toolbar-height);
      height: var(--lower-toolbar-height);
      background: inherit;
    }
    .steps {
      flex: 0 0 calc(169 * var(--u));
      grid-template-columns: repeat(4, minmax(0, 1fr));
      height: auto;
      margin-inline: calc(64 * var(--u));
      padding-top: calc(42 * var(--u));
    }
    .categories,
    .subcategories {
      flex: 0 0 calc(90 * var(--u));
      height: auto;
      overflow-x: auto;
      scrollbar-width: none;
      padding-inline: calc(63 * var(--u)) 0;
    }
    .categories::-webkit-scrollbar,
    .subcategories::-webkit-scrollbar {
      display: none;
    }
    .categories button,
    .subcategories button {
      flex: none;
    }
    .subcategory-scroll {
      display: contents;
    }
    .row-more {
      position: sticky;
      right: 0;
      width: calc(72 * var(--u));
      margin-left: auto;
      background: #fff;
    }

    .catalog {
      display: grid;
      grid-template: calc(124 * var(--u)) 1fr / minmax(0, 1fr) calc(
          355 * var(--u)
        );
      column-gap: calc(28 * var(--u));
      align-content: start;
      padding: 0 calc(63 * var(--u));
      background: #fff;
    }
    .subcategories {
      grid-column: 1 / -1;
      align-self: start;
      min-height: calc(64 * var(--u));
      padding-inline: 0;
    }
    &:has(.cart-row) .catalog {
      grid-template-rows: calc(84 * var(--u)) 1fr;
    }
    .product-grid {
      position: static;
      grid-template-columns: repeat(
        var(--lower-columns),
        calc(var(--lower-card-width) * var(--u))
      );
      grid-auto-rows: calc(var(--lower-card-height) * var(--u));
      align-content: start;
      gap: calc(16 * var(--u));
    }
    .product {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: auto;
      min-width: 0;
      gap: calc(3 * var(--u));
      padding: calc(8 * var(--u)) calc(6 * var(--u));
      font-size: calc(var(--lower-card-font) * var(--u));
    }
    .product strong,
    .product-price {
      position: static;
      line-height: 1.15;
    }
    .product strong,
    .product strong[data-lines="fixed"] {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      white-space: normal;
    }
    .product-image {
      position: relative;
      inset: auto;
      flex: none;
      transform: none;
      translate: none;
      scale: none;
    }

    .pagination {
      position: static;
      align-self: start;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      justify-content: stretch;
      justify-items: stretch;
      grid-template-rows: calc(239 * var(--u)) repeat(
          2,
          calc(67 * var(--u))
        ) calc(48 * var(--u));
      align-content: start;
      align-items: center;
      row-gap: calc(12 * var(--u));
      height: calc(504 * var(--u));
      padding: calc(26 * var(--u)) 0 0;
      background: #e9e9e9;
      color: #20352b;
      font-size: calc(45 * var(--u));
      text-align: center;
    }
    .lower-controls-preview {
      justify-self: center;
      width: calc(276 * var(--u));
      height: calc(239 * var(--u));
      align-self: stretch;
      display: grid;
      justify-items: center;
      align-content: center;
      gap: calc(8 * var(--u));
      min-height: calc(211 * var(--u));
      background: #fff;
      font-size: calc(34 * var(--u));
    }
    .lower-controls-preview img {
      width: calc(125 * var(--u));
      aspect-ratio: 1;
      object-fit: contain;
    }
    .lower-controls-preview-image {
      position: relative;
      display: block;
      overflow: hidden;
      border-radius: 50%;
    }
    .lower-controls-preview-image img {
      position: absolute;
      display: block;
      max-width: none;
      max-height: none;
      object-fit: cover;
    }
    .preview-quantity {
      display: grid;
      grid-template-columns: repeat(3, calc(48 * var(--u)));
      align-items: center;
      justify-content: center;
      gap: calc(8 * var(--u));
      font-size: calc(34 * var(--u));
    }
    .preview-quantity button {
      width: calc(48 * var(--u));
      height: calc(48 * var(--u));
      border: var(--u) solid currentColor;
      border-radius: 50%;
      background: #fff;
    }
    .preview-quantity button:disabled {
      opacity: 0.4;
    }
    .pagination > span {
      grid-row: 4;
      margin: 0;
      font-size: calc(40 * var(--u));
      line-height: 1;
    }
    .pagination button {
      justify-self: center;
      width: calc(262 * var(--u));
      height: calc(67 * var(--u));
      padding: 0;
      border-radius: calc(15 * var(--u));
      background: #fff;
    }
    .pagination button:disabled {
      opacity: 0.48;
    }

    .cart-preview {
      flex-basis: calc(84 * var(--u));
    }
    .cart-preview:has(.cart-scroll:empty) {
      flex-basis: 0;
    }
    .cart-scroll-buttons {
      top: 0;
      gap: calc(3 * var(--u));
    }
    .cart-scroll-buttons button {
      height: calc(38 * var(--u));
    }
    .cart-scroll .cart-row {
      height: calc(80 * var(--u));
    }
    .order-bar {
      margin-bottom: calc(32 * var(--u));
    }

    .product-detail {
      position: fixed;
      inset: calc((100dvh - 1920 * var(--u)) / 2 + 915 * var(--u)) 0 auto;
      width: calc(792 * var(--u));
      max-height: calc(860 * var(--u));
      overflow: auto;
      padding: calc(35 * var(--u)) calc(52 * var(--u));
    }
    .product-detail::backdrop {
      background: linear-gradient(
        transparent calc((100dvh - 1920 * var(--u)) / 2 + 795 * var(--u)),
        #0007 0
      );
    }
    .product-detail .detail-screen {
      display: flex;
      flex-direction: column;
      gap: calc(22 * var(--u));
      height: auto;
    }
    .product-detail .toolbar {
      display: none;
    }
    .product-detail .detail-summary {
      position: static;
      display: grid;
      grid-template-columns: calc(186 * var(--u)) 1fr;
      align-items: start;
      gap: calc(44 * var(--u));
      height: auto;
    }
    .product-detail .detail-image {
      position: static;
      width: calc(186 * var(--u));
      height: calc(186 * var(--u));
      mask-image: none !important;
    }
    .product-detail .detail-image img {
      position: static;
      width: 100%;
      height: 100%;
    }
    .product-detail .detail-info h2,
    .product-detail .detail-info p {
      position: static;
      font-size: calc(32 * var(--u));
    }
    .product-detail .detail-info h2 {
      font-size: calc(40 * var(--u));
      font-weight: 600;
    }
    .product-detail .detail-totals {
      position: static;
      flex-wrap: wrap;
      gap: calc(8 * var(--u));
    }
    .product-detail .detail-totals .quantity,
    .product-detail .detail-totals .amount {
      position: static;
    }
    .product-detail .detail-totals .amount strong {
      margin-inline-start: 0;
    }
    .product-detail .detail-totals .amount strong {
      font-size: calc(38 * var(--u));
    }
    .product-detail .detail-fields,
    .product-detail .personal-fields {
      position: static;
    }
    .product-detail .personal-summary {
      grid-template-columns: calc(120 * var(--u)) 1fr;
      align-items: center;
      gap: calc(12 * var(--u)) calc(24 * var(--u));
    }
    .product-detail .personal-summary .detail-image {
      width: calc(120 * var(--u));
      height: calc(120 * var(--u));
    }
    .product-detail .personal-summary .detail-info {
      display: contents;
    }
    .product-detail .personal-summary .amount {
      position: static;
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: 1fr auto 1fr auto 1fr;
      align-items: center;
      height: auto;
      font-size: calc(27 * var(--u));
    }
    .product-detail .personal-summary .amount > :is(span, b) {
      position: static;
      width: auto;
      line-height: 1.2;
      text-align: center;
    }
    .product-detail .personal-summary .amount > span {
      grid-template-rows: auto auto;
    }
    .product-detail .personal-fields fieldset {
      height: auto;
      min-width: 0;
    }
    .product-detail .personal-fields legend {
      height: auto;
      font-size: calc(32 * var(--u));
    }
    .product-detail .personal-choices {
      height: calc(62 * var(--u));
      justify-content: flex-start;
      padding-inline: 0;
    }
    .product-detail .personal-choices button {
      flex: 1;
      min-width: 0;
      height: calc(52 * var(--u));
    }
    .product-detail .detail-fields fieldset {
      height: auto;
      margin-bottom: calc(24 * var(--u));
    }
    .product-detail .detail-fields legend {
      height: auto;
      margin-bottom: calc(14 * var(--u));
      font-size: calc(40 * var(--u));
    }
    .product-detail .detail-fields fieldset button {
      width: calc(50% - 10 * var(--u));
      margin-right: calc(16 * var(--u));
      font-size: calc(38 * var(--u));
    }
    .product-detail .detail-fields fieldset button:nth-of-type(2n),
    .product-detail .detail-fields fieldset button:last-child {
      margin-right: 0;
    }
    .product-detail
      .detail-fields
      fieldset:has(button:only-of-type):not(.temperature) {
      display: none;
    }
    .product-detail .detail-fields .personal-options {
      position: static;
      width: 100%;
      height: calc(64 * var(--u));
    }
    .product-detail .detail-screen > .detail-actions {
      position: static;
      min-height: calc(80 * var(--u));
    }
    .product-detail .detail-screen:not(.lower-personal) {
      min-height: calc(500 * var(--u));
    }
    .product-detail
      .detail-screen:not(.lower-personal)
      > .detail-actions {
      margin-top: auto;
    }
    .product-detail:has(.detail-screen:not(.lower-personal) .temperature)
      .detail-screen {
      min-height: calc(790 * var(--u));
    }
    .product-detail:has(.detail-screen:not(.lower-personal) .temperature)
      .detail-screen
      > .detail-actions {
      margin-top: auto;
    }
    .product-detail .detail-actions button {
      font-size: calc(36 * var(--u));
    }

    &[data-large="true"] {
      --lower-toolbar-height: 0px;
      --lower-columns: 2;
      --lower-card-width: 276;
      --lower-card-height: 240;
      --lower-card-font: 34;

      .lower-controls-guide {
        justify-content: flex-start;
        padding-top: calc(251 * var(--u) - var(--lower-toolbar-height));
        gap: calc(45 * var(--u));
        font-size: calc(80 * var(--u));
      }
      .categories {
        gap: calc(48 * var(--u));
      }
      .subcategories {
        height: calc(104 * var(--u));
        min-height: 0;
        padding-top: calc(40 * var(--u));
        align-items: flex-start;
        overflow: hidden;
      }
      .subcategory-scroll {
        display: flex;
        flex: 1 1 auto;
        min-width: 0;
        align-items: flex-start;
        gap: calc(36 * var(--u));
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
      }
      .subcategory-scroll::-webkit-scrollbar {
        display: none;
      }
      .subcategories .row-more {
        position: static;
        flex: 0 0 calc(80 * var(--u));
        margin-left: 0;
      }
      .product {
        background: #fff;
        color: #20352b;
      }
      .cart-preview {
        display: none;
        flex-basis: 0;
        height: 0;
        padding: 0;
      }
      .order-bar {
        margin-bottom: calc(31 * var(--u));
      }
      .lower-controls-preview {
        grid-template-rows: minmax(0, 1fr) auto auto;
        gap: calc(3 * var(--u));
      }
      .lower-controls-preview > img {
        display: none;
      }
      > .toolbar {
        display: none;
      }
      .steps {
        --step-label-height: calc(61 * var(--u));
        --step-dot-gap: calc(18 * var(--u));
        --step-dot-size: calc(32 * var(--u));
        flex-basis: calc(169 * var(--u));
        height: calc(169 * var(--u));
        margin-inline: calc(64 * var(--u));
        padding-top: calc(42 * var(--u));
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      .total-quantity {
        display: grid;
        grid-template-columns: calc(42 * var(--u)) auto calc(42 * var(--u));
        align-items: center;
        gap: calc(10 * var(--u));
      }
      .order-bar .total-quantity button {
        width: calc(42 * var(--u));
        height: calc(42 * var(--u));
        min-height: 0;
        margin: 0;
        border: var(--u) solid currentColor;
        border-radius: 50%;
        background: #fff;
        color: #20352b;
        font-size: calc(32 * var(--u));
        line-height: 1;
      }
    }

    &:not([data-large="true"]) {
      --lower-card-width: 212;
      --lower-card-height: 239;
      --lower-card-font: 24;

      .lower-controls-guide {
        flex-basis: calc(984 * var(--u) - var(--lower-toolbar-height));
        justify-content: flex-start;
        padding-top: calc(396 * var(--u) - var(--lower-toolbar-height));
        gap: calc(46 * var(--u));
        font-size: calc(40 * var(--u));
      }
      .categories {
        flex-basis: calc(120 * var(--u));
        justify-content: space-between;
        gap: calc(18 * var(--u));
        padding-inline: calc(48 * var(--u));
      }
      .categories .row-more {
        display: none;
      }
      .catalog {
        grid-template: calc(123 * var(--u)) 1fr / calc(653 * var(--u)) calc(
            355 * var(--u)
          );
        column-gap: calc(18 * var(--u));
        padding-inline: calc(37 * var(--u)) calc(17 * var(--u));
      }
      .subcategories {
        justify-content: center;
        min-height: calc(103 * var(--u));
      }
      .product-grid {
        gap: calc(12 * var(--u)) calc(8 * var(--u));
      }
      .product {
        background: #fff;
        color: #20352b;
      }
      .order-bar {
        margin: 0;
        border-radius: 0;
      }
      &:has(.cart-row) .catalog {
        grid-template-rows: calc(55 * var(--u)) 1fr;
      }
    }
  }

  &&&&[data-reach="true"][data-screen="review"] {
    .review-screen .review-actions {
      inset-block: auto 0;
    }
    .review-total {
      inset-block: auto calc(175 * var(--u));
    }
    .snack-suggestions {
      inset-block: auto calc(335 * var(--u));
    }
    .review-cart {
      bottom: calc(715 * var(--u));
      height: auto;
    }
  }

  &&&&[data-reach="true"]:is(
      [data-screen="desserts"],
      [data-screen="review"],
      [data-screen="card"],
      [data-screen="remove-card"],
      [data-screen="bell"]
    ) {
    > .toolbar {
      display: none;
    }
    > .lower-controls-guide {
      position: relative;
      flex: 0 0 calc(795 * var(--u));
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: calc(59 * var(--u));
      background: #000;
      color: #fff;
      text-align: center;
      font-size: calc(72 * var(--u));
      line-height: 1.08;
    }
    > .lower-controls-guide img {
      width: calc(337 * var(--u));
      height: auto;
    }
  }

  &&&&&&[data-reach="true"]:not([data-large="true"]):not(
      [data-screen="start"]
    ) {
    --lower-toolbar-height: 0px;
    > .toolbar {
      display: none;
    }
    > .lower-controls-guide {
      position: relative;
      flex: 0 0 calc(795 * var(--u));
      justify-content: center;
      padding: 0;
      gap: calc(59 * var(--u));
      background: #000;
      color: #fff;
      text-align: center;
      font-size: calc(72 * var(--u));
    }
  }

  &&&&&&[data-reach="true"]:not([data-large="true"])[data-screen="review"] {
    .review-title {
      inset-block-start: calc(28 * var(--u));
      font-size: calc(42 * var(--u));
    }
    .cart-heading {
      inset-block-start: calc(96 * var(--u));
      height: calc(58 * var(--u));
      font-size: calc(32 * var(--u));
    }
    .cart-heading span {
      top: calc(9 * var(--u));
    }
    .review-cart {
      inset: calc(154 * var(--u)) calc(39 * var(--u)) auto;
      height: calc(530 * var(--u));
      overflow-y: auto;
      overscroll-behavior-y: contain;
    }
    .review-cart .cart-row {
      height: calc(110 * var(--u));
      font-size: calc(34 * var(--u));
    }
    .snack-suggestions {
      display: none;
    }
    .snack-suggestions h2 {
      top: calc(14 * var(--u));
      font-size: calc(32 * var(--u));
    }
    .snack-suggestions > div {
      top: calc(70 * var(--u));
      grid-template-columns: repeat(4, calc(225.835 * var(--u)));
    }
    .snack-suggestions button {
      height: calc(185 * var(--u));
    }
    .snack-suggestions button p {
      top: calc(102 * var(--u));
    }
    .snack-suggestions button p:last-child {
      top: calc(151 * var(--u));
    }
    .review-total {
      height: calc(126 * var(--u));
      font-size: calc(32 * var(--u));
    }
    .review-total div strong {
      font-size: calc(46 * var(--u));
    }
    .review-total small {
      font-size: calc(32 * var(--u));
    }
    .review-screen .review-actions {
      inset: auto 0 0;
      height: calc(160 * var(--u));
    }
  }

  &&&&&&[data-reach="true"]:not([data-large="true"]):is(
      [data-screen="card"],
      [data-screen="remove-card"],
      [data-screen="bell"]
    ) {
    .card-payment {
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .card-title {
      flex: 0 0 calc(230 * var(--u));
      height: auto;
    }
    .card-title h1 {
      inset-block-start: calc(34 * var(--u));
    }
    .card-title p {
      inset-block-start: calc(100 * var(--u));
      font-size: calc(34 * var(--u));
      line-height: 1.35;
    }
    .card-instructions {
      flex: 1;
      height: auto;
      min-height: 0;
    }
    .card-instructions > p:not(.order-warning) {
      inset-block-start: 42%;
      font-size: calc(42 * var(--u));
    }
    .card-instructions .order-warning {
      inset-block-start: auto;
      bottom: calc(46 * var(--u));
    }
    .card-payment > .detail-actions {
      position: static;
      flex: 0 0 calc(140 * var(--u));
      height: auto;
    }
    .payment-overlay {
      inset: 0;
    }
    .payment-notice {
      left: 50%;
      top: 50%;
      width: calc(565 * var(--u));
      height: calc(430 * var(--u));
      transform: translate(-50%, -50%);
    }
    .payment-notice h2 {
      top: calc(92 * var(--u));
    }
    .payment-notice p {
      inset-block-start: calc(270 * var(--u));
    }
    .payment-notice[data-stage="bell"] p {
      top: calc(314 * var(--u));
    }
    .payment-dots {
      top: calc(126 * var(--u));
    }
  }

  &&&&[data-reach="true"][data-screen="payment"] {
    > .lower-controls-guide {
      flex-basis: calc(984 * var(--u));
      justify-content: flex-start;
      padding-top: calc(396 * var(--u));
      gap: calc(46 * var(--u));
      font-size: calc(40 * var(--u));
    }
    .categories {
      flex: 0 0 calc(120 * var(--u));
      justify-content: space-between;
      gap: calc(18 * var(--u));
      padding-inline: calc(48 * var(--u));
    }
    .categories button {
      font-size: calc(36 * var(--u));
    }
    .categories .row-more {
      display: none;
    }
    .payment-methods {
      flex: 1 0 auto;
      padding: calc(34 * var(--u)) calc(43 * var(--u)) calc(28 * var(--u));
    }
    .payment-methods h1 {
      position: static;
      margin-bottom: calc(35 * var(--u));
      font-size: calc(50 * var(--u));
    }
    .payment-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: calc(17 * var(--u));
    }
    .payment-grid button:nth-child(n) {
      position: static;
      width: auto;
      height: calc(219 * var(--u));
      padding: calc(8 * var(--u));
      font-size: calc(36 * var(--u));
    }
    .payment-grid button:nth-child(1) {
      grid-area: 1 / 1;
    }
    .payment-grid button:nth-child(4) {
      grid-area: 1 / 2;
      flex-direction: column-reverse;
    }
    .payment-grid button:nth-child(3) {
      grid-area: 1 / 3;
    }
    .payment-grid button:nth-child(5) {
      grid-area: 2 / 1;
    }
    .payment-grid button:nth-child(2) {
      grid-area: 2 / 2;
    }
    .payment-grid button:nth-child(6) {
      grid-area: 2 / 3;
    }
    .payment-grid .card-logo,
    .payment-grid .easy-payment > span {
      position: static;
    }
    .payment-grid .easy-payment img {
      width: calc(82 * var(--u));
      height: auto;
    }
    .payment-grid .card-logo {
      width: calc(67 * var(--u));
      height: calc(58 * var(--u));
    }
    .reach-payment-navigation {
      display: flex;
      justify-content: space-between;
      padding: 0 calc(88 * var(--u)) calc(38 * var(--u)) calc(48 * var(--u));
    }
    .reach-payment-navigation button {
      width: calc(423 * var(--u));
      min-height: calc(128 * var(--u));
      box-shadow: inset 0 0 0 var(--u) currentColor;
      font-size: calc(40 * var(--u));
    }
  }

  &&&&[data-reach="true"]:not([data-large="true"])[data-screen="payment"] {
    --lower-toolbar-height: 0px;
  }

  &&&&[data-reach="true"]:not([data-large="true"])[data-screen="complete"] {
    .complete-message h1 {
      inset-block-start: calc(72 * var(--u));
    }
    .complete-message > p:not(.order-warning) {
      inset-block-start: calc(206 * var(--u));
    }
    .complete-message .order-warning {
      inset-block-start: calc(490 * var(--u));
    }
  }

  &&&&[data-reach="true"][data-screen="desserts"] {
    > .toolbar {
      display: none;
    }
    .lower-controls-guide {
      position: relative;
      flex: 0 0 calc(795 * var(--u));
      background: #000;
      color: #fff;
      text-align: center;
    }
    .lower-controls-guide img {
      position: absolute;
      inset: calc(251 * var(--u)) auto auto calc(364 * var(--u));
      width: calc(337 * var(--u));
      height: calc(145 * var(--u));
    }
    .lower-controls-guide p {
      position: absolute;
      inset: calc(455 * var(--u)) 0 auto;
      font-size: calc(72 * var(--u));
      line-height: 1.08;
    }
    .dessert-title {
      inset: calc(59 * var(--u)) 0 auto;
      font-size: calc(48 * var(--u));
    }
    .dessert-grid {
      inset: calc(185 * var(--u)) calc(15 * var(--u)) auto calc(29 * var(--u));
      grid-template-columns: minmax(0, 1fr);
      gap: calc(31 * var(--u));
    }
    .dessert-grid article {
      height: calc(310 * var(--u));
    }
    .dessert-image {
      position: absolute;
      inset: calc(16 * var(--u)) auto auto calc(16 * var(--u));
      width: calc(358 * var(--u));
      height: calc(277 * var(--u));
      border-radius: calc(26 * var(--u));
      mask-image: none !important;
    }
    .dessert-image img {
      position: static;
      width: 100% !important;
      height: 100% !important;
      object-fit: cover;
    }
    .dessert-grid article p {
      inset: calc(62 * var(--u)) 0 auto calc(402 * var(--u));
    }
    .dessert-grid article + article p {
      top: calc(87 * var(--u));
    }
    .dessert-quantity {
      inset: calc(141 * var(--u)) 0 auto calc(402 * var(--u));
      justify-content: center;
      grid-template-columns: calc(175 * var(--u)) repeat(3, calc(50 * var(--u)));
    }
    .dessert-quantity button {
      width: calc(50 * var(--u));
      height: calc(50 * var(--u));
    }
    .more-menu {
      inset-block-start: calc(836 * var(--u));
      height: calc(129 * var(--u));
    }
    .dessert-screen .dessert-actions {
      inset: auto 0 0;
      height: calc(160 * var(--u));
      grid-template-columns: calc(340 * var(--u)) 1fr;
    }
  }

  &&&&&&[data-reach="true"]:not([data-large="true"])[data-screen="menu"] {
    overflow: hidden;
    --lower-columns: 3;
    --lower-card-width: 276;
    --lower-card-height: 239;
    --lower-card-font: 24;
    --lower-toolbar-height: 0px;
    > .toolbar {
      display: none;
    }
    .lower-controls-guide {
      flex-basis: calc(795 * var(--u) - var(--lower-toolbar-height));
      justify-content: center;
      padding: 0;
      gap: calc(59 * var(--u));
      font-size: calc(72 * var(--u));
    }
    .categories {
      flex-basis: calc(90 * var(--u));
      justify-content: flex-start;
      padding-inline: calc(63 * var(--u)) 0;
      gap: calc(48 * var(--u));
    }
    .categories .row-more {
      display: block;
    }
    .subcategories {
      height: calc(86 * var(--u));
      min-height: 0;
      padding-top: calc(40 * var(--u));
      align-items: flex-start;
      justify-content: flex-start;
    }
    .catalog {
      min-height: 0;
      grid-template: calc(141 * var(--u)) minmax(0, 1fr) / minmax(0, 1fr);
      padding-inline: calc(63 * var(--u));
      overflow: hidden;
    }
    .product-grid {
      min-height: 0;
      width: calc(862 * var(--u));
      margin-left: calc(40 * var(--u));
      overflow-y: auto;
      overflow-x: hidden;
      overscroll-behavior-y: contain;
      touch-action: pan-y;
      scrollbar-width: none;
      grid-template-columns: repeat(3, calc(276 * var(--u)));
      grid-auto-rows: calc(239 * var(--u));
      gap: calc(14 * var(--u)) calc(17 * var(--u));
    }
    .product-grid::-webkit-scrollbar {
      display: none;
    }
    .product {
      box-shadow: inset 0 0 0 1px var(--line);
    }
    .steps {
      --step-label-height: calc(61 * var(--u));
      --step-dot-gap: calc(18 * var(--u));
      --step-dot-size: calc(29.368 * var(--u));
      align-self: stretch;
      flex: 0 0 calc(169 * var(--u));
      width: auto;
      height: calc(169 * var(--u));
      margin: 0 calc(64 * var(--u));
      padding-top: calc(46 * var(--u));
      grid-template-columns: repeat(3, minmax(0, 1fr));
      font-size: calc(46 * var(--u));
    }
    .steps .step-dot {
      width: calc(32.967 * var(--u));
      height: calc(29.368 * var(--u));
      aspect-ratio: auto;
    }
    .categories button {
      font-size: calc(44 * var(--u));
    }
    .order-bar:not([data-lower-cart="true"]) {
      margin: 0 calc(30 * var(--u)) calc(31 * var(--u));
      border-radius: calc(32 * var(--u));
      box-shadow: inset 0 0 0 1px #ddd;
    }
    .product-detail .lower-personal {
      min-height: calc(790 * var(--u));
    }
    .product-detail .lower-personal .detail-fields {
      margin-top: auto;
      min-height: calc(322 * var(--u));
    }
    .product-detail .lower-personal .detail-fields button {
      height: calc(100 * var(--u));
      margin-bottom: calc(14 * var(--u));
    }
    .product-detail .lower-personal .detail-fields p {
      font-size: calc(34 * var(--u));
    }
    &:has(.catalog[data-lower-cart="true"]) {
      .order-bar {
        order: 1;
        position: relative;
        z-index: 3;
        overflow: visible;
        flex: 0 0 calc(91 * var(--u));
        grid-template-columns: calc(293 * var(--u)) calc(432 * var(--u));
        gap: calc(16 * var(--u));
        padding-inline: calc(38 * var(--u));
      }
      .order-bar::before {
        content: "";
        position: absolute;
        inset: calc(-17 * var(--u)) 0 auto;
        height: calc(17 * var(--u));
        background: #eee;
      }
      .order-bar,
      .cart-preview {
        background: #eee;
      }
      .order-bar > div {
        flex-direction: row;
        justify-content: space-between;
        margin-right: calc(6 * var(--u));
        padding-inline: calc(16 * var(--u));
        background: white;
        font-size: calc(38 * var(--u));
      }
      .order-bar > div::before {
        display: none;
      }
      .order-bar strong {
        font-size: calc(44 * var(--u));
      }
      .cart-preview {
        order: 2;
        position: relative;
        z-index: 1;
        flex: 0 0 calc(258 * var(--u));
        min-height: 0;
        margin: 0 calc(301 * var(--u)) 0 calc(38 * var(--u));
        padding: calc(6 * var(--u)) 0 calc(36 * var(--u));
        isolation: isolate;
      }
      .cart-preview::before {
        content: "";
        position: absolute;
        z-index: 0;
        inset: 0 calc(-301 * var(--u)) 0 calc(-38 * var(--u));
        background: #eee;
      }
      .cart-preview:has(.cart-scroll:empty) {
        flex: 0 0 calc(258 * var(--u));
      }
      .cart-scroll {
        position: relative;
        z-index: 1;
        height: calc(216 * var(--u));
        overflow-y: auto;
        overflow-x: hidden;
        overscroll-behavior-y: contain;
        touch-action: pan-y;
        scrollbar-width: none;
        background: white;
      }
      .cart-scroll::-webkit-scrollbar {
        display: none;
      }
      .cart-scroll .cart-row {
        display: grid;
        grid-template-columns: calc(64 * var(--u)) minmax(0, 1fr) calc(
            145 * var(--u)
          ) calc(165 * var(--u));
        grid-template-rows: minmax(0, 1fr);
        align-items: center;
        gap: calc(10 * var(--u));
        height: calc(109 * var(--u));
        padding-inline: calc(14 * var(--u));
        cursor: pointer;
      }
      .cart-scroll .cart-row > :is(.cart-item-name, .quantity, .cart-price) {
        position: static;
        width: auto;
        min-width: 0;
      }
      .cart-scroll .cart-row > img {
        position: static;
        width: calc(64 * var(--u));
      }
      .cart-item-name,
      .cart-item-name small {
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .cart-item-name {
        display: block;
        white-space: nowrap;
      }
      .cart-price {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: calc(8 * var(--u));
        white-space: nowrap;
      }
      .cart-scroll .quantity button {
        width: calc(45 * var(--u));
        height: calc(45 * var(--u));
      }
      .lower-cart-actions button {
        margin: 0;
      }
      .cart-row[data-selected="true"] {
        background: #e1e8e3;
      }
      .lower-cart-actions {
        position: absolute;
        z-index: 5;
        inset: 0 calc(19 * var(--u)) auto auto;
        width: calc(265 * var(--u));
        display: grid;
        gap: calc(15 * var(--u));
      }
      .lower-cart-actions button {
        position: relative;
        z-index: 1;
        width: 100%;
        height: calc(85 * var(--u));
        min-height: 0;
        background: #292929;
        color: #fff;
        border-radius: calc(43 * var(--u));
        font-size: calc(36 * var(--u));
        pointer-events: auto;
      }
      .lower-cart-actions button:disabled {
        opacity: 0.48;
      }
    }
  }
  &&&&&&[data-reach="true"]:not([data-large="true"]):is(
      [data-screen="payment"],
      [data-screen="complete"]
    ) {
    --lower-toolbar-height: 0px;
  }
  &&&&[data-reach="true"]:not([data-large="true"])[data-screen="complete"] {
    .complete-message .order-warning img {
      display: none;
    }
    .receipt-actions {
      grid-template-columns: calc(394 * var(--u)) 1fr;
    }
  }

  /* 터치 위치 안내 + 하단 조작: 기존 레이아웃은 유지하고 말풍선 공간만 확보한다. */
  &&&&&&[data-guidance="true"][data-reach="true"] {
    &:not([data-large="true"])[data-screen="menu"] {
      .lower-cart-actions .touch-guidance-target::before,
      .lower-cart-actions .touch-guidance-target::after {
        left: auto;
        top: 50%;
        bottom: auto;
      }
      .lower-cart-actions .touch-guidance-target::before {
        right: calc(100% + 10 * var(--u));
        width: max-content;
        transform: translateY(-50%);
        z-index: 2;
      }
      .lower-cart-actions .touch-guidance-target::after {
        right: calc(100% - 1px);
        width: calc(20 * var(--u));
        height: calc(28 * var(--u));
        transform: translateY(-50%);
        border: 0;
        background: var(--guide-color);
        clip-path: polygon(0 0, 100% 50%, 0 100%);
        z-index: 1;
      }
    }

    &[data-screen="desserts"] {
      .dessert-grid {
        inset-block-end: calc(425 * var(--u));
        overflow-y: auto;
        overscroll-behavior-y: contain;
        scrollbar-width: none;
      }
      .dessert-grid::-webkit-scrollbar {
        display: none;
      }
      .more-menu {
        inset-block-start: calc(700 * var(--u));
      }
    }

    &[data-screen="review"] {
      .review-cart {
        height: calc(490 * var(--u));
      }
      .review-total {
        inset-block: auto calc(335 * var(--u));
      }
    }
  }

`;
