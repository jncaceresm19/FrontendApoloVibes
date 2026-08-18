import { Link } from 'react-router-dom'

// Hero con imagen de fondo fotográfica (objetos impresos en 3D + logo sticker).
// El texto se ancla arriba a la izquierda, dejando el resto de la composición
// (filamento, objetos, logo) visible sin superposición.
export default function HeroEstatico() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '620px',
        overflow: 'hidden',
        aspectRatio: '1536 / 1024',
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      {/* Imagen de fondo */}
      <img
        src="/media/apolohero.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        fetchpriority="high"
      />

      <div
        className="wrap"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1180,
          margin: '0 auto',
          padding: '90px 40px 0',
        }}
      >
        {/* Bloque de texto, anclado arriba-izquierda */}
        <div style={{ maxWidth: 460 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: '#E8863E',
              textTransform: 'uppercase',
              letterSpacing: '.08em',
              marginBottom: 16,
              display: 'block',
              fontWeight: 600,
            }}
          >
            Apolo Vibes · Impresión 3D
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 46,
              lineHeight: 1.12,
              letterSpacing: '-.02em',
              fontWeight: 700,
              marginBottom: 20,
              color: '#1E3A5F',
            }}
          >
            Ideas con <span style={{ color: '#E8863E' }}>buena onda</span>, hechas realidad capa por capa.
          </h1>
          <p style={{ fontSize: 16, color: '#4A5A6A', marginBottom: 30, lineHeight: 1.55 }}>
            Impresiones 3D personalizadas para makers, talleres y proyectos con actitud. Del diseño a la pieza final, con la energía de Apolo Vibes.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link
              to="/categorias"
              className="btn btn-primary"
              style={{
                background: '#ff6d05',
                color: '#fff',
                padding: '14px 28px',
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Explorar catálogo →
            </Link>
            <Link
              to="/cotizar"
              className="btn btn-ghost"
              style={{
                border: '1.5px solid #1E3A5F',
                color: '#1E3A5F',
                padding: '14px 28px',
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: 'none',
                background: 'rgba(255,255,255,.6)',
              }}
            >
              Cotizar tu producto
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}