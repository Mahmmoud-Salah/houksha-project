import React from 'react'
import products from '../data/products'
import ProductCard from './ProductCard'
import Hero from './Hero'
import TrustStrip from './TrustStrip'

export default function ProductList(){
  return (
    <>
      <Hero />
      <TrustStrip />
      <section id="products" style={{ scrollMarginTop: 90 }}>
        <div className="section-head">
          <div>
            <h2>Shop bestsellers</h2>
            <p>{products.length} handpicked products, ready to ship today.</p>
          </div>
        </div>
        <div className="products">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  )
}
