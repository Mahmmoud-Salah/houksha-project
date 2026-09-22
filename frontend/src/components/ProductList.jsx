import React from 'react'
import products from '../data/products'
import ProductCard from './ProductCard'
import Hero from './Hero'
import TrustStrip from './TrustStrip'
import { useInView } from '../hooks/useInView'

export default function ProductList(){
  const [gridRef, gridInView] = useInView()
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
        <div ref={gridRef} className={`products reveal-group${gridInView ? ' is-visible' : ''}`}>
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
