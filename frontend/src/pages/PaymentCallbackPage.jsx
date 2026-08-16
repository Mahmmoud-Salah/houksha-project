import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function PaymentCallbackPage() {
  const [searchParams] = useSearchParams()
  const paymentId = searchParams.get('id')
  const { clearCart } = useCart()

  React.useEffect(() => {
    if (paymentId) clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentId])

  return (
    <div className="cart-page">
      {paymentId ? (
        <div className="empty-state">
          <h2>Payment received</h2>
          <p>
            Payment <code>{paymentId}</code> was submitted. Verify its status, amount, and
            currency on your backend via Moyasar's Fetch Payment API before confirming the
            order — never trust this redirect alone.
          </p>
          <Link to="/" className="btn btn-accent btn-lg">Continue shopping</Link>
        </div>
      ) : (
        <div className="empty-state">
          <h2>No payment found</h2>
          <p>This page is reached after a Moyasar checkout redirect.</p>
          <Link to="/" className="btn btn-accent btn-lg">Back to shop</Link>
        </div>
      )}
    </div>
  )
}
