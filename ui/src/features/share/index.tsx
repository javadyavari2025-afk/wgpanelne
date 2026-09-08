'use client'

import { AxiosError } from 'axios'
import { useSearch } from '@tanstack/react-router'
import { IconRoute } from '@tabler/icons-react'
import { useTelegramStatusQuery } from '@/hooks/telegram/useTelegramStatusQuery'
import { usePeerTelegramStatusQuery } from '@/hooks/telegram/usePeerTelegramStatusQuery.ts'
import { useUserConfigQuery } from '@/hooks/user/useUserConfigQuery.ts'
import { useUserDetailsQuery } from '@/hooks/user/useUserDetailsQuery.ts'
import { useUserQRCodeQuery } from '@/hooks/user/useUserQRCodeQuery.ts'
import NotFoundError from '@/features/errors/not-found-error.tsx'
import PeerConfigCard from '@/features/share/components/peer-config-card.tsx'
import PeerQRCodeCard from '@/features/share/components/peer-qrcode-card.tsx'
import PeerStatsCard from '@/features/share/components/peer-stats-card.tsx'
import PeerTelegramCard from '@/features/share/components/peer-telegram-card.tsx'

export default function PeerShare() {
  const { shareId } = useSearch({ from: '/share' })

  const {
    data: stats,
    error: statsError,
    isLoading: statsLoading,
  } = useUserDetailsQuery(shareId)

  const { data: configBlob, isLoading: configLoading } =
    useUserConfigQuery(shareId)

  const { data: qrCode, isLoading: qrCodeLoading } = useUserQRCodeQuery(shareId)
  const { data: telegramStatus, isLoading: telegramStatusLoading } =
    useTelegramStatusQuery()
  const { data: telegramLink, isLoading: telegramLinkLoading } =
    usePeerTelegramStatusQuery(
      telegramStatus?.enabled ? shareId : undefined
    )

  const configCard = (
    <PeerConfigCard
      isLoading={configLoading}
      blob={
        configBlob
          ? new Blob([configBlob], { type: 'text/plain' })
          : undefined
      }
      peerName={stats?.name}
    />
  )

  const statsCard = (
    <PeerStatsCard isLoading={statsLoading} stats={stats} />
  )

  if (statsError && (statsError as AxiosError)?.response?.status === 404) {
    return <NotFoundError />
  }

  return (
    <div className='min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6'>
      <div className='w-full max-w-4xl mx-auto space-y-6'>
        
        {/* هدر زیبا و مینیمال */}
        <div className='text-center space-y-2 py-2'>
          <div className='inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium shadow-sm'>
            <IconRoute className='h-4 w-4' />
            <span>Secure WireGuard Connection</span>
          </div>
          <h1 className='text-2xl sm:text-3xl font-extrabold tracking-tight text-white'>
            {stats?.name ? `خوش آمدید، ${stats.name}` : 'به پنل اتصال خوش آمدید'}
          </h1>
          <p className='text-slate-400 text-xs sm:text-sm max-w-md mx-auto'>
            برای اتصال، QR کد زیر را اسکن کنید یا فایل کانفیگ را دانلود نمایید.
          </p>
        </div>

        {/* ساختار کارت‌ها بر اساس فعال بودن تلگرام */}
        {telegramStatus?.enabled ? (
          <div className='grid gap-6 md:grid-cols-2 items-start'>
            <PeerQRCodeCard isLoading={qrCodeLoading} qrCode={qrCode} />
            {configCard}
            <PeerTelegramCard
              isLoading={telegramStatusLoading || telegramLinkLoading}
              shareId={shareId}
              botStatus={telegramStatus}
              linkStatus={telegramLink}
            />
            {statsCard}
          </div>
        ) : (
          <div className='grid items-start gap-6 md:grid-cols-2'>
            <div className='w-full'>
              <PeerQRCodeCard isLoading={qrCodeLoading} qrCode={qrCode} />
            </div>
            <div className='space-y-6 w-full'>
              {configCard}
              {statsCard}
            </div>
          </div>
        )}

        {/* فوتر ساده */}
        <div className='text-center text-xs text-slate-500 pt-4 border-t border-slate-900'>
          Powered by MWPanel &bull; Fast & Secure
        </div>
      </div>
    </div>
  )
}