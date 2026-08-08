import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({children}){
  const [cart, setCart] = useState([])

  function addItem(product, quantity = 1){
    setCart(prev => {
      const found = prev.find(it => it.product.id === product.id)
      if(found){
        return prev.map(it => it.product.id === product.id ? {...it, quantity: it.quantity + quantity} : it)
      }
      return [...prev, {product, quantity}]
    })
  }
  function removeItem(productId){
    setCart(prev => prev.filter(it => it.product.id !== productId))
  }
  function updateQuantity(productId, quantity){
    if(quantity <= 0) return removeItem(productId)
    setCart(prev => prev.map(it => it.product.id === productId ? {...it, quantity} : it))
  }
  function clearCart(){ setCart([]) }

  return (
    <CartContext.Provider value={{cart, addItem, removeItem, updateQuantity, clearCart}}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(){
  const ctx = useContext(CartContext)
  if(!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
