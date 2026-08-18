import { useState } from 'react'
import { api } from '../services/api.js'

const ESTADO_INICIAL = {
  nombre: '', email: '', telefono: '',
  material: 'PLA', descripcion: '',
}

// Flujo de cotización:
// 1. El cliente sube una imagen de referencia + describe la pieza.
// 2. Se envía como FormData (multipart) a /api/cotizaciones.
// 3. El backend guarda la solicitud y notifica al dueño (email/WhatsApp).
// 4. El dueño la revisa y responde desde el panel admin -> Cotizaciones,
//    asignando un precio estimado o rechazándola con un motivo.
// 5. El cliente recibe la respuesta por correo (fuera del alcance del front).
export default function Cotizacion() {
  const [form, setForm] = useState(ESTADO_INICIAL)
  const [archivo, setArchivo] = useState(null)
  const [previsualizacion, setPrevisualizacion] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState(null)

  function actualizar(campo, valor) {
    setForm(prev => ({ ...prev, [campo]: valor }))
  }

  function manejarArchivo(e) {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen (JPG, PNG o WEBP).')
      return
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('La imagen no puede pesar más de 8MB.')
      return
    }

    setError(null)
    setArchivo(file)
    setPrevisualizacion(URL.createObjectURL(file))
  }

  async function enviarSolicitud(e) {
    e.preventDefault()
    if (!archivo) { setError('Sube una imagen de referencia de la pieza.'); return }

    setEnviando(true)
    setError(null)

    const data = new FormData()
    Object.entries(form).forEach(([k, v]) => data.append(k, v))
    data.append('imagen', archivo)

    try {
      await api.post('/cotizaciones', data)
      setEnviado(true)
    } catch (err) {
      setError('No pudimos enviar tu solicitud. Intenta nuevamente.')
    } finally {
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <section className="wrap" style={{ padding: '100px 0', textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, marginBottom: 12 }}>Solicitud enviada</h1>
        <p style={{ color: 'var(--text-dim)' }}>
          Recibimos tu pieza de referencia. Nuestro equipo la revisa y te responde
          con un precio estimado dentro de 24 a 48 horas hábiles a {form.email}.
        </p>
      </section>
    )
  }

  return (
    <section className="wrap" style={{ padding: '48px 0 80px', maxWidth: 640 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--teal)', textTransform: 'uppercase' }}>
        Cotización personalizada
      </span>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, margin: '10px 0 8px' }}>Cotiza tu pieza</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 32 }}>
        Sube una foto o render de lo que necesitas imprimir. Un especialista la revisa antes de confirmar el precio.
      </p>

      <form onSubmit={enviarSolicitud}>
        <div style={{ marginBottom: 20 }}>
          <label>Imagen de referencia</label>
          <label
            htmlFor="imagen-input"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              border: '1px dashed var(--line)', borderRadius: 10, padding: previsualizacion ? 0 : '40px 20px',
              cursor: 'pointer', overflow: 'hidden', minHeight: 160, background: 'var(--surface)',
            }}
          >
            {previsualizacion ? (
              <img src={previsualizacion} alt="Vista previa de la pieza a cotizar" style={{ width: '100%', maxHeight: 260, objectFit: 'cover' }} />
            ) : (
              <>
                <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>Haz clic para subir una imagen</span>
                <span style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 6 }}>JPG, PNG o WEBP · máx. 8MB</span>
              </>
            )}
          </label>
          <input id="imagen-input" type="file" accept="image/*" onChange={manejarArchivo} style={{ display: 'none' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label>Nombre</label>
            <input required value={form.nombre} onChange={e => actualizar('nombre', e.target.value)} />
          </div>
          <div>
            <label>Email</label>
            <input required type="email" value={form.email} onChange={e => actualizar('email', e.target.value)} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label>Teléfono</label>
            <input value={form.telefono} onChange={e => actualizar('telefono', e.target.value)} />
          </div>
          <div>
            <label>Material preferido</label>
            <select value={form.material} onChange={e => actualizar('material', e.target.value)}>
              <option>PLA</option>
              <option>PETG</option>
              <option>ABS</option>
              <option>Resina</option>
              <option>No estoy seguro</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label>Describe la pieza</label>
          <textarea
            rows={4}
            required
            placeholder="Dimensiones aproximadas, cantidad, uso de la pieza, color, etc."
            value={form.descripcion}
            onChange={e => actualizar('descripcion', e.target.value)}
          />
        </div>

        {error && <p style={{ color: 'var(--accent)', fontSize: 13, marginBottom: 16 }}>{error}</p>}

        <button className="btn btn-primary" type="submit" disabled={enviando}>
          {enviando ? 'Enviando…' : 'Enviar solicitud de cotización'}
        </button>
      </form>
    </section>
  )
}
