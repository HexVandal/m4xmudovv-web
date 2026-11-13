import { motion } from 'motion/react'

export default function AppPreview({ src, alt, float = true, priority = false }) {
  return (
    <div className="relative">
      <div className="absolute -inset-10 -z-10 rounded-full bg-white/[0.07] blur-3xl" />
      <motion.div animate={float ? { y: [0, -10, 0] } : undefined} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="glass-flat rounded-[1.75rem] p-2 shadow-[0_40px_120px_-20px_rgba(255,255,255,0.14)]">
        <img src={src} alt={alt} width="1600" height="900" decoding="async" loading={priority ? 'eager' : 'lazy'} className="block h-auto w-full rounded-[1.25rem]" />
      </motion.div>
    </div>
  )
}
