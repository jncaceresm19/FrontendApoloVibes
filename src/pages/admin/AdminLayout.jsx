import { NavLink, Outlet } from 'react-router-dom'

const itemStyle = ({ isActive }) => ({
  display: 'block', padding: '10px 12px', borderRadius: 8, fontSize: 13, marginBottom: 2,
  color: isActive ? 'var(--accent)' : 'var(--text-dim)',
  background: isActive ? 'var(--accent-soft)' : 'transparent',
  fontWeight: isActive ? 600 : 400,
})

// Nota: en producción, este layout debe protegerse con autenticación
// (ruta privada / JWT) para que solo el dueño o su equipo pueda entrar.
export default function AdminLayout() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '238px 1fr', minHeight: '100vh' }}>
      <aside style={{ background: 'var(--surface)', borderRight: '1px solid var(--line)', padding: '24px 18px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, padding: '6px 10px 28px' }}>
          Forma3D
        </div>
        <NavLink to="/admin" end style={itemStyle}>Dashboard</NavLink>
        <NavLink to="/admin/pedidos" style={itemStyle}>Pedidos</NavLink>
        <NavLink to="/admin/productos" style={itemStyle}>Productos</NavLink>
        <NavLink to="/admin/inventario" style={itemStyle}>Inventario</NavLink>
        <NavLink to="/admin/cotizaciones" style={itemStyle}>Cotizaciones</NavLink>
      </aside>

      <main style={{ padding: '28px 34px' }}>
        <Outlet />
      </main>
    </div>
  )
}
