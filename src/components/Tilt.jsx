import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

// Mouse-driven 3D tilt. `deep` keeps children in 3D space so they can sit at different depths.
export default function Tilt({ children, max = 8, deep = false, className = '' }) {
  const ref = useRef(null)
  const mx = useMotionValue(0), my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 110, damping: 16 }), sy = useSpring(my, { stiffness: 110, damping: 16 })
  const rotY = useTransform(sx, [-0.5, 0.5], [-max, max])
  const rotX = useTransform(sy, [-0.5, 0.5], [max, -max])
  const move = (e) => {
    if (e.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => { mx.set(0); my.set(0) }
  return (
    <div ref={ref} style={{ perspective: 1400 }} onPointerMove={move} onPointerLeave={reset} className={className}>
      <motion.div className="relative" style={{ rotateX: rotX, rotateY: rotY, transformStyle: deep ? 'preserve-3d' : 'flat' }}>{children}</motion.div>
    </div>
  )
}
