import { useEffect, useRef, useState } from 'react'
import { accessibilityOptions, defaultProfile } from '../../features/personalization/profile.js'
import { catalog } from './catalog.js'
import { categories, kioskImage, menuProduct, won } from './menu.js'
import ProductOptions from './ProductOptions.jsx'
import CartRows from './CartRows.jsx'
import Checkout from './Checkout.jsx'
import { KioskFrame } from './styles.js'
import { useTouchAssist } from './touchAssist.js'
import { useTouchGuidance } from './touchGuidance.js'
import { kioskGuidanceMessages } from './touchGuidanceConfig.js'
import { useNfcInput } from '../../hooks/useNfcInput.js' // NFC 훅 임포트

const START_PHOTO_MS = 5_000
const startPhotos = ['hero', 'hero-mango', 'hero-matcha', 'hero-coffee']

function StartPhotos() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % startPhotos.length)
    }, START_PHOTO_MS)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="hero" aria-hidden="true">
      {startPhotos.map((name, index) => (
        <img key={name} src={kioskImage(name)} alt="" data-photo={name} data-current={index === current} />
      ))}
    </div>
  )
}

function KioskToolbar({ onHome, startScreen = false, detail = false, helpOnly = false }) {
  return (
    <header className="toolbar">
      {onHome && <button onClick={onHome}><img src={kioskImage('home')} alt="" />처음으로</button>}
      {!helpOnly && <div className="flags" aria-label="언어 선택">
        {(detail ? ['ko'] : ['ko', 'en', 'ja', 'zh']).map((language) => (
          <img key={language} src={kioskImage(`flag-${language}`)} alt={language.toUpperCase()} />
        ))}
      </div>}
      <div className="toolbar-end">
        {startScreen && <span><img src={kioskImage('voucher')} alt="" />모바일상품권 조회</span>}
        <span><img src={kioskImage('help')} alt="" />직원도움요청</span>
      </div>
    </header>
  )
}

function PreviewSettings({ profile, onChange }) {
  return (
    <details className="preview">
      <summary>접근성 프로필 테스트</summary>
      <p>설정 조합을 확인하는 개발용 패널입니다.</p>
      {accessibilityOptions.map(([key, label]) => (
        <label key={key}>
          <input type="checkbox" checked={profile[key]} onChange={(event) => onChange(key, event.target.checked)} />
          {label}
        </label>
      ))}
    </details>
  )
}

const figmaUnit = (pixels) => `${pixels / 10.8}cqw`
const LARGE_TEXT_PAGE_SIZE = 9
const LOWER_CONTROLS_PAGE_SIZE = 6
const LOWER_CONTROLS_LARGE_PAGE_SIZE = 4

function paginate(pages, pageSize) {
  if (!pageSize) return pages
  const items = pages.flat()
  return Array.from({ length: Math.ceil(items.length / pageSize) }, (_, index) => (
    items.slice(index * pageSize, (index + 1) * pageSize)
  ))
}

/* 큰 글씨: 한 줄을 넘는 카테고리를 오른쪽으로 넘겨 보는 버튼 */
function MoreButton({ label }) {
  return (
    <button className="row-more" aria-label={`${label} 더 보기`}
      onClick={(event) => {
        const row = event.currentTarget.parentElement
        const scroller = row.querySelector('.subcategory-scroll')
        const target = scroller?.scrollWidth > scroller?.clientWidth ? scroller : row
        target.scrollBy({ left: target.clientWidth * .7, behavior: 'smooth' })
      }}>
      &gt;
    </button>
  )
}
const compactLabels = new Set([
  '솔티드 카라멜 라떼',
  '부드러운 고구마 생크림 케이크(쁘띠)',
  'P.바스트 치즈 케이크(고르곤졸라)',
  '[세트]부드러운 에그 잉글리쉬 머핀',
  '[세트]스크램블 에그 샌드위치',
  '[세트]크랜베리 치킨 샌드위치',
])

function ProductCard({ item, onSelect }) {
  const [label, titleTop, crop] = item.layer
  const compact = compactLabels.has(item.name)
  const [left, top, width, height, maskWidth, maskHeight] = crop ?? [0, 0, 97, 97, 97, 97]

  return (
    <button className="product" disabled={Boolean(item.availability)} onClick={onSelect}>
      {item.badge && <span className="badge" data-badge={item.badge}>{item.badge}</span>}
      <span className="product-image" style={{ width: figmaUnit(maskWidth), height: figmaUnit(maskHeight) }}>
        <img src={kioskImage(item.image)} alt="" style={{
          left: figmaUnit(left), top: figmaUnit(top), width: figmaUnit(width), height: figmaUnit(height),
        }} />
      </span>
      <strong data-lines={compact || /[\n\u2028]/.test(label) ? 'fixed' : undefined} data-compact={compact} style={{ top: figmaUnit(titleTop) }}>
        {label.replaceAll('\u2028', '\n')}
      </strong>
      <span className="product-price">{item.availability ?? won(item.price)}</span>
    </button>
  )
}

