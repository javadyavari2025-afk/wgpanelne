'use client'

import { IconBrandTelegram } from '@tabler/icons-react'
import { Send } from 'lucide-react'
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
    alertsLabel = alertsOn ? 'On' : 'Off'
  }
  const botName = botStatus?.bot_username
    ? `@${botStatus.bot_username.replace(/^@/, '')}`
    : '—'
  const account = linkStatus?.username || (linked ? 'Chat linked' : '—')

  return (
    <Card className='flex h-full flex-col justify-between border-2 border-rose-400/50 bg-gradient-to-br from-rose-500/30 via-pink-600/30 to-purple-700/30 backdrop-blur-2xl shadow-2xl shadow-rose-900/30 rounded-3xl overflow-hidden text-white'>
      <CardHeader className='flex flex-row items-center justify-between pb-3 border-b border-white/20 bg-rose-600/20'>
        <div className='flex items-center gap-3'>
          <div className='p-2.5 rounded-2xl bg-rose-400/30 text-rose-200 shadow-inner'>
            <IconBrandTelegram className='h-5 w-5' />
          </div>
          <CardTitle className='text-lg font-black tracking-wide text-white'>Telegram Notification</CardTitle>
        </div>
        {!isLoading && (
          <div className='px-3 py-1 rounded-full bg-white/20 border border-white/30 text-xs font-bold shadow-sm'>
            <ColoredBadge
              color={linked ? 'green' : 'yellow'}
              text={linked ? 'linked' : 'not linked'}
            />
          </div>
        )}
      </CardHeader>

      <CardContent className='flex flex-1 flex-col justify-center p-5 sm:p-6'>
        {isLoading ? (
          <div className='space-y-3 py-2'>
            <Skeleton className='h-5 w-full bg-white/20' />
            <Skeleton className='h-5 w-full bg-white/20' />
          </div>
        ) : (
          <div className='grid grid-cols-3 gap-3 text-xs sm:text-sm font-medium'>
            <div className='p-3 rounded-2xl bg-black/40 border border-white/20 text-center shadow-inner'>
              <span className='block text-rose-200/80 text-[11px] font-bold mb-1'>Bot</span>
              <span className='font-black text-white truncate block'>{botName}</span>
            </div>

            <div className='p-3 rounded-2xl bg-black/40 border border-white/20 text-center shadow-inner'>
              <span className='block text-rose-200/80 text-[11px] font-bold mb-1'>Account</span>
              <span className='font-black text-white truncate block'>{account}</span>
            </div>

            <div className='p-3 rounded-2xl bg-black/40 border border-white/20 text-center shadow-inner'>
              <span className='block text-rose-200/80 text-[11px] font-bold mb-1'>Alerts</span>
              <span className='font-black text-white block'>{alertsLabel}</span>
            </div>
          </div>
        )}
      </CardContent>

      {startURL && (
        <CardFooter className='pt-0 pb-5 px-5 sm:px-6'>
          <a
            href={startURL}
            target='_blank'
            rel='noreferrer'
            className='bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black text-white shadow-xl border border-white/30 transition-all duration-300'
          >
            <Send className='h-4 w-4' />
            {linked ? 'Open Telegram Bot' : 'Connect Telegram Bot'}
          </a>
        </CardFooter>
      )}
    </Card>
  )
}