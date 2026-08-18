import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/Home.jsx'
import Categorias from './pages/Categorias.jsx'
import ProductoDetalle from './pages/ProductoDetalle.jsx'
import Carrito from './pages/Carrito.jsx'
import Checkout from './pages/Checkout.jsx'
import PagoRetorno from './pages/PagoRetorno.jsx'
import Cotizacion from './pages/Cotizacion.jsx'

import AdminLayout from './pages/admin/AdminLayout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import Pedidos from './pages/admin/Pedidos.jsx'
import Productos from './pages/admin/Productos.jsx'
import Inventario from './pages/admin/Inventario.jsx'
import Cotizaciones from './pages/admin/Cotizaciones.jsx'

// Layout de tienda: navbar + footer envuelven las páginas públicas.
// El panel /admin usa su propio layout (sidebar) sin navbar/footer de tienda.
function TiendaLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TiendaLayout><Home /></TiendaLayout>} />
      <Route path="/categorias" element={<TiendaLayout><Categorias /></TiendaLayout>} />
      <Route path="/producto/:id" element={<TiendaLayout><ProductoDetalle /></TiendaLayout>} />
      <Route path="/carrito" element={<TiendaLayout><Carrito /></TiendaLayout>} />
      <Route path="/checkout" element={<TiendaLayout><Checkout /></TiendaLayout>} />
      <Route path="/pago/retorno" element={<TiendaLayout><PagoRetorno /></TiendaLayout>} />
      <Route path="/cotizar" element={<TiendaLayout><Cotizacion /></TiendaLayout>} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="pedidos" element={<Pedidos />} />
        <Route path="productos" element={<Productos />} />
        <Route path="inventario" element={<Inventario />} />
        <Route path="cotizaciones" element={<Cotizaciones />} />
      </Route>
    </Routes>
  )
}
