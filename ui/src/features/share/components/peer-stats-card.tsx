'use client'

import { IconCircleFilled } from '@tabler/icons-react'
import { PeerStats } from '@/schema/peers.ts'
import clsx from 'clsx'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ClockFadingIcon,
  EthernetPortIcon,
  GaugeIcon,
  WifiHighIcon,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'

interface StatsCardProps {
  isLoading: boolean
  stats: PeerStats | undefined
}

function remainingDays(expireTime: string | null | undefined): number {
  if (!expireTime) return 0
  const expireDate = new Date(expireTime)
  const now = new Date()
  const diffTime = expireDate.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export default function PeerStatsCard({ isLoading, stats }: StatsCardProps) {
  const status = stats?.is_online ? 'Online' : 'Offline'
  const statusColor = stats?.is_online ? 'text-emerald-400' : 'text-red-400'

  return (
    <Card className='bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl p-2 rounded-2xl shadow-xl flex h-full flex-col justify-between text-slate-100'>
      <CardHeader className='flex flex-row items-center justify-between border-b border-slate-800/60 pb-3 space-y-0'>
        <CardTitle className='text-xs font-semibold text-slate-300 tracking-wider'>STATISTICS</CardTitle>
        {!isLoading && (
          <span className={`px-2.5 py-0.5 text-[10px] font-medium rounded-full border ${stats?.is_online ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
            {status}
          </span>
        )}
      </CardHeader>

      <CardContent className='flex flex-1 flex-col justify-between pt-4'>
        {isLoading ? (
          <div className='space-y-3'>
            <Skeleton className='h-4 w-1/2 bg-slate-800' />
            <Skeleton className='h-4 w-1/2 bg-slate-800' />
            <Skeleton className='h-4 w-1/3 bg-slate-800' />
            <Skeleton className='h-12 w-full bg-slate-800' />
            <Skeleton className='h-3 w-full rounded-full bg-slate-800' />
          </div>
        ) : (
          <div className='space-y-4 text-xs'>
            <div className='flex items-center justify-between'>
              <span className='flex items-center gap-2 text-slate-400'>
                <WifiHighIcon className='h-4 w-4' />
                Traffic Limit
              </span>
              <span className='font-semibold text-slate-200'>
                {stats?.traffic_limit ? `${stats.traffic_limit} GB` : 'Unlimited'}
              </span>
            </div>

            <div className='flex items-center justify-between'>
              <span className='flex items-center gap-2 text-slate-400'>
                <ClockFadingIcon className='h-4 w-4' />
                Expiration
              </span>
              <span className='font-semibold text-emerald-400'>
                {stats?.expire_time ? `${stats?.expire_time} (${remainingDays(stats?.expire_time)} Days)` : 'Active'}
              </span>
            </div>

            <div className='grid grid-cols-2 gap-3 pt-1'>
              <div className='bg-slate-950/40 border border-slate-800/50 p-3 rounded-xl flex flex-col justify-between'>
                <span className='text-[10px] font-bold text-emerald-400 tracking-wider mb-2 block'>DOWNLOAD</span>
                <div className='text-sm font-bold text-slate-100'>{stats?.download_usage ?? 0} GB</div>
              </div>
              <div className='bg-slate-950/40 border border-slate-800/50 p-3 rounded-xl flex flex-col justify-between'>
                <span className='text-[10px] font-bold text-indigo-400 tracking-wider mb-2 block'>UPLOAD</span>
                <div className='text-sm font-bold text-slate-100'>{stats?.upload_usage ?? 0} GB</div>
              </div>
            </div>

            <div className='pt-2 border-t border-slate-800/60 flex items-center justify-between font-semibold'>
              <span className='flex items-center gap-2 text-slate-400'>
                <GaugeIcon className='h-4 w-4' />
                Total Usage
              </span>
              <span className='text-slate-200'>
                {stats?.total_usage ?? 0} GB {stats?.traffic_limit ? `(${stats.usage_percent}%)` : ''}
              </span>
            </div>

            {stats?.traffic_limit && (
              <div>
                <Progress value={Number(stats.usage_percent)} className='h-2 bg-slate-950' />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}