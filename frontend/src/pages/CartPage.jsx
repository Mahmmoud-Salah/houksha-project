import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { BagIcon, ShieldIcon, TruckIcon, RefreshIcon } from '../components/Icons'
import Price from '../components/Price'

const FREE_SHIPPING_THRESHOLD = 75
const SHIPPING_COST = 6.99

export default function CartPage(){
  const { cart, removeItem, updateQuantity, clearCart } = useCart()
  const navigate = useNavigate()
  const subtotal = cart.reduce((s, it) => s + it.product.price * it.quantity, 0)
  const shipping = cart.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  return (
    <div className="cart-page">
      <h1>Your cart</h1>
      {cart.length === 0 ? (
        <div className="empty-state">
          <BagIcon width={32} height={32} style={{ margin: '0 auto', color: 'var(--ink-faint)' }} />
          <h2>Your cart is empty</h2>
          <p>Add something you'll love — it only takes a minute.</p>
          <Link to="/" className="btn btn-accent btn-lg">Continue shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {cart.map(it => (
              <div key={it.product.id} className="cart-item">
                <img src={it.product.image} alt={it.product.name} />
                <div className="info">
                  <div className="top-row">
                    <strong>{it.product.name}</strong>
                    <span className="line-price"><Price amount={it.product.price * it.quantity} /></span>
                  </div>
                  <p><Price amount={it.product.price} /> each</p>
                  <div className="row">
                    <div className="qty-stepper">
                      <button onClick={() => updateQuantity(it.product.id, it.quantity - 1)} aria-label="Decrease quantity">−</button>
                      <span>{it.quantity}</span>
                      <button onClick={() => updateQuantity(it.product.id, it.quantity + 1)} aria-label="Increase quantity">+</button>
                    </div>
                    <button className="link-btn" onClick={() => removeItem(it.product.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
            <button className="link-btn" style={{ alignSelf: 'flex-start' }} onClick={clearCart}>Clear cart</button>
          </div>

          <div className="summary-card">
            <h3>Order summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span><Price amount={subtotal} /></span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : <Price amount={shipping} />}</span>
            </div>
            {shipping > 0 && (
              <div className="summary-row">
                <span style={{ color: 'var(--accent-dark)' }}>
                  Add <Price amount={FREE_SHIPPING_THRESHOLD - subtotal} /> more for free shipping
                </span>
              </div>
            )}
            <div className="summary-row total">
              <span>Total</span>
              <span><Price amount={total} /></span>
            </div>
            <button className="btn btn-accent btn-lg btn-block" onClick={() => navigate('/checkout')}>
              Checkout
            </button>
            <div className="trust-mini" style={{ marginTop: 18, paddingTop: 18 }}>
              <span className="item"><ShieldIcon width={14} height={14} /> Secure checkout</span>
              <span className="item"><TruckIcon width={14} height={14} /> Fast shipping</span>
              <span className="item"><RefreshIcon width={14} height={14} /> Free returns</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
