import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL

export default function Subscribe() {
  const [plans, setPlans] = useState([])
  const [form, setForm] = useState({
    name: '', email: '', phone: '', car_make: '', car_model: '', car_year: '', plate_number: '', plan_id: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })

  useEffect(() => {
    async function loadPlans() {
      try {
        const res = await fetch(`${API_BASE}/api/plans`)
        const data = await res.json()
        setPlans(data)
      } catch (e) {
        // ignore
      }
    }
    loadPlans()
  }, [])

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus({ type: 'loading', message: 'Creating your subscription...' })

    try {
      // 1) create customer
      const customerRes = await fetch(`${API_BASE}/api/customers`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          car_make: form.car_make,
          car_model: form.car_model,
          car_year: form.car_year ? Number(form.car_year) : null,
          plate_number: form.plate_number || null,
        })
      })
      const customerData = await customerRes.json()
      if (!customerRes.ok) throw new Error(customerData.detail || 'Failed to create customer')

      // 2) create subscription
      const subRes = await fetch(`${API_BASE}/api/subscriptions`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
          customer_id: customerData.id,
          plan_id: form.plan_id
        })
      })
      const subData = await subRes.json()
      if (!subRes.ok) throw new Error(subData.detail || 'Failed to create subscription')

      setStatus({ type: 'success', message: 'Subscription created successfully! We\'ll be in touch shortly.' })
      setForm({ name: '', email: '', phone: '', car_make: '', car_model: '', car_year: '', plate_number: '', plan_id: '' })
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    }
  }

  return (
    <section id="subscribe" className="py-14">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-6">Start your subscription</h2>
        <p className="text-blue-200/80 mb-8">Share your details and pick a plan. We\'ll confirm via WhatsApp.</p>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input name="name" value={form.name} onChange={update} placeholder="Full name" required className="w-full rounded-lg bg-slate-800/60 border border-white/10 text-white px-4 py-3" />
              <input name="email" type="email" value={form.email} onChange={update} placeholder="Email" required className="w-full rounded-lg bg-slate-800/60 border border-white/10 text-white px-4 py-3" />
              <input name="phone" value={form.phone} onChange={update} placeholder="Phone / WhatsApp" required className="w-full rounded-lg bg-slate-800/60 border border-white/10 text-white px-4 py-3" />
              <input name="plate_number" value={form.plate_number} onChange={update} placeholder="Plate number" className="w-full rounded-lg bg-slate-800/60 border border-white/10 text-white px-4 py-3" />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <input name="car_make" value={form.car_make} onChange={update} placeholder="Car make" required className="w-full rounded-lg bg-slate-800/60 border border-white/10 text-white px-4 py-3" />
              <input name="car_model" value={form.car_model} onChange={update} placeholder="Car model" required className="w-full rounded-lg bg-slate-800/60 border border-white/10 text-white px-4 py-3" />
              <input name="car_year" value={form.car_year} onChange={update} placeholder="Year" className="w-full rounded-lg bg-slate-800/60 border border-white/10 text-white px-4 py-3" />
            </div>
          </div>

          <div className="space-y-4">
            <select name="plan_id" value={form.plan_id} onChange={update} required className="w-full rounded-lg bg-slate-800/60 border border-white/10 text-white px-4 py-3">
              <option value="">Select a plan</option>
              {plans.map((p) => (
                <option key={p._id} value={p._id}>{p.name} — QR {p.price_qr}</option>
              ))}
            </select>
            <button type="submit" className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 transition">Subscribe</button>
            {status.type === 'loading' && <p className="text-blue-200">{status.message}</p>}
            {status.type === 'success' && <p className="text-green-300">{status.message}</p>}
            {status.type === 'error' && <p className="text-red-300">{status.message}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}
