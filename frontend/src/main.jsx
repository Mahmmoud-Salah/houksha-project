import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import ProductList from './components/ProductList'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import PaymentCallbackPage from './pages/PaymentCallbackPage'
import { CartProvider } from './context/CartContext'
import './index.css'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <ProductList /> },
      { path: '/product/:id', element: <ProductPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/checkout', element: <CheckoutPage /> },
      { path: '/payment/callback', element: <PaymentCallbackPage /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
)
