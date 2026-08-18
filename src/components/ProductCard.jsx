import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { Star, ShoppingCart, Plus } from 'lucide-react'

const ACENTOS = ['#FA7F19', '#F6D976', '#E8863E']

export default function ProductCard({ producto, index = 0 }) {
  const { agregarProducto } = useCart()
  const acento = ACENTOS[index % ACENTOS.length]

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Imagen con glow de color detrás */}
      <Link to={`/producto/${producto.id}`} style={{ position: 'relative', display: 'block' }}>
        <div
          style={{
            position: 'relative',
            height: 200,
            background: `radial-gradient(circle at 50% 40%, ${acento}33 0%, var(--surface) 70%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {producto.imagen ? (
            <img
              src={producto.imagen}
              alt={producto.nombre}
              style={{ maxHeight: '75%', maxWidth: '75%', objectFit: 'contain' }}
            />
          ) : (
            <div style={{ width: 90, height: 90, borderRadius: 12, background: 'var(--surface-2)' }} />
          )}
        </div>

        {/* Badge: sin stock o descuento (prioridad a sin stock si ambos aplican) */}
        {producto.sinStock ? (
          <span
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'var(--surface-2)',
              color: 'var(--text-dim)',
              border: '1px solid var(--line)',
              fontSize: 11,
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: 999,
            }}
          >
            Sin stock
          </span>
        ) : producto.descuento ? (
          <span
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: acento,
              color: '#0B0D10',
              fontSize: 11,
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: 999,
            }}
          >
            -{producto.descuento}%
          </span>
        ) : null}
      </Link>

      {/* Contenido */}
      <div style={{ padding: '18px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{producto.nombre}</h4>

        {producto.specs && producto.specs.length > 0 && (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {producto.specs.slice(0, 3).map((spec, i) => (
              <li
                key={i}
                style={{
                  fontSize: 12,
                  color: 'var(--text-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: acento, flexShrink: 0 }} />
                {spec}
              </li>
            ))}
          </ul>
        )}

        {producto.rating && (
          <div style={{ display: 'flex', gap: 2 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < producto.rating ? acento : 'none'}
                color={i < producto.rating ? acento : 'var(--line)'}
              />
            ))}
          </div>
        )}

        {/* Precio + botón, en la misma fila */}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>
            ${producto.precio.toLocaleString('es-CL')}
          </span>

          <button
            onClick={() => agregarProducto(producto)}
            disabled={producto.sinStock}
            aria-label="Agregar al carrito"
            style={{
              background: producto.sinStock ? 'var(--surface-2)' : acento,
              color: producto.sinStock ? 'var(--text-dim)' : '#0B0D10',
              border: 'none',
              borderRadius: 999,
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: producto.sinStock ? 'not-allowed' : 'pointer',
              transition: 'opacity .2s',
              flexShrink: 0,
              position: 'relative',
            }}
            onMouseEnter={(e) => !producto.sinStock && (e.currentTarget.style.opacity = '.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <ShoppingCart size={16} />
            <Plus size={11} style={{ position: 'absolute', top: 5, right: 5 }} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  )
}