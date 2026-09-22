import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import products from '../data/products'
import { useCart } from '../context/CartContext'
import { Stars, TruckIcon, ShieldIcon, RefreshIcon } from '../components/Icons'
import Price from '../components/Price'

export default function ProductPage(){
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => String(p.id) === String(id))
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)

  if(!product) return <div style={{padding:40}}>Product not found</div>

  function handleAddToCart(){
    addItem(product, qty)
  }

  function handleBuyNow(){
    addItem(product, qty)
    navigate('/cart', { viewTransition: true })
  }

  return (
    <div>
      <div className="breadcrumb">
        <Link to="/" viewTransition>Shop</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>
      <div className="product-detail">
        <div className="product-gallery">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="buy-box">
          {product.badge && <span className="badge" style={{position:'static', display:'inline-block', marginBottom:12}}>{product.badge}</span>}
          <h1>{product.name}</h1>
          <div className="rating">
            <Stars rating={product.rating} />
            <span>{product.rating} · {product.reviews} reviews</span>
          </div>
          <div className="price-row">
            <span className="price"><Price amount={product.price} size={22} /></span>
          </div>
          <span className="in-stock">In stock, ready to ship</span>
          <p className="desc">{product.description}</p>

          <div className="qty-row">
            <div className="qty-stepper">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} aria-label="Increase quantity">+</button>
            </div>
          </div>

          <div className="buy-box-actions">
            <button className="btn btn-accent btn-lg btn-block" onClick={handleBuyNow}>Buy now</button>
            <button className="btn btn-secondary btn-lg btn-block" onClick={handleAddToCart}>Add to cart</button>
          </div>

          <div className="trust-mini">
            <span className="item"><TruckIcon width={15} height={15} /> Free shipping over SAR 75</span>
            <span className="item"><ShieldIcon width={15} height={15} /> Secure checkout</span>
            <span className="item"><RefreshIcon width={15} height={15} /> 30-day returns</span>
          </div>
        </div>
      </div>
    </div>
  )
}
