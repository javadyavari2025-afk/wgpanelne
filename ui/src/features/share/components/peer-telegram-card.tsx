'use client'

import { Send } from 'lucide-react'
import { IconBrandTelegram } from '@tabler/icons-react'

interface PeerTelegramCardProps {
  isLoading?: boolean
  shareId: string
  botStatus?: {
    bot_username?: string
    bot_url?: string
  }
  linkStatus?: {
    linked?: boolean
    username?: string
    notify_enabled?: boolean
  }
}

export default function PeerTelegramCard({ isLoading, shareId, botStatus, linkStatus }: PeerTelegramCardProps) {
  const startURL = botStatus?.bot_url ? `${botStatus.bot_url}?start=${shareId}` : undefined
  const linked = Boolean(linkStatus?.linked)
  const botName = botStatus?.bot_username ? `@${botStatus.bot_username.replace(/^@/, '')}` : '—'
  const account = linkStatus?.username || (linked ? 'Chat linked' : '—')
  const alertsLabel = linked ? (linkStatus?.notify_enabled ? 'On' : 'Off') : '—'

  return (
    <div className='md:col-span-2 lg:col-span-3 flex flex-col justify-between rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 sm:p-7 relative overflow-hidden'>
      <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent' />
      <div className='flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-white/10 mb-5 gap-4'>
        <div className='flex items-center gap-3'>
          <div className='p-2.5 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20'>
            <IconBrandTelegram className='h-5 w-5' />
          </div>
          <span className='text-xs font-bold tracking-wider text-slate-300 uppercase'>Telegram Notification</span>
        </div>
        <div className='px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-center text-emerald-400'>
          {isLoading ? '...' : linked ? 'Linked' : 'Not Linked'}
        </div>
      </div>
      <div className='py-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-medium'>
        <div className='p-3.5 rounded-2xl bg-white/[0.04] border border-white/15 text-center shadow-inner'>
          <span className='block text-slate-400 text-[10px] font-bold uppercase mb-1'>Bot</span>
          <span className='font-black text-white truncate block'>{isLoading ? '...' : botName}</span>
        </div>
        <div className='p-3.5 rounded-2xl bg-white/[0.04] border border-white/15 text-center shadow-inner'>
          <span className='block text-slate-400 text-[10px] font-bold uppercase mb-1'>Account</span>
          <span className='font-black text-white truncate block'>{isLoading ? '...' : account}</span>
        </div>
        <div className='p-3.5 rounded-2xl bg-white/[0.04] border border-white/15 text-center shadow-inner'>
          <span className='block text-slate-400 text-[10px] font-bold uppercase mb-1'>Alerts</span>
          <span className='font-black text-white block'>{isLoading ? '...' : alertsLabel}</span>
        </div>
      </div>
      {startURL && (
        <div className='pt-6 mt-6 border-t border-white/10'>
          <a
            href={startURL}
            target='_blank'
            rel='noreferrer'
            className='bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:opacity-90 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-600/30 border border-white/25 transition-all'
          >
            <Send className='h-4 w-4' /> {linked ? 'Open Telegram Bot' : 'Connect Telegram Bot'}
          </a>
        </div>
      )}
    </div>
  )
}