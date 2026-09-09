'use client'

import { IconBrandTelegram } from '@tabler/icons-react'
import { BellIcon, UserIcon, Send } from 'lucide-react'
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
    <Card className='flex h-full flex-col justify-between border-border/60 bg-gradient-to-b from-card/80 to-card shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden'>
      <CardHeader className='flex flex-row items-center justify-between pb-3 border-b border-border/40'>
        <div className='flex items-center gap-2.5'>
          <div className='p-2 rounded-xl bg-sky-500/10 text-sky-500 shadow-inner'>
            <IconBrandTelegram className='h-5 w-5' />
          </div>
          <CardTitle className='text-lg font-bold'>Telegram</CardTitle>
        </div>
        {!isLoading && (
          <ColoredBadge
            color={linked ? 'green' : 'yellow'}
            text={linked ? 'linked' : 'not linked'}
          />
        )}
      </CardHeader>

      <CardContent className='flex flex-1 flex-col justify-center pt-4'>
        {isLoading ? (
          <div className='space-y-3 py-2'>
            <Skeleton className='h-5 w-full rounded-md' />
            <Skeleton className='h-5 w-full rounded-md' />
            <Skeleton className='h-5 w-full rounded-md' />
          </div>
        ) : (
          <div className='space-y-3.5 text-sm'>
            <div className='flex items-center justify-between p-2.5 rounded-xl bg-zinc-950/5 dark:bg-zinc-900/30 border border-border/40'>
              <span className='flex items-center gap-2.5 text-muted-foreground font-medium'>
                <IconBrandTelegram className='h-4 w-4 text-sky-500' />
                Bot
              </span>
              <span className='font-semibold'>{botName}</span>
            </div>

            <div className='flex items-center justify-between p-2.5 rounded-xl bg-zinc-950/5 dark:bg-zinc-900/30 border border-border/40'>
              <span className='flex items-center gap-2.5 text-muted-foreground font-medium'>
                <UserIcon className='h-4 w-4 text-sky-500' />
                Account
              </span>
              <span className='font-semibold'>{account}</span>
            </div>

            <div className='flex items-center justify-between p-2.5 rounded-xl bg-zinc-950/5 dark:bg-zinc-900/30 border border-border/40'>
              <span className='flex items-center gap-2.5 text-muted-foreground font-medium'>
                <BellIcon className='h-4 w-4 text-sky-500' />
                Alerts
              </span>
              <span className='font-semibold'>{alertsLabel}</span>
            </div>
          </div>
        )}
      </CardContent>

      {startURL && (
        <CardFooter className='pt-0 pb-5 px-6'>
          <a
            href={startURL}
            target='_blank'
            rel='noreferrer'
            className='bg-[#2AABEE] hover:bg-[#229ED9] inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-300'
          >
            <Send className='h-4 w-4' />
            {linked ? 'Open Telegram Bot' : 'Connect to Telegram Bot'}
          </a>
        </CardFooter>
      )}
    </Card>
  )
}