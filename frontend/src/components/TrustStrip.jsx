import React from 'react'
import { TruckIcon, ShieldIcon, RefreshIcon, CheckCircleIcon } from './Icons'
import { useInView } from '../hooks/useInView'

const items = [
  { icon: TruckIcon, title: 'Free shipping', sub: 'On orders over SAR 75' },
  { icon: RefreshIcon, title: 'Easy returns', sub: '30 days, no questions' },
  { icon: ShieldIcon, title: 'Secure checkout', sub: '256-bit encryption' },
  { icon: CheckCircleIcon, title: 'Quality checked', sub: 'Every item inspected' },
]

export default function TrustStrip(){
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`trust-strip reveal-group${inView ? ' is-visible' : ''}`}>
      {items.map(({ icon: Icon, title, sub }, i) => (
        <div className="item reveal-item" style={{ '--stagger': i }} key={title}>
          <span className="ic"><Icon width={18} height={18} /></span>
          <span>
            <strong>{title}</strong>
            <span>{sub}</span>
          </span>
        </div>
      ))}
    </div>
  )
}
