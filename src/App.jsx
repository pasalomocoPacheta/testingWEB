export default function App() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-2">
          <h1>Heading one (H1)</h1>
          <h2>Heading two (H2)</h2>
          <h3>Heading three (H3)</h3>

          <p>
            Párrafo de prueba. Esto se alimenta desde <code>design/tokens.json</code>.
            Si Apps Script lo actualiza en GitHub, Vercel reconstruye y estos estilos cambian.
          </p>

          <p>
            Enlace: <a href="https://vercel.com" target="_blank" rel="noreferrer">Vercel</a>
          </p>

          <label>Label de prueba</label>
          <div><small>Small de prueba</small></div>
        </header>

        <section className="rounded border p-4">
          <div className="text-sm text-gray-600 mb-2">
            Utilities Tailwind (también actualizan porque se generan desde tokens):
          </div>
          <div className="space-y-2">
            <div className="text-h1 text-heading uppercase">text-h1 (Tailwind)</div>
            <div className="text-h2 text-heading uppercase">text-h2 (Tailwind)</div>
            <div className="text-h3 text-heading">text-h3 (Tailwind)</div>
            <div className="text-p text-ink2">text-p (Tailwind)</div>
            <div className="text-small text-[#555555]">text-small (Tailwind)</div>
          </div>
        </section>
      </div>
    </div>
  );
}
