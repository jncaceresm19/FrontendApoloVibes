import { useParams } from 'react-router-dom'
import { productos } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductoDetalle() {
  const { id } = useParams()
  const producto = productos.find(p => p.id === id)
  const { agregarProducto } = useCart()

  if (!producto) return <div className="wrap" style={{ padding: 80 }}>Producto no encontrado.</div>

  return (
    <section className="wrap" style={{ padding: '48px 0 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
      <div style={{ height: 420, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12 }} />
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, marginBottom: 14 }}>{producto.nombre}</h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 22, marginBottom: 24 }}>
          ${producto.precio.toLocaleString('es-CL')} CLP
        </p>
        <button className="btn btn-primary" onClick={() => agregarProducto(producto)}>
          Agregar al carrito
        </button>
      </div>
    </section>
  )
}
