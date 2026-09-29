import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { CheckCircleIcon, XCircleIcon, CopyIcon } from '../components/Icons'

const SUCCESS_STATUSES = ['paid', 'authorized', 'captured']

export default function PaymentCallbackPage() {
  const [searchParams] = useSearchParams()
  const paymentId = searchParams.get('id')
  const status = searchParams.get('status')
  const message = searchParams.get('message')
  const { clearCart } = useCart()
  const [copied, setCopied] = useState(false)

  const isSuccess = SUCCESS_STATUSES.includes(status)

  React.useEffect(() => {
    if (paymentId && isSuccess) clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentId, isSuccess])

  function copyId() {
    navigator.clipboard?.writeText(paymentId)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  if (!paymentId) {
    return (
      <div className="payment-result">
        <div className="result-icon neutral">
          <XCircleIcon width={30} height={30} />
        </div>
        <h1>No payment found</h1>
        <p className="result-sub">This page is only reached after a Moyasar checkout redirect.</p>
        <div className="result-actions">
          <Link to="/" className="btn btn-accent btn-lg" viewTransition>Back to shop</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="payment-result">
      <div className={`result-icon ${isSuccess ? 'success' : 'failure'}`}>
        {isSuccess ? <CheckCircleIcon width={30} height={30} /> : <XCircleIcon width={30} height={30} />}
      </div>

      <h1>{isSuccess ? 'Payment confirmed' : 'Payment didn’t go through'}</h1>
      <p className="result-sub">
        {isSuccess
          ? "You're all set. A confirmation has been recorded for your order."
          : message || 'The payment was declined or cancelled. No charge was made.'}
      </p>

      <div className="result-id-row">
        <span className="result-id-label">Payment ID</span>
        <code className="result-id">{paymentId}</code>
        <button type="button" className="result-copy" onClick={copyId} aria-label="Copy payment ID">
          <CopyIcon width={14} height={14} />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="result-actions">
        {isSuccess ? (
          <Link to="/" className="btn btn-accent btn-lg" viewTransition>Continue shopping</Link>
        ) : (
          <>
            <Link to="/checkout" className="btn btn-accent btn-lg" viewTransition>Try again</Link>
            <Link to="/" className="btn btn-secondary btn-lg" viewTransition>Back to shop</Link>
          </>
        )}
      </div>

      <p className="result-footnote">
        This screen only reflects the redirect. Confirm the final payment details server-side
        via Moyasar's Fetch Payment API before shipping any order.
      </p>
    </div>
  )
}
