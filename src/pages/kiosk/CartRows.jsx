import { kioskImage } from './menu.js'

export default function CartRows({ items, onQuantity, onRemove, review = false, selectedKey, onSelect }) {
  return items.map((item) => (
    <div className="cart-row" key={item.key} data-selected={onSelect ? selectedKey === item.key : undefined}
      onClick={onSelect ? () => onSelect(item.key) : undefined}>
      <img src={kioskImage(item.image)} alt="" />
      {onSelect ? (
        <button className="cart-item-name" aria-pressed={selectedKey === item.key}>{item.name}<small>{item.option}</small></button>
      ) : <div className="cart-item-name">{item.name}<small>{item.option}</small></div>}
      <div className="quantity">
        <button disabled={item.quantity === 1} onClick={(event) => { event.stopPropagation(); onQuantity(item.key, -1) }} aria-label={`${item.name} 수량 줄이기`}>
          <img src={kioskImage(review ? 'review-quantity' : 'dessert-quantity', 'svg')} alt="" /><span aria-hidden="true">-</span>
        </button>
        <output>{item.quantity}</output>
        <button onClick={(event) => { event.stopPropagation(); onQuantity(item.key, 1) }} aria-label={`${item.name} 수량 늘리기`}>
          <img src={kioskImage(review ? 'review-quantity' : 'dessert-quantity', 'svg')} alt="" /><span aria-hidden="true">+</span>
        </button>
      </div>
      <div className="cart-price">
        {(item.quantity * item.price).toLocaleString('ko-KR')}
        <button className="remove-item" onClick={(event) => { event.stopPropagation(); onRemove(item.key) }} aria-label={`${item.name} 삭제`}>
          <img src={kioskImage(review ? 'review-remove' : 'cart-remove', 'svg')} alt="" />
        </button>
      </div>
    </div>
  ))
}
