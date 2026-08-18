import { useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import { categorias, productos } from '../data/products.js'

export default function Categorias() {
  const [activa, setActiva] = useState(null)

  const filtrados = activa ? productos.filter(p => p.categoria === activa) : productos

  return (
    <section className="wrap" style={{ padding: '48px 0 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, marginBottom: 24 }}>Catálogo</h1>

      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        <button className="btn btn-ghost" onClick={() => setActiva(null)}>Todas</button>
        {categorias.map(cat => (
          <button key={cat.id} className="btn btn-ghost" onClick={() => setActiva(cat.id)}>
            {cat.nombre}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {filtrados.map(p => <ProductCard key={p.id} producto={p} />)}
      </div>
    </section>
  )
}
