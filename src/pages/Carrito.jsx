
import { Link } from 'react-router-dom'
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

export default function Carrito() {
  const { items, quitarProducto, actualizarCantidad, total } = useCart()

  if (items.length === 0) {
    return (
    <div className="wrap" style={{ padding: '80px 0', textAlign: 'center' }} > 
    <ShoppingCart size={64} strokeWidth={1.5} style={{ display: 'block', margin: '0 auto 20px', color: 'var(--text-dim)' }} 
    /> 
    <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}> Tu carrito está vacío. </p> 
    <Link to="/categorias" className="btn btn-primary"> Ver catálogo 
    </Link> 
    </div>
    )
  }

  return (
    <section className="wrap" style={{ padding: '48px 0 80px' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28,
          marginBottom: 30
        }}
      >
        Tu carrito
      </h1>

      {items.map(item => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 0',
            borderBottom: '1px solid var(--line)'
          }}
        >
          <div>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>
              {item.nombre}
            </p>

            <span
              style={{
                fontSize: 12,
                color: 'var(--text-dim)'
              }}
            >
              ${item.precio.toLocaleString('es-CL')} c/u
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}
          >
            {/* Control de cantidad */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid var(--line)',
                borderRadius: 6,
                overflow: 'hidden'
              }}
            >
              <button
                type="button"
                onClick={() =>
                  actualizarCantidad(
                    item.id,
                    Math.max(1, item.cantidad - 1)
                  )
                }
                aria-label="Disminuir cantidad"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  border: 'none',
                  background: 'transparent',
                  color: 'inherit',
                  cursor: 'pointer'
                }}
              >
                <Minus size={15} />
              </button>

              <span
                style={{
                  minWidth: 32,
                  textAlign: 'center',
                  fontSize: 14
                }}
              >
                {item.cantidad}
              </span>

              <button
                type="button"
                onClick={() =>
                  actualizarCantidad(item.id, item.cantidad + 1)
                }
                aria-label="Aumentar cantidad"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  border: 'none',
                  background: 'transparent',
                  color: 'inherit',
                  cursor: 'pointer'
                }}
              >
                <Plus size={15} />
              </button>
            </div>

            {/* Eliminar producto */}
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => quitarProducto(item.id)}
              aria-label={`Quitar ${item.nombre} del carrito`}
              title="Quitar producto"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 8
              }}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '24px 0',
          fontFamily: 'var(--font-mono)',
          fontSize: 18
        }}
      >
        <span>Total</span>
        <span>${total.toLocaleString('es-CL')} CLP</span>
      </div>

      <Link to="/checkout" className="btn btn-primary">
        Ir a pagar →
      </Link>
    </section>
  )
}

