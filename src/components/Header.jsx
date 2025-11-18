export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-slate-900/70 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/30">JA</div>
          <div>
            <p className="text-white font-semibold leading-tight">Jamie Andrew</p>
            <p className="text-xs text-blue-200/70 leading-tight">Car Services • Doha, Qatar</p>
          </div>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-blue-100/80">
          <a href="#plans" className="hover:text-white transition">Plans</a>
          <a href="#subscribe" className="hover:text-white transition">Subscribe</a>
          <a href="#booking" className="hover:text-white transition">Booking</a>
        </nav>
      </div>
    </header>
  )
}
