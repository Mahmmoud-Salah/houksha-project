import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { CartIcon } from './Icons'

export default function Header(){
  const { cart } = useCart()
  const itemCount = cart.reduce((s, it) => s + it.quantity, 0)
  return (
    <>
      <div className="announce">Free shipping on orders over $75 &nbsp;·&nbsp; 30-day easy returns</div>
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="brand">
            <span className="brand-mark" />
            Houksha
          </Link>
          <nav className="nav">
            <Link to="/">Shop</Link>
            <Link to="/cart" className="cart-link">
              <CartIcon width={16} height={16} />
              Cart
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}
