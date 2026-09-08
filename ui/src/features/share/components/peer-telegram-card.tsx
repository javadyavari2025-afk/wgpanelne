'use client'

import { IconBrandTelegram } from '@tabler/icons-react'
import { BellIcon, UserIcon } from 'lucide-react'
import { ColoredBadge } from '@/features/shared-components/status-badge.tsx'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { PeerTelegramStatus, TelegramStatus } from '@/schema/telegram.ts'

interface PeerTelegramCardProps {
  isLoading: boolean
  shareId: string
  botStatus?: TelegramStatus
  linkStatus?: PeerTelegramStatus
}

export default function PeerTelegramCard({
  isLoading,
  shareId,
  botStatus,
  linkStatus,
}: PeerTelegramCardProps) {
  const startURL = botStatus?.bot_url
    ? `${botStatus.bot_url}?start=${shareId}`
    : undefined
  const linked = Boolean(linkStatus?.linked)
  const alertsOn = Boolean(linkStatus?.notify_enabled)
  let alertsLabel = '—'
  if (linked) {
    alertsLabel = alertsOn ? 'فعال' : 'غیرفعال'
  }
  const botName = botStatus?.bot_username
    ? `@${botStatus.bot_username.replace(/^@/, '')}`
    : '—'
  const account = linkStatus?.username || (linked ? 'متصل شده' : '—')

  return (
    <Card className='border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-xl rounded-2xl p-2 flex flex-col justify-between h-full'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='flex items-center gap-2 text-base font-semibold text-emerald-400'>
          <IconBrandTelegram className='h-5 w-5' />
          <span>تلگرام</span>
        </CardTitle>
        {!isLoading && (
          <ColoredBadge
            color={linked ? 'green' : 'yellow'}
            text={linked ? 'متصل' : 'متصل نشده'}
          />
        )}
      </CardHeader>

      <CardContent className='py-4'>
        {isLoading ? (
          <div className='space-y-3'>
            <Skeleton className='h-4 w-1/2 bg-slate-800' />
            <Skeleton className='h-4 w-2/3 bg-slate-800' />
            <Skeleton className='h-4 w-1/3 bg-slate-800' />
          </div>
        ) : (
          <div className='space-y-3 text-sm'>
            <div className='flex items-center justify-between py-1 border-b border-slate-800/60'>
              <span className='text-slate-400 flex items-center gap-2'>ربات</span>
              <span className='font-medium text-slate-200'>{botName}</span>
            </div>

            <div className='flex items-center justify-between py-1 border-b border-slate-800/60'>
              <span className='text-slate-400 flex items-center gap-2'>
                <UserIcon className='h-4 w-4 text-sky-400' /> حساب کاربری
              </span>
              <span className='font-medium text-slate-200'>{account}</span>
            </div>

            <div className='flex items-center justify-between py-1'>
              <span className='text-slate-400 flex items-center gap-2'>
                <BellIcon className='h-4 w-4 text-amber-400' /> هشدارها
              </span>
              <span className='font-medium text-slate-200'>{alertsLabel}</span>
            </div>
          </div>
        )}
      </CardContent>

      {startURL && (
        <CardFooter className='pt-0'>
          <a
            href={startURL}
            target='_blank'
            rel='noreferrer'
            className='bg-[#2AABEE] hover:bg-[#229ED9] inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-900/20 transition-colors'
          >
            <IconBrandTelegram className='h-5 w-5' />
            {linked ? 'مدیریت در ربات تلگرام' : 'اتصال به ربات تلگرام'}
          </a>
        </CardFooter>
      )}
    </Card>
  )
}