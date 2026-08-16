import React from 'react'
import { SarIcon } from './Icons'

export default function Price({ amount, size = 15 }) {
  return (
    <span className="price-amount">
      <SarIcon size={size} />
      {amount.toFixed(2)}
    </span>
  )
}
