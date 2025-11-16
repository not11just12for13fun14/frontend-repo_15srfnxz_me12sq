import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[360px] sm:h-[420px] md:h-[520px] bg-white rounded-3xl border border-gray-200 shadow-sm">
        <Spline scene="https://prod.spline.design/kow0cKDK6Tap7xO9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />
        <div className="absolute inset-0 flex items-end p-6 sm:p-8">
          <div className="backdrop-blur-sm bg-white/70 rounded-xl px-4 py-3 shadow pointer-events-auto">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">BrainDash</h1>
            <p className="text-sm sm:text-base text-gray-600">An energy-aware task manager that adapts to how you actually feel.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
