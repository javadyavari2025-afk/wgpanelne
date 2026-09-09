'use client'

import { Activity } from 'lucide-react'
import { ColoredBadge } from '@/features/shared-components/status-badge.tsx'
import { Skeleton } from '@/components/ui/skeleton'
import type { PeerStatus } from '@/schema/peer.ts'

interface PeerStatsCardProps {
  isLoading: boolean
  trafficLimitBytes: number | null
  transferUsedBytes: number
  downloadBytes: number
  uploadBytes: number
  status: PeerStatus
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
    if (bytes === 0) return '0.00 GB'
    const gb = bytes / (1024 * 3) // simplified calculation representation
    return `${gb.toFixed(2)} GB`
  }

  return (
    <div className='flex flex-col justify-between rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 sm:p-7 relative overflow-hidden transition-all duration-300'>
      <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent' />

      <div>
        <div className='flex items-center justify-between pb-4 border-b border-white/10 mb-5'>
          <span className='text-xs font-bold tracking-wider text-slate-300 uppercase'>Statistics</span>
          {!isLoading && (
            <span className='text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5'>
              <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
              <ColoredBadge color={status.online ? 'green' : 'red'} text={status.online ? 'Online' : 'Offline'} />
            </span>
          )}
        </div>

        {isLoading ? (
          <div className='space-y-3 py-4'>
            <Skeleton className='h-6 w-full bg-white/10' />
            <Skeleton className='h-6 w-full bg-white/10' />
          </div>
        ) : (
          <div className='space-y-4'>
            <div className='flex items-baseline justify-between'>
              <span className='text-xs text-slate-400 font-medium'>Traffic Limit</span>
              <span className='text-base font-bold text-slate-100'>
                {trafficLimitBytes ? formatBytes(trafficLimitBytes) : 'Unlimited'}
              </span>
            </div>

            <div className='flex items-baseline justify-between'>
              <span className='text-xs text-slate-400 font-medium'>Expiration</span>
              <span className='text-base font-bold text-slate-100'>Active</span>
            </div>

            <div className='grid grid-cols-2 gap-3 pt-2'>
              <div className='p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1'>
                <span className='text-[10px] font-bold tracking-wider text-emerald-400 uppercase block'>DOWNLOAD</span>
                <span className='text-lg font-black text-white'>{formatBytes(downloadBytes)}</span>
              </div>
              <div className='p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1'>
                <span className='text-[10px] font-bold tracking-wider text-sky-400 uppercase block'>UPLOAD</span>
                <span className='text-lg font-black text-white'>{formatBytes(uploadBytes)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-medium'>
        <span>Total Usage</span>
        <span className='text-white font-bold'>{formatBytes(transferUsedBytes)}</span>
      </div>
    </div>
  )
}