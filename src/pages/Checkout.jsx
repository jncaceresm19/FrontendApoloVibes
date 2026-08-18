import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { iniciarPago } from '../services/payment.js'

export default function Checkout() {
  const { items, total } = useCart()
  const [cliente, setCliente] = useState({ nombre: '', email: '', direccion: '', telefono: '' })
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)

  function actualizar(campo, valor) {
    setCliente(prev => ({ ...prev, [campo]: valor }))
  }

  async function pagar(e) {
    e.preventDefault()
    setError(null)
    setEnviando(true)
    try {
      // Redirige al usuario al formulario seguro de Webpay.
      // La confirmación real ocurre en /pago/retorno tras volver de Transbank.
      await iniciarPago({ items, total, cliente })
    } catch (err) {
      setError('No pudimos iniciar el pago. Intenta nuevamente.')
      setEnviando(false)
    }
  }

  return (
    <section className="wrap" style={{ padding: '48px 0 80px', display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 48 }}>
      <form onSubmit={pagar}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 24 }}>Datos de envío</h1>

        <div style={{ marginBottom: 16 }}>
          <label>Nombre completo</label>
          <input required value={cliente.nombre} onChange={e => actualizar('nombre', e.target.value)} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>
          <input required type="email" value={cliente.email} onChange={e => actualizar('email', e.target.value)} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Dirección</label>
          <input required value={cliente.direccion} onChange={e => actualizar('direccion', e.target.value)} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label>Teléfono</label>
          <input required value={cliente.telefono} onChange={e => actualizar('telefono', e.target.value)} />
        </div>

        {error && <p style={{ color: 'var(--accent)', fontSize: 13, marginBottom: 16 }}>{error}</p>}

        <button className="btn btn-primary" disabled={enviando} type="submit">
          {enviando ? 'Redirigiendo a Webpay…' : 'Pagar con Webpay →'}
        </button>
      </form>

      <aside style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 24, height: 'fit-content' }}>
        <h3 style={{ fontSize: 14, marginBottom: 16 }}>Resumen del pedido</h3>
        {items.map(i => (
          <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 10, color: 'var(--text-dim)' }}>
            <span>{i.nombre} × {i.cantidad}</span>
            <span>${(i.precio * i.cantidad).toLocaleString('es-CL')}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--line)', fontFamily: 'var(--font-mono)' }}>
          <span>Total</span>
          <span>${total.toLocaleString('es-CL')}</span>
        </div>
      </aside>
    </section>
  )
}
