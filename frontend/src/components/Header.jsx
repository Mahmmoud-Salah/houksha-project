import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { CartIcon, Logo } from './Icons'

export default function Header(){
  const { cart } = useCart()
  const itemCount = cart.reduce((s, it) => s + it.quantity, 0)
  return (
    <>
      <div className="announce">Free shipping on orders over SAR 75 &nbsp;·&nbsp; 30-day easy returns</div>
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="brand" viewTransition>
            <Logo size={26} className="brand-mark" />
            <span className="brand-word">Houksha</span>
          </Link>
          <nav className="nav">
            <Link to="/" viewTransition>Shop</Link>
            <Link to="/cart" className="cart-link" viewTransition>
              <CartIcon width={16} height={16} />
              Cart
              {itemCount > 0 && <span className="cart-badge" key={itemCount}>{itemCount}</span>}
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}