function PreviewProductImage({ item }) {
  const crop = item.layer?.[2] ?? [0, 0, 97, 97, 97, 97]
  const [left, top, width, height, maskWidth, maskHeight] = crop
  const scale = 120 / maskWidth

  return (
    <span className="lower-controls-preview-image" style={{
      width: figmaUnit(maskWidth * scale),
      height: figmaUnit(maskHeight * scale),
    }}>
      <img src={kioskImage(item.image)} alt="" style={{
        left: figmaUnit(left * scale),
        top: figmaUnit(top * scale),
        width: figmaUnit(width * scale),
        height: figmaUnit(height * scale),
      }} />
    </span>
  )
}

export default function Kiosk() {
  const [profile, setProfile] = useState(defaultProfile)
  const [screen, setScreen] = useState('start')
  const [service, setService] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [section, setSection] = useState(categories[0])
  const [page, setPage] = useState(0)
  const [product, setProduct] = useState(null)
  const [cart, setCart] = useState([])
  const cartScroll = useRef(null)
  const frame = useRef(null)
  useTouchAssist(frame, profile.touch)
  useTouchGuidance(frame, profile.guidance)
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const sections = Object.keys(catalog[category])
  const lowerControls = profile.reach && screen === 'menu'
  const largeLayout = profile.large && (!profile.reach || screen === 'start' || screen === 'menu')
  const standaloneReach = profile.reach && !largeLayout
  const pageSize = lowerControls
    ? (profile.large ? LOWER_CONTROLS_LARGE_PAGE_SIZE : LOWER_CONTROLS_PAGE_SIZE)
    : (profile.large ? LARGE_TEXT_PAGE_SIZE : null)
  const showLowerCart = lowerControls && !profile.large
  const [selectedCartKey, setSelectedCartKey] = useState(null)
  const menuItems = (catalog[category][section] ?? []).flat()
  const pages = paginate(catalog[category][section] ?? [], pageSize)
  const currentPage = Math.min(page, Math.max(pages.length - 1, 0))
  const products = standaloneReach ? menuItems : (pages[currentPage] ?? [])
  const selectedMenu = lowerControls
    ? (cart.find((item) => item.key === selectedCartKey) ?? cart.at(-1))
    : null
  const step = screen === 'complete' ? 2 : screen === 'payment' ? 1 : 0
  const showSteps = ['menu', 'review', 'payment', 'complete'].includes(screen)
  const stepLabels = ['메뉴선택', '결제하기', '주문완료']

  // 2. NFC 태그 감지 시 실행될 비동기 핸들러 (백엔드 API 연동)
  const onTagScanned = async (uid) => {
    try {
      const response = await fetch('/api/kiosks/KIOSK-001/nfc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid }),
      })

      const responseText = await response.text()
      if (!response.ok) {
        throw new Error(`NFC API 실패 (HTTP ${response.status}): ${responseText}`)
      }

      const { success, message, data: kioskData } = JSON.parse(responseText)
      if (success !== true) {
        throw new Error(message || 'NFC 처리에 실패했습니다.')
      }

      if (!kioskData) {
        throw new Error('서버 응답에 키오스크 데이터가 없습니다.')
      }

      const profileData = kioskData.profile ?? kioskData.settings
      if (!profileData) {
        throw new Error('서버 응답에서 접근성 프로필을 찾을 수 없습니다.')
      }

      setProfile({
        ...defaultProfile,
        contrast: profileData.highContrast ?? defaultProfile.contrast,
        guidance: profileData.touchGuide ?? defaultProfile.guidance,
        reach: profileData.lowerScreen ?? defaultProfile.reach,
        large: profileData.largeText ?? defaultProfile.large,
        touch: profileData.touchCorrection ?? defaultProfile.touch,
      })
    } catch (error) {
      console.error('NFC 연동 에러:', error)
      alert(`NFC 연동 실패: ${error?.message ?? '알 수 없는 오류'}`)
    }
  }

  useNfcInput({ onTagScanned })


  function selectCategory(label) {
    setCategory(label)
    setSection(Object.keys(catalog[label])[0])
    setPage(0)
  }

  function reset() {
    setScreen('start')
    setService('')
    selectCategory(categories[0])
    setProduct(null)
    setCart([])
    setSelectedCartKey(null)
    setProfile(defaultProfile)
  }

  function start(label) {
    setService(label)
    setScreen('menu')
  }

  function addToCart(item) {
    setCart((items) => {
      if (!items.some(({ key }) => key === item.key)) return [...items, item]
      return items.map((entry) => entry.key === item.key
        ? { ...entry, quantity: entry.quantity + item.quantity }
        : entry)
    })
    setSelectedCartKey(item.key)
    setProduct(null)
  }

  function changeQuantity(key, delta) {
    setCart((items) => items.map((item) => item.key === key
      ? { ...item, quantity: Math.max(1, item.quantity + delta) }
      : item))
  }

  function removeItem(key) {
    setCart((items) => items.filter((item) => item.key !== key))
    setSelectedCartKey((selected) => selected === key ? null : selected)
  }

  function changeTotalQuantity(delta) {
    if (!selectedMenu) return
    if (delta > 0 || selectedMenu.quantity > 1) {
      changeQuantity(selectedMenu.key, delta)
      return
    }
    removeItem(selectedMenu.key)
  }

  function selectProduct(item) {
    if (lowerControls && profile.large) {
      const cartItem = cart.findLast((entry) => entry.productId === item.id)
      if (cartItem) {
        setSelectedCartKey(cartItem.key)
        return
      }
    }
    setProduct(item)
  }

  return (
    <KioskFrame
      ref={frame}
      data-screen={screen}
      data-contrast={profile.contrast}
      data-guidance={profile.guidance}
      data-reach={profile.reach}
      data-touch={profile.touch}
      data-large={largeLayout}
    >
      {import.meta.env.DEV && new URLSearchParams(globalThis.location?.search).has('preview') && (
        <PreviewSettings profile={profile} onChange={(key, value) => setProfile((current) => ({ ...current, [key]: value }))} />
      )}
      {screen === 'start' ? (
        <>
          <StartPhotos />
          <KioskToolbar startScreen />
          <div className="start-actions">
            <button data-guide data-guide-label="매장 이용 시 눌러 주세요" onClick={() => start('매장')}><img src={kioskImage('dine-in')} alt="" />매장</button>
            <button data-guide data-guide-label="포장하실 때 눌러 주세요" onClick={() => start('포장')}><img src={kioskImage('takeout')} alt="" />포장</button>
          </div>
        </>
      ) : (
        <>
          {screen === 'complete' ? <KioskToolbar helpOnly /> : (
            <KioskToolbar
              onHome={['card', 'remove-card'].includes(screen) ? undefined : reset}
              detail={screen !== 'menu'}
              helpOnly={['card', 'remove-card'].includes(screen)}
            />
          )}
          {profile.reach && ['menu', 'desserts', 'review', 'payment', 'card', 'remove-card', 'bell', 'complete'].includes(screen) && (
            <aside className="lower-controls-guide">
              <img src={kioskImage('lower-controls-guide')} alt="" />
              <p>아래에서 편하게<br />선택하세요</p>
            </aside>
          )}
          {showSteps && !(profile.reach && screen !== 'menu') && <ol className="steps" aria-label="주문 단계">
            {stepLabels.map((label, index) => (
              <li key={label} data-complete={index <= step} aria-current={index === step ? 'step' : undefined}>
                {label}
                <span className="step-dot">{index <= step && <img src={kioskImage('step-completed', 'svg')} alt="" />}</span>
              </li>
            ))}
          </ol>}
          {(screen === 'menu' || (profile.reach && ['payment', 'complete'].includes(screen))) && (
              <nav className="categories" aria-label="메뉴 카테고리">
                {categories.map((label) => (
                  <button key={label} aria-pressed={label === category} onClick={() => {
                    selectCategory(label)
                    setScreen('menu')
                  }}>{label}</button>
                ))}
                {(largeLayout || lowerControls) && <MoreButton label="메뉴 카테고리" />}
              </nav>
          )}
          {screen === 'menu' ? (
            <>
              <section className="catalog" data-lower-cart={showLowerCart} aria-label="메뉴 목록">
                <nav className="subcategories" aria-label={`${category} 세부 메뉴`}>
                  <span className="subcategory-scroll">
                    {(!lowerControls || sections.length !== 1 || sections[0] !== category) && sections.map((label) => (
                      <button key={label} aria-pressed={label === section} onClick={() => {
                        setSection(label)
                        setPage(0)
                      }}>{label}</button>
                    ))}
                  </span>
                  {(largeLayout || lowerControls) && sections.length > 3 && <MoreButton label="세부 메뉴" />}
                </nav>
                <div className="product-grid" key={showLowerCart ? section : undefined}>
                  {products.map((entry, index) => {
                    const item = menuProduct(entry, category, section)
                    return <ProductCard key={standaloneReach ? `${item.id}:${index}` : item.id} item={item} onSelect={() => selectProduct(item)} />
                  })}
                </div>
                {pages.length > 0 && !showLowerCart && !standaloneReach && (
                  <nav className="pagination" aria-label="메뉴 페이지">
                    {lowerControls && (
                      <div className="lower-controls-preview">
                        {selectedMenu ? (
                          <>
                            <PreviewProductImage item={selectedMenu} />
                            <span>{selectedMenu.name}</span>
                          </>
                        ) : <span>선택 메뉴</span>}
                      </div>
                    )}
                    <button disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}>{lowerControls ? '이전' : '< 이전'}</button>
                    <span>{currentPage + 1} / {pages.length}</span>
                    <button disabled={currentPage + 1 === pages.length} onClick={() => setPage(currentPage + 1)}>{lowerControls ? '다음' : '다음 >'}</button>
                  </nav>
                )}
              </section>
              <section className="cart-preview" data-lower-cart={showLowerCart} aria-label="담은 메뉴">
                <div className="cart-scroll" ref={cartScroll}>
                  {!profile.large && <CartRows items={cart} onQuantity={changeQuantity} onRemove={removeItem}
                    selectedKey={selectedCartKey} onSelect={showLowerCart ? setSelectedCartKey : undefined} />}
                </div>
                {count > 0 && !profile.large && !showLowerCart && <div className="cart-scroll-buttons">
                  <button aria-label="장바구니 위로" onClick={() => cartScroll.current.scrollBy({ top: -cartScroll.current.clientHeight })}>⌃</button>
                  <button aria-label="장바구니 아래로" onClick={() => cartScroll.current.scrollBy({ top: cartScroll.current.clientHeight })}>⌄</button>
                </div>}
              </section>
              <footer className="order-bar" data-lower-cart={showLowerCart}>
                <div><span>총 수량</span>
                  {lowerControls && profile.large && count > 0 ? (
                    <span className="total-quantity" aria-label="장바구니 총수량">
                      <button aria-label="장바구니 총수량 줄이기" onClick={() => changeTotalQuantity(-1)}>−</button>
                      <strong><output>{count}</output><small>개</small></strong>
                      <button aria-label="장바구니 총수량 늘리기" onClick={() => changeTotalQuantity(1)}>+</button>
                    </span>
                  ) : <strong>{count}<small>개</small></strong>}
                </div>
                <div><span>합계</span><strong>{total.toLocaleString('ko-KR')}<small>원</small></strong></div>
                {showLowerCart && <aside className="lower-cart-actions">
                  <button disabled={!cart.some(item => item.key === selectedCartKey)} onClick={() => { removeItem(selectedCartKey); setSelectedCartKey(null) }}>취소하기</button>
                  <button onClick={reset}>처음으로</button>
                  <button disabled={!count} data-guide={count > 0 || undefined}
                    data-guide-label={kioskGuidanceMessages.submitOrder}
                    onClick={() => setScreen('desserts')}>주문하기</button>
                </aside>}
                {!showLowerCart && <button disabled={!count} data-guide={count > 0 || undefined}
                  data-guide-label={kioskGuidanceMessages.submitOrder}
                  onClick={() => setScreen('desserts')}>주문하기</button>}
              </footer>
            </>
          ) : (
            <Checkout reach={profile.reach} screen={screen} navigate={setScreen} reset={reset} service={service} cart={cart}
              count={count} total={total} onAdd={addToCart} onQuantity={changeQuantity} onRemove={removeItem}
              onDessertMenu={() => { selectCategory('디저트'); setScreen('menu') }} />
          )}
        </>
      )}
      {product && (
        <ProductOptions key={product.id} product={product} service={service} lowerReach={profile.reach} onClose={() => setProduct(null)} onAdd={addToCart}>
          <KioskToolbar detail onHome={reset} />
        </ProductOptions>
      )}
    </KioskFrame>
  )
}
