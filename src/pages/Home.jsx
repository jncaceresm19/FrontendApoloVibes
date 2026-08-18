import HeroVideo from '../components/HeroVideo.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { productos, categorias } from '../data/products.js'

export default function Home() {
  return (
    <>
      <HeroVideo />

      <section className="wrap" style={{ padding: '80px 0' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 30 }}>Explora por categoría</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {categorias.map(cat => (
            <div key={cat.id} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: '26px 22px' }}>
              <h3 style={{ fontSize: 16, marginBottom: 4 }}>{cat.nombre}</h3>
              {cat.cantidad && <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>{cat.cantidad} referencias</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="wrap" style={{ padding: '0 0 80px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 30 }}>Más pedidos este mes</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {productos.map(p => <ProductCard key={p.id} producto={p} />)}
        </div>
      </section>
    </>
  )
}
