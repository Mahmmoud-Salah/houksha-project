import React from 'react'
import sarSymbol from '../assets/sar-symbol.png'

const base = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

export function TruckIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}

export function ShieldIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function RefreshIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M21 12a9 9 0 1 1-2.6-6.3" />
      <path d="M21 3v6h-6" />
    </svg>
  )
}

export function CartIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
    </svg>
  )
}

export function CheckCircleIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function XCircleIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  )
}

export function CopyIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

export function BagIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

export function Logo({ size = 26, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" {...props}>
      <rect x="4" y="4" width="18" height="18" rx="6" fill="var(--accent)" />
      <circle cx="21" cy="21" r="9" fill="var(--accent-dark)" />
    </svg>
  )
}

export function SarIcon({ size = 15, style, ...props }) {
  return (
    <img
      src={sarSymbol}
      alt="SAR"
      style={{ height: size, width: 'auto', display: 'inline-block', ...style }}
      {...props}
    />
  )
}

export function Stars({ rating = 5 }) {
  const full = Math.round(rating)
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
    </span>
  )
}
