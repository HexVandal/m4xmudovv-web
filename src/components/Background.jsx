import { useEffect, useState } from 'react'
import { BG_VIDEO } from '../constants'

// Video plays only on wide screens, without reduced-motion or data-saver. Otherwise a static poster is used.
function useCanPlay() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 768px)')
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setOk(wide.matches && !calm.matches && !navigator.connection?.saveData)
    update(); wide.addEventListener('change', update); calm.addEventListener('change', update)
    return () => { wide.removeEventListener('change', update); calm.removeEventListener('change', update) }
  }, [])
  return ok
}

export default function Background() {
  const play = useCanPlay()
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      {BG_VIDEO && (play
        ? <video autoPlay muted loop playsInline preload="auto" poster={BG_VIDEO.poster} className="absolute inset-0 h-full w-full object-cover opacity-60">
            <source src={BG_VIDEO.webm} type="video/webm" /><source src={BG_VIDEO.mp4} type="video/mp4" />
          </video>
        : <img src={BG_VIDEO.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />)}
      <div className="grain grid-move absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="drift absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-white/[0.04] blur-[120px]" />
      <div className="drift drift-b absolute right-0 top-1/3 h-[26rem] w-[26rem] rounded-full bg-zinc-400/[0.05] blur-[120px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
    </div>
  )
}
