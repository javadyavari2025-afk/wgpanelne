'use client'

import { Activity } from 'lucide-react'

interface PeerStatsCardProps {
  isLoading?: boolean
  trafficLimitBytes: number | null
  transferUsedBytes: number
  downloadBytes: number
  uploadBytes: number
  status?: { online: boolean }
}

export default function PeerStatsCard({
  isLoading,
  trafficLimitBytes,
  transferUsedBytes,
  downloadBytes,
  uploadBytes,
  status,
}: PeerStatsCardProps) {
  const formatBytes = (bytes: number) => {
    if (!bytes || bytes === 0) return '0.00 GB'
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
  }

  const isOnline = status?.online ?? false

  return (
    <div className='flex flex-col justify-between rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 sm:p-7 relative overflow-hidden'>
      <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent' />
      <div>
        <div className='flex items-center justify-between pb-4 border-b border-white/10 mb-5'>
          <span className='text-xs font-bold tracking-wider text-slate-300 uppercase flex items-center gap-2'>
            <Activity className='h-4 w-4 text-indigo-400' /> Statistics
          </span>
          <span className={`text-xs font-mono px-3 py-1 rounded-full border flex items-center gap-1.5 ${isOnline ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
        <div className='space-y-4'>
          <div className='flex items-baseline justify-between'>
            <span className='text-xs text-slate-400 font-medium'>Traffic Limit</span>
            <span className='text-base font-bold text-slate-100'>
              {isLoading ? '...' : trafficLimitBytes ? formatBytes(trafficLimitBytes) : 'Unlimited'}
            </span>
          </div>
          <div className='flex items-baseline justify-between'>
            <span className='text-xs text-slate-400 font-medium'>Status</span>
            <span className='text-base font-bold text-slate-100'>Active</span>
          </div>
          <div className='grid grid-cols-2 gap-3 pt-2'>
            <div className='p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1'>
              <span className='text-[10px] font-bold tracking-wider text-emerald-400 uppercase block'>DOWNLOAD</span>
              <span className='text-lg font-black text-white'>{isLoading ? '...' : formatBytes(downloadBytes)}</span>
            </div>
            <div className='p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1'>
              <span className='text-[10px] font-bold tracking-wider text-sky-400 uppercase block'>UPLOAD</span>
              <span className='text-lg font-black text-white'>{isLoading ? '...' : formatBytes(uploadBytes)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-medium'>
        <span>Total Usage</span>
        <span className='text-white font-bold'>{isLoading ? '...' : formatBytes(transferUsedBytes)}</span>
      </div>
    </div>
  )
}