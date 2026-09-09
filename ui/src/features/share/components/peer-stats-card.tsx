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
  const statusColor = stats?.is_online ? 'text-emerald-400' : 'text-rose-400'

  return (
    <Card className='flex h-full flex-col justify-between border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-emerald-950/20 to-teal-950/10 backdrop-blur-xl shadow-xl shadow-emerald-500/5 hover:border-emerald-500/50 transition-all duration-300 rounded-2xl overflow-hidden'>
      <CardHeader className='flex flex-row items-center justify-between pb-2 border-b border-emerald-500/20 bg-emerald-500/5'>
        <div className='flex items-center gap-2.5'>
          <div className='p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shadow-inner'>
            <Activity className='h-4 w-4' />
          </div>
          <CardTitle className='text-base font-bold text-emerald-100'>Statistics</CardTitle>
        </div>
      </CardHeader>

      <CardContent className='flex flex-1 flex-col justify-center p-4 sm:p-5'>
        {isLoading ? (
          <div className='space-y-3 py-2'>
            <Skeleton className='h-4 w-full bg-emerald-500/10' />
            <Skeleton className='h-4 w-full bg-emerald-500/10' />
            <Skeleton className='h-4 w-full bg-emerald-500/10' />
            <Skeleton className='h-4 w-full bg-emerald-500/10' />
          </div>
        ) : (
          <div className='space-y-2.5 text-xs sm:text-sm'>
            <div className='flex items-center justify-between p-2 rounded-xl bg-black/40 border border-emerald-500/20'>
              <span className='flex items-center gap-2 text-emerald-200/70 font-medium text-xs'>
                <EthernetPortIcon className='h-3.5 w-3.5 text-emerald-400' />
                Status
              </span>
              <div className='flex items-center gap-1.5 font-semibold px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30'>
                <IconCircleFilled className={clsx('h-2 w-2 animate-pulse', statusColor)} />
                <span className={clsx('capitalize text-xs', statusColor)}>{status}</span>
              </div>
            </div>

            <div className='flex items-center justify-between p-2 rounded-xl bg-black/40 border border-emerald-500/20'>
              <span className='flex items-center gap-2 text-emerald-200/70 font-medium text-xs'>
                <WifiHighIcon className='h-3.5 w-3.5 text-emerald-400' />
                Limit
              </span>
              <span className='font-bold text-emerald-100 text-xs'>
                {stats?.traffic_limit ? `${stats.traffic_limit} GB` : 'Unlimited'}
              </span>
            </div>

            <div className='flex items-center justify-between p-2 rounded-xl bg-black/40 border border-emerald-500/20'>
              <span className='flex items-center gap-2 text-emerald-200/70 font-medium text-xs'>
                <ClockFadingIcon className='h-3.5 w-3.5 text-emerald-400' />
                Expire
              </span>
              <span className='font-bold text-emerald-100 text-xs'>
                {stats?.expire_time ? `${remainingDays(stats?.expire_time)}d left` : 'Never'}
              </span>
            </div>

            <div className='grid grid-cols-2 gap-2 pt-0.5'>
              <div className='flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20'>
                <span className='flex items-center gap-1 text-[11px] text-emerald-300/80'>
                  <ArrowDownIcon className='h-3 w-3 text-emerald-400' />
                  DL
                </span>
                <span className='font-bold text-xs text-emerald-100'>{stats?.download_usage ?? 0} GB</span>
              </div>

              <div className='flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20'>
                <span className='flex items-center gap-1 text-[11px] text-emerald-300/80'>
                  <ArrowUpIcon className='h-3 w-3 text-emerald-400' />
                  UL
                </span>
                <span className='font-bold text-xs text-emerald-100'>{stats?.upload_usage ?? 0} GB</span>
              </div>
            </div>

            <div className='space-y-1.5 pt-1 border-t border-emerald-500/20'>
              <div className='flex items-center justify-between font-semibold text-xs'>
                <span className='flex items-center gap-2 text-emerald-200'>
                  <GaugeIcon className='h-3.5 w-3.5 text-emerald-400' />
                  Total Used
                </span>
                <span className='text-emerald-300 font-bold'>
                  {stats?.total_usage ?? 0} GB {stats?.traffic_limit ? `(${stats.usage_percent}%)` : ''}
                </span>
              </div>

              {stats?.traffic_limit && (
                <Progress value={Number(stats.usage_percent)} className='h-2 bg-black/50 [&>div]:bg-emerald-500' />
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}