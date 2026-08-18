import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { ShoppingCart } from 'lucide-react'

export default function Navbar() {
  const { cantidadTotal } = useCart()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const alScrollear = () => {
      setScrolled(window.scrollY > 40) // umbral: a partir de 40px de scroll
    }
    window.addEventListener('scroll', alScrollear)
    return () => window.removeEventListener('scroll', alScrollear)
  }, [])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled
          ? 'rgba(250,127,25,.55)'   
          : 'rgba(250,127,25,1)',    
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: '1px solid rgba(30,58,95,.15)',
        transition: 'background .3s ease, backdrop-filter .3s ease'
      }}
    >
      <div
        className="wrap"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 0'
        }}
      >
        {/* LOGO */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}> Apolo Vibes 3D
        </Link>

        <nav
          style={{
            display: 'flex',
            gap: 36,
            fontSize: 14,
            color: '#FBF7EE'
          }}
        >
          <Link to="/categorias">Categorías</Link>
          <Link to="/cotizar">Cotiza tu producto</Link>
          <Link to="/">Nosotros</Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Link to="/carrito" className="cart-icon" aria-label="Carrito" style={{ color: '#FBF7EE' }}>
            <ShoppingCart size={24} />
            {cantidadTotal > 0 && (
              <span className="cart-badge">{cantidadTotal}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}