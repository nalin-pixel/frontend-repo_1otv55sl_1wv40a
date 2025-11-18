import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL

export default function Booking() {
  const [form, setForm] = useState({ subscription_id: '', service_type: 'wash', scheduled_date: '', location: '', notes: '' })
  const [status, setStatus] = useState({ type: '', message: '' })

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus({ type: 'loading', message: 'Scheduling your service...' })

    try {
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
          ...form,
          scheduled_date: new Date(form.scheduled_date).toISOString(),
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to schedule')
      setStatus({ type: 'success', message: 'Booking created successfully!' })
      setForm({ subscription_id: '', service_type: 'wash', scheduled_date: '', location: '', notes: '' })
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    }
  }

  return (
    <section id="booking" className="py-14">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-6">Book a service</h2>
        <p className="text-blue-200/80 mb-8">Already subscribed? Enter your subscription ID to book a visit.</p>

        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
          <input name="subscription_id" value={form.subscription_id} onChange={update} placeholder="Subscription ID" required className="w-full rounded-lg bg-slate-800/60 border border-white/10 text-white px-4 py-3" />
          <select name="service_type" value={form.service_type} onChange={update} className="w-full rounded-lg bg-slate-800/60 border border-white/10 text-white px-4 py-3">
            <option value="wash">Wash</option>
            <option value="detailing">Detailing</option>
            <option value="oil-change">Oil Change</option>
          </select>
          <input type="datetime-local" name="scheduled_date" value={form.scheduled_date} onChange={update} required className="w-full rounded-lg bg-slate-800/60 border border-white/10 text-white px-4 py-3" />
          <input name="location" value={form.location} onChange={update} placeholder="Location / Address" required className="w-full rounded-lg bg-slate-800/60 border border-white/10 text-white px-4 py-3" />
          <input name="notes" value={form.notes} onChange={update} placeholder="Notes (optional)" className="w-full rounded-lg bg-slate-800/60 border border-white/10 text-white px-4 py-3 sm:col-span-2" />
          <button type="submit" className="rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 transition sm:col-span-2">Book now</button>
          {status.type === 'loading' && <p className="text-blue-200 sm:col-span-2">{status.message}</p>}
          {status.type === 'success' && <p className="text-green-300 sm:col-span-2">{status.message}</p>}
          {status.type === 'error' && <p className="text-red-300 sm:col-span-2">{status.message}</p>}
        </form>
      </div>
    </section>
  )
}
