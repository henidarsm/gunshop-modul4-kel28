import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import Cart from './pages/Cart.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  // { [gun name]: quantity }
  const [cart, setCart] = useState({})

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  function setQty(name, qty) {
    setCart((prev) => {
      const next = { ...prev }
      if (qty > 0) next[name] = qty
      else delete next[name]
      return next
    })
  }

  function addToCart(name) {
    setCart((prev) => ({ ...prev, [name]: (prev[name] ?? 0) + 1 }))
  }

  return (
    <div className="shell">
      <Header tab={tab} onTab={setTab} cartCount={cartCount} />

      <main className="main">
        {tab === 'Catalog' && <Catalog cart={cart} onAdd={addToCart} />}
        {tab === 'Cart' && <Cart cart={cart} onQty={setQty} onBrowse={() => setTab('Catalog')} />}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
      </main>

      <Footer />
    </div>
  )
}

export default App
