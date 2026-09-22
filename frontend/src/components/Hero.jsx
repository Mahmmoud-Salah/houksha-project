import React from 'react'
import { TruckIcon, ShieldIcon, RefreshIcon } from './Icons'
import HeroCarousel from './HeroCarousel'
import products from '../data/products'

const HERO_SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1000&auto=format&fit=crop',
    alt: 'Featured flat-lay of Houksha essentials',
  },
  ...products.map(p => ({ src: p.image, alt: p.name })),
]

const HEADLINE_WORDS = [
  { text: 'Goods' },
  { text: 'worth' },
  { text: 'keeping,', accent: 'keeping', suffix: ',' },
  { text: 'delivered' },
  { text: 'fast.' },
]

export default function Hero(){
  return (
    <section className="hero">
      <div>
        <span className="hero-eyebrow">New season, just landed</span>
        <h1 className="hero-headline">
          {HEADLINE_WORDS.map((word, i) => (
            <React.Fragment key={word.text}>
              <span className="word" style={{ '--w': i }}>
                {word.accent ? <><span className="accent">{word.accent}</span>{word.suffix}</> : word.text}
              </span>
              {i < HEADLINE_WORDS.length - 1 && ' '}
            </React.Fragment>
          ))}
        </h1>
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
      <HeroCarousel
        slides={HERO_SLIDES}
        floatCard={
          <div className="hero-float-card">
            <div>
              <div className="label">Loved by shoppers</div>
              <div className="sub stars">★★★★★</div>
            </div>
            <div className="sub">4.8 average rating</div>
          </div>
        }
      />
    </section>
  )
}
