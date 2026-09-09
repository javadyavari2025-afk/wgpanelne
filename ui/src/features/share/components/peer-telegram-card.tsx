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
    <Card className='flex h-full flex-col justify-between border-rose-500/30 bg-gradient-to-br from-rose-500/10 via-rose-950/20 to-red-950/10 backdrop-blur-xl shadow-xl shadow-rose-500/5 hover:border-rose-500/50 transition-all duration-300 rounded-2xl overflow-hidden'>
      <CardHeader className='flex flex-row items-center justify-between pb-2 border-b border-rose-500/20 bg-rose-500/5'>
        <div className='flex items-center gap-2.5'>
          <div className='p-2 rounded-xl bg-rose-500/20 text-rose-400 shadow-inner'>
            <IconBrandTelegram className='h-4 w-4' />
          </div>
          <CardTitle className='text-base font-bold text-rose-100'>Telegram Notification</CardTitle>
        </div>
        {!isLoading && (
          <ColoredBadge
            color={linked ? 'green' : 'yellow'}
            text={linked ? 'linked' : 'not linked'}
          />
        )}
      </CardHeader>

      <CardContent className='flex flex-1 flex-col justify-center p-4 sm:p-5'>
        {isLoading ? (
          <div className='space-y-2 py-2'>
            <Skeleton className='h-4 w-full bg-rose-500/10' />
            <Skeleton className='h-4 w-full bg-rose-500/10' />
          </div>
        ) : (
          <div className='grid grid-cols-3 gap-2 text-xs'>
            <div className='p-2 rounded-xl bg-black/40 border border-rose-500/20 text-center'>
              <span className='block text-rose-300/70 text-[10px] mb-0.5'>Bot</span>
              <span className='font-bold text-rose-100 truncate block'>{botName}</span>
            </div>

            <div className='p-2 rounded-xl bg-black/40 border border-rose-500/20 text-center'>
              <span className='block text-rose-300/70 text-[10px] mb-0.5'>Account</span>
              <span className='font-bold text-rose-100 truncate block'>{account}</span>
            </div>

            <div className='p-2 rounded-xl bg-black/40 border border-rose-500/20 text-center'>
              <span className='block text-rose-300/70 text-[10px] mb-0.5'>Alerts</span>
              <span className='font-bold text-rose-100 block'>{alertsLabel}</span>
            </div>
          </div>
        )}
      </CardContent>

      {startURL && (
        <CardFooter className='pt-0 pb-4 px-4 sm:px-5'>
          <a
            href={startURL}
            target='_blank'
            rel='noreferrer'
            className='bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-rose-500/20 transition-all duration-300'
          >
            <Send className='h-3.5 w-3.5' />
            {linked ? 'Open Telegram Bot' : 'Connect Telegram Bot'}
          </a>
        </CardFooter>
      )}
    </Card>
  )
}