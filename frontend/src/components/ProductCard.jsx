import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Stars } from './Icons'
import Price from './Price'

export default function ProductCard({product}){
  const { addItem } = useCart()
  return (
    <div className="card">
      <Link to={`/product/${product.id}`} className="thumb">
        {product.badge && <span className="badge">{product.badge}</span>}
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="rating">
        <Stars rating={product.rating} />
        <span>{product.rating} ({product.reviews})</span>
      </div>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h3>{product.name}</h3>
      </Link>
      <p className="price"><Price amount={product.price} /></p>
      <p className="muted">{product.description}</p>
      <div className="actions">
        <Link to={`/product/${product.id}`} className="btn btn-secondary">View</Link>
        <button className="btn btn-accent" onClick={() => addItem(product, 1)}>Add to cart</button>
      </div>
    </div>
  )
}
