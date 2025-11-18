import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL

export default function Plans() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetch(`${API_BASE}/api/plans`)
        const data = await res.json()
        setPlans(data)
      } catch (e) {
        setError('Could not load plans')
      } finally {
        setLoading(false)
      }
    }
    fetchPlans()
  }, [])

  return (
    <section id="plans" className="py-14">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-6">Subscription Plans</h2>
        <p className="text-blue-200/80 mb-8">Choose a plan that fits your car care needs.</p>

        {loading && <p className="text-blue-200">Loading plans...</p>}
        {error && <p className="text-red-300">{error}</p>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div key={p._id} className="rounded-2xl border border-white/10 bg-slate-800/60 p-6 hover:border-blue-400/40 transition">
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-xl font-semibold text-white">{p.name}</h3>
                <span className="text-xs uppercase tracking-wide text-blue-300/80 bg-blue-500/10 border border-blue-500/20 rounded px-2 py-1">{p.tier}</span>
              </div>
              <p className="text-blue-200/80 mb-4">{p.description}</p>
              <p className="text-3xl font-bold text-white mb-4">QR {p.price_qr}</p>
              <ul className="text-blue-100/80 text-sm space-y-2 list-disc list-inside mb-6">
                {(p.features || []).map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
              <a href="#subscribe" className="inline-flex items-center justify-center w-full rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 transition">Choose {p.name}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
