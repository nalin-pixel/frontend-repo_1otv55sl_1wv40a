import Header from './components/Header'
import Plans from './components/Plans'
import Subscribe from './components/Subscribe'
import Booking from './components/Booking'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100">
      <Header />

      <section className="pt-10 pb-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 md:p-12">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Premium car care on subscription</h1>
              <p className="text-blue-200/80 text-lg mb-6">Reliable, convenient services across Doha. Pick a plan, subscribe in minutes, and book visits when you need them.</p>
              <div className="flex gap-3">
                <a href="#plans" className="rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-3 transition">View plans</a>
                <a href="#subscribe" className="rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 transition">Get started</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Plans />
      <Subscribe />
      <Booking />

      <footer className="py-10 border-t border-white/10 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-sm text-blue-300/70 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Jamie Andrew Car Services — Doha, Qatar</p>
          <p>WhatsApp: +974 • Open daily 9am–9pm</p>
        </div>
      </footer>
    </div>
  )
}

export default App
