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
  Activity,
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
  const statusColor = stats?.is_online ? 'text-emerald-300' : 'text-rose-300'

  return (
    <Card className='flex h-full flex-col justify-between border-2 border-emerald-400/50 bg-gradient-to-br from-emerald-500/30 via-teal-600/30 to-cyan-700/30 backdrop-blur-2xl shadow-2xl shadow-emerald-900/30 rounded-3xl overflow-hidden text-white'>
      <CardHeader className='flex flex-row items-center justify-between pb-3 border-b border-white/20 bg-emerald-600/20'>
        <div className='flex items-center gap-3'>
          <div className='p-2.5 rounded-2xl bg-emerald-400/30 text-emerald-200 shadow-inner'>
            <Activity className='h-5 w-5' />
          </div>
          <CardTitle className='text-lg font-black tracking-wide text-white'>Statistics</CardTitle>
        </div>
      </CardHeader>

      <CardContent className='flex flex-1 flex-col justify-center p-5 sm:p-6'>
        {isLoading ? (
          <div className='space-y-3 py-2'>
            <Skeleton className='h-5 w-full bg-white/20' />
            <Skeleton className='h-5 w-full bg-white/20' />
            <Skeleton className='h-5 w-full bg-white/20' />
            <Skeleton className='h-5 w-full bg-white/20' />
          </div>
        ) : (
          <div className='space-y-3 text-xs sm:text-sm font-medium'>
            <div className='flex items-center justify-between p-3 rounded-2xl bg-white/15 border border-white/20 shadow-sm'>
              <span className='flex items-center gap-2 text-emerald-100 font-semibold'>
                <EthernetPortIcon className='h-4 w-4 text-emerald-300' />
                Status
              </span>
              <div className='flex items-center gap-1.5 font-bold px-3 py-1 rounded-full bg-black/30 border border-white/20'>
                <IconCircleFilled className={clsx('h-2.5 w-2.5 animate-pulse', statusColor)} />
                <span className={clsx('capitalize', statusColor)}>{status}</span>
              </div>
            </div>

            <div className='flex items-center justify-between p-3 rounded-2xl bg-white/15 border border-white/20 shadow-sm'>
              <span className='flex items-center gap-2 text-emerald-100 font-semibold'>
                <WifiHighIcon className='h-4 w-4 text-emerald-300' />
                Limit
              </span>
              <span className='font-bold text-white'>
                {stats?.traffic_limit ? `${stats.traffic_limit} GB` : 'Unlimited'}
              </span>
            </div>

            <div className='flex items-center justify-between p-3 rounded-2xl bg-white/15 border border-white/20 shadow-sm'>
              <span className='flex items-center gap-2 text-emerald-100 font-semibold'>
                <ClockFadingIcon className='h-4 w-4 text-emerald-300' />
                Expire
              </span>
              <span className='font-bold text-white'>
                {stats?.expire_time ? `${remainingDays(stats?.expire_time)}d left` : 'Never'}
              </span>
            </div>

            <div className='grid grid-cols-2 gap-3 pt-1'>
              <div className='flex flex-col justify-between p-3 rounded-2xl bg-emerald-500/30 border border-white/20 shadow-inner space-y-1'>
                <span className='flex items-center gap-1.5 text-xs text-emerald-200 font-bold'>
                  <ArrowDownIcon className='h-3.5 w-3.5 text-emerald-300' />
                  DOWNLOAD
                </span>
                <span className='font-black text-sm sm:text-base text-white'>{stats?.download_usage ?? 0} GB</span>
              </div>

              <div className='flex flex-col justify-between p-3 rounded-2xl bg-emerald-500/30 border border-white/20 shadow-inner space-y-1'>
                <span className='flex items-center gap-1.5 text-xs text-emerald-200 font-bold'>
                  <ArrowUpIcon className='h-3.5 w-3.5 text-emerald-300' />
                  UPLOAD
                </span>
                <span className='font-black text-sm sm:text-base text-white'>{stats?.upload_usage ?? 0} GB</span>
              </div>
            </div>

            <div className='space-y-2 pt-2 border-t border-white/20'>
              <div className='flex items-center justify-between font-bold text-xs sm:text-sm'>
                <span className='flex items-center gap-2 text-white'>
                  <GaugeIcon className='h-4 w-4 text-emerald-300' />
                  Total Used
                </span>
                <span className='text-emerald-200 font-black'>
                  {stats?.total_usage ?? 0} GB {stats?.traffic_limit ? `(${stats.usage_percent}%)` : ''}
                </span>
              </div>

              {stats?.traffic_limit && (
                <Progress value={Number(stats.usage_percent)} className='h-2.5 bg-black/40 [&>div]:bg-emerald-300 rounded-full' />
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}