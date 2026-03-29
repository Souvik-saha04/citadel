import { useState } from "react";
import "./confirm_page.css";
import { useNavigate } from "react-router-dom";
// ── DATA ────────────────────────────────────────────────────
const ORDER_ITEMS = [
  {
    id: 1,
    emoji: "💻",
    name: "MacBook Air M3",
    brand: "Apple",
    specs: ["13.6\" Retina", "8GB RAM", "256GB SSD", "Midnight"],
    price: 114900,
    qty: 1,
  },
  {
    id: 2,
    emoji: "📱",
    name: "iPhone 15 Pro",
    brand: "Apple",
    specs: ["6.1\" OLED", "256GB", "Natural Titanium", "5G"],
    price: 134900,
    qty: 1,
  },
  {
    id: 3,
    emoji: "🖥️",
    name: 'Dell 27" 4K Monitor',
    brand: "Dell",
    specs: ["27\" IPS", "4K UHD", "USB-C", "60Hz"],
    price: 38999,
    qty: 1,
  },
  {
    id: 4,
    emoji: "🖱️",
    name: "Logitech MX Master 3S",
    brand: "Logitech",
    specs: ["Wireless", "8000 DPI", "USB-C", "Graphite"],
    price: 8495,
    qty: 2,
  },
];

const TIPS = [
  { label: "₹20", emoji: "🍪", value: 20 },
  { label: "₹30", emoji: "🎁", value: 30, popular: true },
  { label: "₹50", emoji: "⭐", value: 50 },
  { label: "₹100", emoji: "🙌", value: 100 },
];

// ── HELPERS ─────────────────────────────────────────────────
const fmt = (n) =>
  "₹" + n.toLocaleString("en-US");

// ── COMPONENT ───────────────────────────────────────────────
export default function OrderConfirmation() {
  const [activeTip, setActiveTip] = useState(null);

  const subtotal = ORDER_ITEMS.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = 49;
  const discount = 500;
  const tipAmt = activeTip ?? 0;
  const total = subtotal + delivery - discount + tipAmt;
  const navigate=useNavigate();

  return (
    <div className="con-page-wrapper">
      {/* ── HEADER ── */}
      <header className="con-header">
        <div className="con-header-top">
          <button className="con-back-btn" aria-label="Go back" onClick={()=>{navigate('/cart')}}>←</button>
          <span className="con-header-label">Order is on the way</span>
        </div>
        <div className="con-header-title">Arriving in 12 minutes</div>
        <span className="con-eta-badge">
          <span className="con-eta-dot" />
          Live tracking active
        </span>
      </header>

      {/* ── MAP ── */}
      <div className="con-map-strip" role="img" aria-label="Delivery route map">
        <div className="con-map-bg" />
        <div className="con-map-road" />
        <div className="con-map-road-v" />
        <div className="con-route-line" />
        <div className="con-map-pin">
          <div className="con-pin-circle">📍</div>
          <div className="con-pin-stem" />
        </div>
        <div className="con-rider-icon" title="Delivery partner">🛵</div>
        <div className="con-map-google">© Google</div>
      </div>

      {/* ── CONTENT ── */}
      <div className="con-content">

        {/* ── DELIVERY PARTNER ── */}
        <div className="con-card">
          <div className="con-partner-card">
            <div className="con-partner-avatar">🧑‍🦱</div>
            <div className="con-partner-info">
              <div className="con-partner-name">I'm Shekhar, your delivery partner</div>
              <div className="con-partner-status">📦 Picked up · On the way</div>
            </div>
            <button className="con-call-btn" aria-label="Call delivery partner">📞</button>
          </div>
        </div>

        {/* ── TIP ── */}
        <div className="con-card">
          <div className="con-tip-card">
            <div className="con-tip-title">Delivering happiness at your doorstep!</div>
            <div className="con-tip-sub">Thank them by leaving a tip</div>
            <div className="con-tip-options">
              {TIPS.map((t) => (
                <div key={t.value} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <button
                    className={`con-tip-btn${activeTip === t.value ? " active" : ""}`}
                    onClick={() => setActiveTip(activeTip === t.value ? null : t.value)}
                  >
                    <span>{t.emoji}</span> {t.label}
                  </button>
                  {t.popular && <span className="con-tip-most">MOST TIPPED</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ORDER ITEMS ── */}
        <div className="con-card">
          <div className="con-order-items-header">
            <span className="con-section-title">Your Order</span>
            <span className="con-order-count">{ORDER_ITEMS.length} items</span>
          </div>
          {ORDER_ITEMS.map((item) => (
            <div className="con-order-item" key={item.id}>
              <div className="con-item-img" role="img" aria-label={item.name}>
                {item.emoji}
              </div>
              <div className="con-item-details">
                <div className="con-item-name" title={item.name}>{item.name}</div>
                <div className="con-item-brand">{item.brand}</div>
                <div className="con-item-spec-tags">
                  {item.specs.map((s) => (
                    <span className="con-item-tag" key={s}>{s}</span>
                  ))}
                </div>
              </div>
              <div className="con-item-right">
                <div className="con-item-price">{fmt(item.price)}</div>
                <div className="con-item-qty">Qty: {item.qty}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── PRICE SUMMARY ── */}
        <div className="con-card">
          <div className="con-summary-card">
            <div className="con-summary-row">
              <span className="con-summary-label">Subtotal ({ORDER_ITEMS.length} items)</span>
              <span className="con-summary-value">{fmt(subtotal)}</span>
            </div>
            <div className="con-summary-row">
              <span className="con-summary-label">Delivery fee</span>
              <span className="con-summary-value">{fmt(delivery)}</span>
            </div>
            <div className="con-summary-row discount">
              <span className="con-summary-label">Blinkit discount</span>
              <span className="con-summary-value">−{fmt(discount)}</span>
            </div>
            {tipAmt > 0 && (
              <div className="con-summary-row">
                <span className="con-summary-label">Tip for Shekhar</span>
                <span className="con-summary-value">{fmt(tipAmt)}</span>
              </div>
            )}
            <div className="con-summary-row total">
              <span>Total</span>
              <span>{fmt(total)}</span>
            </div>
          </div>
        </div>

        {/* ── SAFETY STRIP ── */}
        <div className="con-safety-strip" role="button" tabIndex={0}>
          <div className="con-safety-icon">🛡️</div>
          <div className="con-safety-text">
            <strong>Your Blinkit store is only 0.5 km away</strong>
            <span>Learn about delivery partner safety</span>
          </div>
          <div className="con-safety-chevron">›</div>
        </div>

        {/* ── PAY ROW ── */}
        <div className="con-pay-row">
          <div>
            <div className="con-pay-label">Pay before or on delivery</div>
            <div className="con-pay-method">Cash on Delivery</div>
          </div>
          <div className="con-pay-amount">{fmt(total)}</div>
        </div>

        {/* ── GO HOME ── */}
        <div className="con-home-btn-wrap">
          <button className="con-home-btn" onClick={()=>{navigate("/")}}>
            <span>🏠</span> Go to Home
          </button>
        </div>

      </div>
    </div>
  );
}