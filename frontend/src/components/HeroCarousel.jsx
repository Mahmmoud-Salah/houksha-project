import React, { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function HeroCarousel({ slides, floatCard, intervalMs = 4500 }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [loaded, setLoaded] = useState(() => new Set())
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (paused || reducedMotion || slides.length < 2) return
    const id = setInterval(() => {
      setIndex(i => (i + 1) % slides.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [paused, reducedMotion, slides.length, intervalMs])

  function markLoaded(i) {
    setLoaded(prev => (prev.has(i) ? prev : new Set(prev).add(i)))
  }

  return (
    <div className="hero-visual-col">
      <div
        className="hero-visual"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`hero-carousel-slide${i === index ? ' is-active' : ''}${loaded.has(i) ? ' is-loaded' : ''}`}
            onLoad={() => markLoaded(i)}
          />
        ))}
        {floatCard}
      </div>
      {slides.length > 1 && (
        <div className="hero-carousel-dots" role="tablist" aria-label="Featured images">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show image ${i + 1} of ${slides.length}`}
              className={`hero-carousel-dot${i === index ? ' is-active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
