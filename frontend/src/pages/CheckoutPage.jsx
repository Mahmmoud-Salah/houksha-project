import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Price from '../components/Price'

const FREE_SHIPPING_THRESHOLD = 75
const SHIPPING_COST = 6.99
const CURRENCY = 'SAR'
const MERCHANT_COUNTRY = 'SA'
const PUBLISHABLE_KEY = import.meta.env.VITE_MOYASAR_PUBLISHABLE_KEY
const SAMSUNG_PAY_SERVICE_ID = import.meta.env.VITE_SAMSUNG_PAY_SERVICE_ID
const SAMSUNG_PAY_ENVIRONMENT = import.meta.env.VITE_SAMSUNG_PAY_ENVIRONMENT || 'STAGE'

export default function CheckoutPage() {
  const { cart } = useCart()
  const navigate = useNavigate()
  const formRef = useRef(null)

  const subtotal = cart.reduce((s, it) => s + it.product.price * it.quantity, 0)
  const shipping = cart.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart', { replace: true })
      return
    }
    if (!PUBLISHABLE_KEY) {
      console.error('VITE_MOYASAR_PUBLISHABLE_KEY is not set — skipping Moyasar init')
      return
    }
    if (!window.Moyasar) {
      console.error('Moyasar Form script did not load')
      return
    }

    const methods = ['creditcard', 'applepay', 'stcpay']
    if (SAMSUNG_PAY_SERVICE_ID) methods.push('samsungpay')

    window.Moyasar.init({
      element: '.mysr-form',
      amount: Math.round(total * 100),
      currency: CURRENCY,
      description: `Houksha Shop order (${cart.length} item${cart.length > 1 ? 's' : ''})`,
      publishable_api_key: PUBLISHABLE_KEY,
      callback_url: `${window.location.origin}/payment/callback`,
      supported_networks: ['visa', 'mastercard', 'mada'],
      methods,
      apple_pay: {
        country: MERCHANT_COUNTRY,
        label: 'Houksha Shop',
        validate_merchant_url: 'https://api.moyasar.com/v1/applepay/initiate',
      },
      ...(SAMSUNG_PAY_SERVICE_ID && {
        samsung_pay: {
          service_id: SAMSUNG_PAY_SERVICE_ID,
          order_number: `houksha-${Date.now()}`,
          label: 'Houksha Shop',
          country: MERCHANT_COUNTRY,
          environment: SAMSUNG_PAY_ENVIRONMENT,
        },
      }),
      on_completed: async function (payment) {
        sessionStorage.setItem('lastPaymentId', payment.id)
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="cart-layout">
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
          <div className="summary-row total">
            <span>Total</span>
            <span><Price amount={total} /></span>
          </div>
          <Link to="/cart" className="link-btn" viewTransition>Back to cart</Link>
        </div>
        <div>
          {!PUBLISHABLE_KEY && (
            <p style={{ color: 'var(--accent-dark)' }}>
              Set VITE_MOYASAR_PUBLISHABLE_KEY in your .env file to enable payments.
            </p>
          )}
          <div className="mysr-form" ref={formRef}></div>
        </div>
      </div>
    </div>
  )
}
