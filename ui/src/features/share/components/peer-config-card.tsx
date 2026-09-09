'use client'

import { Download } from 'lucide-react'

interface PeerConfigCardProps {
  isLoading?: boolean
  config: string
}

export default function PeerConfigCard({ isLoading, config }: PeerConfigCardProps) {
  const downloadConfig = () => {
    if (!config) return
    const blob = new Blob([config], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'wg-peer.conf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className='flex flex-col justify-between rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 sm:p-7 relative overflow-hidden md:col-span-2 lg:col-span-1'>
      <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent' />
      <div>
        <div className='flex items-center justify-between pb-4 border-b border-white/10 mb-5'>
          <span className='text-xs font-bold tracking-wider text-slate-300 uppercase'>Configuration</span>
          <span className='text-xs text-amber-400 font-medium'>.conf file</span>
        </div>
        <div className='relative rounded-2xl bg-black/50 border border-white/10 p-3.5 text-xs font-mono overflow-y-auto max-h-40 text-slate-300 shadow-inner'>
          <pre className='whitespace-pre-wrap'>{isLoading ? 'Loading...' : config || 'No configuration available.'}</pre>
        </div>
      </div>
      <div className='pt-6 mt-6 border-t border-white/10'>
        <button
          onClick={downloadConfig}
          disabled={!config}
          className='w-full h-12 font-bold text-sm rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 disabled:opacity-50 text-white shadow-[0_10px_25px_rgba(120,50,255,0.4)] transition-all border border-white/20 flex items-center justify-center gap-2'
        >
          <Download className='h-4 w-4' /> Download Configuration
        </button>
      </div>
    </div>
  )
}