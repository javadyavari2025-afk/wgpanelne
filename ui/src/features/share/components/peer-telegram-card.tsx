'use client'

import { IconBrandTelegram } from '@tabler/icons-react'
import { BellIcon, UserIcon } from 'lucide-react'
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
    alertsLabel = alertsOn ? 'On' : 'Off'
  }
  const botName = botStatus?.bot_username
    ? `@${botStatus.bot_username.replace(/^@/, '')}`
    : '—'
  const account = linkStatus?.username || (linked ? 'Chat linked' : '—')

  return (
    <Card className='bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl px-5 py-4 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 text-slate-100'>
      <div className='flex items-center space-x-3 space-x-reverse w-full md:w-auto'>
        <div className='p-2.5 bg-sky-500/10 text-sky-400 rounded-xl'>
          <IconBrandTelegram className='w-5 h-5' />
        </div>
        <div>
          <div className='text-xs font-semibold text-slate-200 tracking-wider'>TELEGRAM NOTIFICATION</div>
          <div className='text-[11px] text-slate-400'>دریافت گزارش‌های مصرف و وضعیت اتصال از طریق ربات</div>
        </div>
      </div>

      <div className='flex items-center gap-4 w-full md:w-auto justify-between md:justify-end'>
        {isLoading ? (
          <Skeleton className='h-6 w-24 bg-slate-800 rounded-full' />
        ) : (
          <span className={`px-3 py-1 text-[11px] font-medium rounded-full border ${linked ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800/50 text-slate-400 border-slate-700/50'}`}>
            {linked ? 'Linked' : 'Not Linked'}
          </span>
        )}

        {startURL && !isLoading && (
          <a
            href={startURL}
            target='_blank'
            rel='noreferrer'
            className='bg-[#2AABEE] hover:bg-[#229ED9] inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-md transition-all active:scale-95'
          >
            <IconBrandTelegram className='h-4 w-4' />
            {linked ? 'Open Bot' : 'Connect'}
          </a>
        )}
      </div>
    </Card>
  )
}