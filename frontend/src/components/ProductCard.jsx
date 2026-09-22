import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Stars } from './Icons'
import Price from './Price'

export default function ProductCard({product, index = 0}){
  const { addItem } = useCart()
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="card reveal-item" style={{ '--stagger': Math.min(index, 6) }}>
      <Link to={`/product/${product.id}`} className="thumb" viewTransition>
        {product.badge && <span className="badge">{product.badge}</span>}
        <img
          src={product.image}
          alt={product.name}
          className={loaded ? 'is-loaded' : ''}
          onLoad={() => setLoaded(true)}
        />
      </Link>
      <div className="rating">
        <Stars rating={product.rating} />
        <span>{product.rating} ({product.reviews})</span>
      </div>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }} viewTransition>
        <h3>{product.name}</h3>
      </Link>
      <p className="price"><Price amount={product.price} /></p>
      <p className="muted">{product.description}</p>
      <div className="actions">
        <Link to={`/product/${product.id}`} className="btn btn-secondary" viewTransition>View</Link>
        <button className="btn btn-accent" onClick={() => addItem(product, 1)}>Add to cart</button>
      </div>
    </div>
  )
}
