import React from 'react'
import { Logo } from './Icons'

export default function Footer(){
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="brand">
          <Logo size={24} className="brand-mark" />
          <span className="brand-word">Houksha</span>
        </span>
        <p>&copy; {new Date().getFullYear()} Houksha Shop. All rights reserved.</p>
      </div>
    </footer>
  )
}
