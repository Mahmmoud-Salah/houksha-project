import React from 'react'

export default function Footer(){
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="brand">
          <span className="brand-mark" />
          Houksha
        </span>
        <p>&copy; {new Date().getFullYear()} Houksha Shop. All rights reserved.</p>
      </div>
    </footer>
  )
}
