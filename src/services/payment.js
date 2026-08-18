// Integración de pago — ejemplo con Webpay Plus (Transbank), la pasarela
// más usada en Chile. El flujo real de Webpay SIEMPRE requiere backend:
// la llave de comercio (API key) no puede vivir en el navegador.
//
// Flujo:
// 1. El frontend arma el pedido (items + total) y llama a /api/pago/crear.
// 2. El backend crea la transacción contra Transbank y devuelve
//    { url, token } — la URL del formulario de pago de Webpay.
// 3. El frontend redirige al usuario a esa URL (fuera de la SPA).
// 4. Webpay redirige de vuelta a /pago/retorno con el token en el body.
// 5. El backend confirma la transacción en /api/pago/confirmar y el
//    frontend muestra el resultado.
//
// Para cambiar de pasarela (Flow, MercadoPago, Khipu) solo se reemplaza
// la implementación de este archivo — el resto de la app no cambia.

import { api } from './api.js'

export async function iniciarPago({ items, total, cliente }) {
  const pedido = {
    items: items.map(i => ({ id: i.id, cantidad: i.cantidad, precio: i.precio })),
    total,
    cliente, // { nombre, email, direccion, telefono }
  }

  // El backend responde con la URL de Webpay + token de la transacción.
  const { url, token } = await api.post('/pago/crear', pedido)

  // Redirección fuera de React hacia el formulario seguro de Webpay.
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = url
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = 'token_ws'
  input.value = token
  form.appendChild(input)
  document.body.appendChild(form)
  form.submit()
}

export async function confirmarPago(token) {
  // Se llama desde la página /pago/retorno con el token que Webpay
  // devuelve por POST.
  return api.post('/pago/confirmar', { token })
}
