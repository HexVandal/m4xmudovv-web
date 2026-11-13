import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Download, Check } from 'lucide-react'
import { DOWNLOAD_URL } from '../constants'

export default function DownloadButton({ className = '' }) {
  const [state, setState] = useState('idle')
  const start = () => { setState('busy'); setTimeout(() => setState('done'), 1600); setTimeout(() => setState('idle'), 4500) }
  const label = { idle: 'Download for Windows', busy: 'Starting download…', done: 'Download started' }[state]
  return (
    <motion.a href={DOWNLOAD_URL} download onClick={start} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-black ${className}`}>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="absolute bottom-0 left-0 h-[3px] bg-black/70" style={{ width: state === 'busy' ? '100%' : 0, transition: state === 'busy' ? 'width 1.6s linear' : 'none' }} />
      <span className="relative flex h-5 w-5 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={state === 'done' ? 'c' : 'd'} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ duration: 0.2 }}>
            {state === 'done' ? <Check size={18} /> : <Download size={18} className={state === 'busy' ? 'animate-bounce' : ''} />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="relative" aria-live="polite">{label}</span>
    </motion.a>
  )
}
