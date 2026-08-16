import React from 'react'
import { TruckIcon, ShieldIcon, RefreshIcon } from './Icons'

export default function Hero(){
  return (
    <section className="hero">
      <div>
        <span className="hero-eyebrow">New season, just landed</span>
        <h1>Goods worth <span>keeping</span>, delivered fast.</h1>
        <p className="lead">
          A tightly curated shop of everyday essentials — built to last, priced fairly,
          and shipped in days, not weeks.
        </p>
        <div className="hero-ctas">
          <a href="#products" className="btn btn-accent btn-lg">Shop the collection</a>
          <a href="#products" className="btn btn-secondary btn-lg">Browse bestsellers</a>
        </div>
        <div className="hero-trust">
          <span className="item"><TruckIcon width={16} height={16} /> Free shipping over SAR 75</span>
          <span className="item"><ShieldIcon width={16} height={16} /> Secure checkout</span>
          <span className="item"><RefreshIcon width={16} height={16} /> 30-day returns</span>
        </div>
      </div>
      <div className="hero-visual">
        <img
          src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1000&auto=format&fit=crop"
          alt="Featured product styled on a clean backdrop"
        />
        <div className="hero-float-card">
          <div>
            <div className="label">Loved by shoppers</div>
            <div className="sub stars">★★★★★</div>
          </div>
          <div className="sub">4.8 average rating</div>
        </div>
      </div>
    </section>
  )
}
