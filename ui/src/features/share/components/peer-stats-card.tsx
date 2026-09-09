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
  const statusColor = stats?.is_online ? 'text-emerald-500' : 'text-rose-500'

  return (
    <Card className='flex h-full flex-col justify-between border-border/60 bg-gradient-to-b from-card/80 to-card shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden'>
      <CardHeader className='flex flex-row items-center justify-between pb-3 border-b border-border/40'>
        <div className='flex items-center gap-2.5'>
          <div className='p-2 rounded-xl bg-emerald-500/10 text-emerald-500 shadow-inner'>
            <Activity className='h-5 w-5' />
          </div>
          <CardTitle className='text-lg font-bold'>Statistics</CardTitle>
        </div>
      </CardHeader>

      <CardContent className='flex flex-1 flex-col justify-center pt-4'>
        {isLoading ? (
          <div className='space-y-4 py-2'>
            <Skeleton className='h-5 w-full rounded-md' />
            <Skeleton className='h-5 w-full rounded-md' />
            <Skeleton className='h-5 w-full rounded-md' />
            <Skeleton className='h-5 w-full rounded-md' />
            <Skeleton className='h-5 w-full rounded-md' />
            <Skeleton className='h-4 w-full rounded-full mt-4' />
          </div>
        ) : (
          <div className='space-y-3.5 text-sm'>
            <div className='flex items-center justify-between p-2.5 rounded-xl bg-zinc-950/5 dark:bg-zinc-900/30 border border-border/40'>
              <span className='flex items-center gap-2.5 text-muted-foreground font-medium'>
                <EthernetPortIcon className='h-4 w-4 text-primary' />
                Connection Status
              </span>
              <div className='flex items-center gap-2 font-semibold px-2.5 py-1 rounded-full bg-background border border-border/50 shadow-xs'>
                <IconCircleFilled className={clsx('h-2.5 w-2.5 animate-pulse', statusColor)} />
                <span className={clsx('capitalize text-xs', statusColor)}>
                  {status}
                </span>
              </div>
            </div>

            <div className='flex items-center justify-between p-2.5 rounded-xl bg-zinc-950/5 dark:bg-zinc-900/30 border border-border/40'>
              <span className='flex items-center gap-2.5 text-muted-foreground font-medium'>
                <WifiHighIcon className='h-4 w-4 text-primary' />
                Traffic Limit
              </span>
              <span className='font-semibold'>
                {stats?.traffic_limit
                  ? `${stats.traffic_limit} GB`
                  : 'Unlimited'}
              </span>
            </div>

            <div className='flex items-center justify-between p-2.5 rounded-xl bg-zinc-950/5 dark:bg-zinc-900/30 border border-border/40'>
              <span className='flex items-center gap-2.5 text-muted-foreground font-medium'>
                <ClockFadingIcon className='h-4 w-4 text-primary' />
                Expire Time
              </span>
              <span className='font-semibold text-xs sm:text-sm text-right'>
                {stats?.expire_time
                  ? `${stats?.expire_time} (${remainingDays(stats?.expire_time)}d left)`
                  : 'Never'}
              </span>
            </div>

            <div className='grid grid-cols-2 gap-3 pt-1'>
              <div className='flex items-center justify-between p-2.5 rounded-xl bg-blue-500/5 border border-blue-500/10'>
                <span className='flex items-center gap-2 text-xs text-muted-foreground'>
                  <ArrowDownIcon className='h-3.5 w-3.5 text-blue-500' />
                  Download
                </span>
                <span className='font-bold text-xs'>{stats?.download_usage ?? 0} GB</span>
              </div>

              <div className='flex items-center justify-between p-2.5 rounded-xl bg-indigo-500/5 border border-indigo-500/10'>
                <span className='flex items-center gap-2 text-xs text-muted-foreground'>
                  <ArrowUpIcon className='h-3.5 w-3.5 text-indigo-500' />
                  Upload
                </span>
                <span className='font-bold text-xs'>{stats?.upload_usage ?? 0} GB</span>
              </div>
            </div>

            <div className='space-y-2 pt-2 border-t border-border/40'>
              <div className='flex items-center justify-between font-semibold'>
                <span className='flex items-center gap-2.5 text-foreground'>
                  <GaugeIcon className='h-4 w-4 text-primary' />
                  Total Used
                </span>
                <span className='text-primary font-bold'>
                  {stats?.total_usage ?? 0} GB{' '}
                  {stats?.traffic_limit ? `(${stats.usage_percent}%)` : ''}
                </span>
              </div>

              {stats?.traffic_limit && (
                <div className='space-y-1'>
                  <Progress value={Number(stats.usage_percent)} className='h-2.5 rounded-full bg-secondary' />
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}