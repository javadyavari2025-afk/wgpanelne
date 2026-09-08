'use client'

import { IconCircleFilled } from '@tabler/icons-react'
import { PeerStats } from '@/schema/peers.ts'
import clsx from 'clsx'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ClockFadingIcon,
  WifiHighIcon,
  ActivityIcon,
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
  const isOnline = stats?.is_online
  const statusText = isOnline ? 'آنلاین' : 'آفلاین'
  const statusColor = isOnline ? 'text-emerald-400' : 'text-rose-400'

  return (
    <Card className='border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-xl rounded-2xl p-2'>
      <CardHeader className='pb-2'>
        <CardTitle className='flex items-center gap-2 text-base font-semibold text-emerald-400'>
          <ActivityIcon className='h-5 w-5' />
          <span>وضعیت مصرف و اعتبار</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className='space-y-3'>
            <Skeleton className='h-4 w-full bg-slate-800' />
            <Skeleton className='h-4 w-3/4 bg-slate-800' />
            <Skeleton className='h-4 w-1/2 bg-slate-800' />
          </div>
        ) : (
          <div className='space-y-3.5 text-sm'>
            <div className='flex items-center justify-between py-1 border-b border-slate-800/60'>
              <span className='text-slate-400'>وضعیت اتصال</span>
              <div className='flex items-center gap-1.5 font-medium'>
                <IconCircleFilled className={clsx('h-2.5 w-2.5', statusColor)} />
                <span className={statusColor}>{statusText}</span>
              </div>
            </div>

            <div className='flex items-center justify-between py-1 border-b border-slate-800/60'>
              <span className='text-slate-400 flex items-center gap-2'>
                <WifiHighIcon className='h-4 w-4 text-teal-400' /> محدودیت حجم
              </span>
              <span className='font-medium text-slate-200'>
                {stats?.traffic_limit ? `${stats.traffic_limit} GB` : 'نامحدود'}
              </span>
            </div>

            <div className='flex items-center justify-between py-1 border-b border-slate-800/60'>
              <span className='text-slate-400 flex items-center gap-2'>
                <ClockFadingIcon className='h-4 w-4 text-amber-400' /> اعتبار زمانی
              </span>
              <span className='font-medium text-slate-200'>
                {stats?.expire_time
                  ? `${remainingDays(stats?.expire_time)} روز دیگر`
                  : 'بدون محدودیت'}
              </span>
            </div>

            <div className='grid grid-cols-2 gap-2 pt-1'>
              <div className='bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between'>
                <span className='text-xs text-slate-400 flex items-center gap-1'>
                  <ArrowDownIcon className='h-3.5 w-3.5 text-cyan-400' /> دانلود
                </span>
                <span className='text-xs font-semibold text-slate-200'>
                  {stats?.download_usage ?? 0} GB
                </span>
              </div>
              <div className='bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between'>
                <span className='text-xs text-slate-400 flex items-center gap-1'>
                  <ArrowUpIcon className='h-3.5 w-3.5 text-indigo-400' /> آپلود
                </span>
                <span className='text-xs font-semibold text-slate-200'>
                  {stats?.upload_usage ?? 0} GB
                </span>
              </div>
            </div>

            {stats?.traffic_limit && (
              <div className='space-y-1.5 pt-2'>
                <div className='flex justify-between text-xs text-slate-400'>
                  <span>حجم مصرف شده</span>
                  <span>{stats?.total_usage ?? 0} GB ({stats.usage_percent}%)</span>
                </div>
                <Progress
                  value={Number(stats.usage_percent)}
                  className='h-2 bg-slate-800 [&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-teal-500'
                />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}