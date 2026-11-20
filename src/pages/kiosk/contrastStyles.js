import { css } from "styled-components";
import { highContrastTheme } from "./highContrastTheme.js";

/*
 * 색상 고대비: 피그마 시안의 3색 체계
 * - 검정(#191F28): 화면 배경, 노랑·파랑 위의 글자
 * - 노랑(#FFEE00): 누를 수 있는 버튼·카드 (메뉴, 옵션, 수량, 주요 버튼)
 * - 파랑(#00E1FF): 선택된 상태 (카테고리, 옵션, 누르고 있는 버튼), 키보드 포커스
 * 검정 배경 위의 일반 글자는 시안처럼 흰색
 */
export const contrastStyles = css`
  &&&[data-contrast="true"] {
    ${highContrastTheme}

    background: var(--paper);
    color: var(--ink);

    /* 기본 디자인의 검정·회색 글자를 모두 흰 글자로: 아래에서 색을 따로 지정한 요소만 예외 */
    * { color: inherit; }

    /* 개발용 접근성 프로필 테스트 패널(?preview): --ink가 흰색이 되어 흰 박스로 보이지 않도록 */
    .preview { background: #000; color: #fff; box-shadow: 0 0 0 1px #fff; }

    /* 공통 배경 */
    .product-detail, .detail-summary, .personal-choices, .cart-heading,
    .snack-suggestions, .payment-methods, .card-instructions, .more-menu {
      background: var(--paper);
    }
    .catalog { background: var(--surface); }

    /* 상단 툴바: 노랑 테두리 버튼, 주황 아이콘은 흰색으로 */
    .toolbar { background: var(--paper); color: var(--ink); font-weight: 600; }
    .toolbar button, .toolbar-end span {
      border-color: var(--contrast-yellow);
      box-shadow: inset 0 0 0 1px var(--contrast-yellow);
      background: var(--paper);
    }
    .toolbar button img, .toolbar-end img, .order-warning img, .payment-dots {
      filter: brightness(0) invert(1);
    }

    /* 시작 화면: 매장·포장 모두 노랑 버튼 (시안) */
    .start-actions button {
      background: var(--contrast-action); color: var(--contrast-action-ink);
      box-shadow: inset 0 0 0 var(--contrast-stroke) var(--contrast-black);
    }
    .start-actions button img { filter: brightness(0); }

    /* 누를 수 있는 버튼(다음 단계로 가는 버튼): 노랑 바탕 검정 글자 */
    .order-bar button, .detail-actions button + button {
      background: var(--contrast-action);
      color: var(--contrast-action-ink);
      box-shadow: inset 0 0 0 var(--contrast-stroke) var(--contrast-action);
    }

    /* 보조 버튼(이전·취소 등): 검정 바탕 흰 글자 + 노랑 테두리 */
    .detail-actions button {
      background: var(--paper);
      color: var(--ink);
      box-shadow: inset 0 0 0 var(--contrast-stroke) var(--contrast-border);
    }

    /* 누르고 있는 동안: 파랑 (시안의 '장바구니 담기' 누른 상태) */
    .start-actions button:active, .order-bar button:enabled:active,
    .detail-actions button:enabled:active, .product:enabled:active,
    .payment-grid button:enabled:active, .snack-suggestions button:active {
      background: var(--contrast-selected);
      color: var(--contrast-action-ink);
      box-shadow: inset 0 0 0 var(--contrast-stroke) var(--contrast-selected);
    }

    /* 메뉴 화면 하단 가격·주문하기 바: 검정 카드 + 노랑 테두리 */
    .order-bar {
      background: var(--paper); color: var(--ink);
      border-color: var(--contrast-yellow);
    }
    .order-bar div + div::before { border-color: var(--ink); }
    .order-bar button { box-shadow: none; }
    .order-bar button:disabled {
      background: transparent;
      color: var(--contrast-disabled-ink);
      outline: 2px dashed var(--contrast-disabled-ink);
    }

    /* 주문 확인: 장바구니 제목 줄 = 노랑, 합계 줄 = 검정 + 노랑 테두리 */
    .cart-heading { background: var(--contrast-action); color: var(--contrast-action-ink); }
    .review-total {
      background: var(--paper); color: var(--ink);
      box-shadow: inset 0 0 0 var(--contrast-stroke) var(--contrast-yellow);
    }
    .review-total div + div { border-color: var(--ink); }

    /* 진행 단계: 완료한 단계는 파랑 (선택 상태와 같은 색) */
    .step-dot { background: var(--paper); border-color: var(--contrast-yellow); border-width: max(2px, calc(2 * var(--u))); }
    .steps li[data-complete='true'] .step-dot { background: var(--contrast-blue); border-color: var(--contrast-blue); }
    /* 완료 아이콘을 파랑 원 + 검정 체크 아이콘으로 교체 (필터·블렌드 없이 브라우저마다 똑같이 보이도록) */
    .step-dot img {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 29 29'%3E%3Ccircle cx='14.5' cy='14.5' r='14.5' fill='%2300E1FF'/%3E%3Cpath d='M7 14.5L12 20L22 9.5' fill='none' stroke='%23191F28' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }
    .steps li::before { border-top-color: var(--contrast-yellow); border-top-width: 2px; }
    .steps li[aria-current='step'] { font-weight: 700; }

    /* 카테고리·하위 카테고리: 노랑 칩, 선택은 파랑 칩
       간격(gap)·여백은 기본·큰 글씨 모드 값을 그대로 쓰고 색만 바꿈 */
    .categories { align-items: center; }
    /* 카테고리 칩 안쪽 여백만큼 바깥을 당겨서 글자 위치·간격이 기본 모드와 같도록 */
    .categories button { padding: .3cqw .8cqw; margin-inline: -.8cqw; border-radius: 1.2cqw; }
    .categories button, .subcategories button {
      background: var(--contrast-action); color: var(--contrast-action-ink);
    }
    .categories button[aria-pressed='true'], .subcategories button[aria-pressed='true'] {
      background: var(--contrast-selected); color: var(--contrast-action-ink);
      font-weight: 700;
    }
    .categories button[aria-pressed='true']::after { display: none; }

    /* 메뉴 카드: 노랑 카드 */
    .product { background: var(--contrast-action); color: var(--contrast-action-ink); }
    .product::after { box-shadow: inset 0 0 0 max(1px, var(--u)) var(--contrast-black); }
    .product strong, .product-price, .categories button,
    .subcategories button, .detail-info h2, .cart-heading,
    .personal-heading button, .personal-choices button,
    .bubble-choice, .quantity button span, .dessert-quantity button span {
      font-weight: 600;
    }
    .badge, .badge[data-badge='Best'] {
      z-index: 1; background: var(--contrast-black); color: var(--contrast-yellow); font-weight: 650;
    }

    /* 상품 옵션: 선택 안 함 = 노랑, 선택 = 파랑 */
    .detail-fields fieldset button, .personal-heading button, .personal-choices button {
      background: var(--contrast-action); color: var(--contrast-action-ink);
      box-shadow: inset 0 0 0 var(--contrast-stroke) var(--contrast-action);
    }
    .detail-fields fieldset button[aria-pressed='true'],
    .personal-choices button[aria-pressed='true'],
    .detail-fields .temperature button[data-cold='true'][aria-pressed='true'] {
      background: var(--contrast-selected); color: var(--contrast-action-ink);
      box-shadow: inset 0 0 0 var(--contrast-stroke) var(--contrast-selected);
      font-weight: 700;
    }
    .detail-fields fieldset button, .detail-actions button,
    .payment-grid button, .more-menu { font-weight: 600; }
    .detail-fields .personal-options { background: var(--contrast-action); color: var(--contrast-action-ink); font-weight: 600; }
    .personal-summary .amount strong,
    .personal-summary .amount > span:last-child strong { color: var(--ink); }
    .bubble-choice img { visibility: hidden; }
    .bubble-choice input {
      opacity: 1;
      height: calc(28 * var(--u));
      align-self: center;
      accent-color: var(--contrast-selected);
      cursor: pointer;
    }

    /* 장바구니 스크롤 화살표 */
    .cart-scroll-buttons button {
      background: var(--contrast-action); color: var(--contrast-action-ink);
      box-shadow: none;
    }

    /* 결제 수단: 노랑 버튼 */
    .payment-grid button {
      background: var(--contrast-action); color: var(--contrast-action-ink);
      box-shadow: none;
    }
    .payment-notice, .more-menu {
      background: var(--paper);
      box-shadow: inset 0 0 0 var(--contrast-stroke) var(--contrast-yellow);
    }

    /* 디저트·간식 추천 카드: 노랑 카드 */
    .dessert-grid article { background: var(--contrast-action); color: var(--contrast-action-ink); border-radius: calc(30 * 100cqw / 1080); }
    .dessert-grid article::after { border-color: var(--contrast-action); border-width: var(--contrast-stroke); }
    .snack-suggestions button {
      background: var(--contrast-action); color: var(--contrast-action-ink);
      border-color: var(--contrast-action); border-width: var(--contrast-stroke);
    }
    .payment-overlay { background: rgb(0 0 0 / 70%); }

    /* 수량·삭제 버튼: 아이콘 대신 노랑 동그라미 안에 기호 */
    .quantity button, .dessert-quantity button, .remove-item {
      background: var(--contrast-action); color: var(--contrast-action-ink);
      box-shadow: none;
      border-radius: 50%;
    }
    /* 노랑 카드 안의 수량 버튼은 검정 동그라미로 구분 */
    .dessert-quantity button {
      background: var(--contrast-black); color: var(--contrast-yellow);
    }
    .quantity button img, .dessert-quantity button img { visibility: hidden; }
    .remove-item { position: relative; }
    .remove-item img { position: absolute; inset: 0; visibility: hidden; }
    .remove-item::after { content: '×'; font-weight: 700; line-height: 1; }
    .snack-add { background: var(--contrast-black); color: var(--contrast-yellow); border-radius: 50%; font-weight: 650; }
    .snack-add img { visibility: hidden; }

    /* 비활성: 검정 바탕 + 노랑 점선 테두리 (채워진 노랑 버튼과 구분) */
    button:disabled, .detail-actions button:disabled {
      opacity: 1;
      color: var(--contrast-disabled-ink);
      background: var(--contrast-disabled-bg);
      box-shadow: none;
      outline: 2px dashed var(--contrast-disabled-ink);
      outline-offset: -2px;
    }
    /* 결제 수단(제휴카드 등)은 비활성이어도 신용카드 버튼과 같은 노랑 버튼 */
    .payment-grid button:disabled {
      background: var(--contrast-action);
      color: var(--contrast-action-ink);
      outline: none;
    }
    /* 수량 빼기(−) 버튼: 수량 1일 때는 테두리만 있는 동그라미 */
    .quantity button:disabled {
      background: var(--paper);
      color: var(--contrast-yellow);
      outline: none;
      box-shadow: inset 0 0 0 2px var(--contrast-yellow);
    }
    .dessert-quantity button:disabled {
      background: var(--contrast-action);
      color: var(--contrast-black);
      outline: none;
      box-shadow: inset 0 0 0 2px var(--contrast-black);
    }
    .product:disabled::after { background: transparent; box-shadow: none; }
    /* 메뉴 페이지 이전·다음: 배경·테두리·취소선 없이 노랑 글자만 */
    .pagination { color: var(--contrast-yellow); }
    .pagination button, .pagination button:disabled {
      background: transparent;
      color: var(--contrast-yellow);
      box-shadow: none;
      outline: none;
      text-decoration: none;
    }

    /* 키보드 포커스: 파랑 */
    :focus-visible, .bubble-choice:has(input:focus-visible) {
      outline: 3px solid var(--contrast-selected);
      outline-offset: 3px;
    }
    .order-bar button:focus-visible, .detail-actions button + button:focus-visible {
      outline: 4px solid var(--contrast-action-ink);
      outline-offset: calc(-4px - var(--contrast-stroke));
    }

    /* 하단 조작은 배치만 담당하며, 조합 모드의 색상도 이 테마가 소유한다. */
    &&&[data-reach="true"] {
      .lower-controls-guide,
      .catalog,
      .pagination,
      .lower-controls-preview,
      .cart-preview,
      .cart-scroll,
      .order-bar,
      .order-bar > div,
      .product-detail,
      .product-detail .detail-summary,
      .product-detail .personal-choices {
        background: var(--paper);
        color: var(--ink);
      }

      .row-more,
      .pagination button,
      .preview-quantity button,
      .order-bar .total-quantity button,
      .lower-cart-actions button,
      .reach-payment-navigation button,
      .receipt-actions button {
        background: var(--contrast-action);
        color: var(--contrast-action-ink);
        box-shadow: none;
      }

      .product {
        background: var(--contrast-action);
        color: var(--contrast-action-ink);
        box-shadow: inset 0 0 0 var(--contrast-stroke) var(--contrast-black);
      }
      .product::after {
        box-shadow: inset 0 0 0 max(1px, var(--u)) var(--contrast-black);
      }

      .pagination button:disabled,
      .preview-quantity button:disabled,
      .order-bar .total-quantity button:disabled,
      .lower-cart-actions button:disabled,
      .reach-payment-navigation button:disabled,
      .receipt-actions button:disabled {
        opacity: 1;
        background: var(--contrast-disabled-bg);
        color: var(--contrast-disabled-ink);
        outline: 2px dashed var(--contrast-disabled-ink);
        outline-offset: -2px;
      }

      .order-bar:not([data-lower-cart="true"]) {
        border-color: var(--contrast-border);
        box-shadow: inset 0 0 0 var(--contrast-stroke) var(--contrast-border);
      }
      &:not([data-large="true"])[data-screen="menu"]:has(
          .catalog[data-lower-cart="true"]
        ) {
        .order-bar::before,
        .cart-preview::before {
          background: var(--paper);
        }
        .order-bar,
        .cart-preview,
        .order-bar > div,
        .cart-scroll {
          background: var(--paper);
          color: var(--ink);
        }
        .cart-row {
          box-shadow: inset 0 calc(-1 * var(--u)) var(--contrast-border);
        }
        .cart-row[data-selected="true"] {
          background: var(--contrast-selected);
          color: var(--contrast-action-ink);
        }
        .cart-price {
          color: inherit;
        }
      }

      .product-detail {
        box-shadow: inset 0 0 0 var(--contrast-stroke) var(--contrast-border);
      }
      .product-detail::backdrop {
        background: linear-gradient(
          transparent calc((100dvh - 1920 * var(--u)) / 2 + 795 * var(--u)),
          rgb(0 0 0 / 70%) 0
        );
      }
      .product-detail .detail-totals .amount,
      .product-detail .personal-summary .amount,
      .product-detail .personal-summary .amount > span:last-child strong {
        color: var(--ink);
      }

      .pagination,
      .lower-controls-preview,
      .cart-preview,
      .cart-scroll {
        border-color: var(--contrast-border);
      }
    }
  }
`;
