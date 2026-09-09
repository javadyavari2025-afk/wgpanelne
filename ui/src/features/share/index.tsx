'use client'

import { AxiosError } from 'axios'
import { useSearch } from '@tanstack/react-router'
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

  const qrCodeCard = (
    <PeerQRCodeCard isLoading={qrCodeLoading} qrCode={qrCode} />
  )

  const telegramCard = (
    <PeerTelegramCard
      isLoading={telegramStatusLoading || telegramLinkLoading}
      shareId={shareId}
      botStatus={telegramStatus}
      linkStatus={telegramLink}
    />
  )

  if (statsError && (statsError as AxiosError)?.response?.status === 404) {
    return <NotFoundError />
  }

  return (
    <div className='min-h-screen bg-[#0a0c14] text-slate-100 font-sans relative overflow-x-hidden flex flex-col items-center p-4 md:p-8'>
      {/* Background Ambient Glow Effects */}
      <div className='absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none'></div>
      <div className='absolute bottom-10 right-10 w-[250px] h-[250px] bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none'></div>

      <div className='w-full max-w-6xl z-10 space-y-6'>
        
        {/* Welcome Header */}
        <div className='text-center space-y-2 pt-2'>
          <h1 className='text-2xl md:text-3xl font-extrabold tracking-tight text-white'>
            Welcome{stats?.name ? `, ${stats.name}` : ''}
          </h1>
          <p className='text-xs text-slate-400'>
            مدیریت و دریافت مشخصات اتصال امن
          </p>
        </div>

        {/* Top 3 Cards Grid: Statistics First, then QR Code, then Configuration */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
          {statsCard}
          {qrCodeCard}
          {configCard}
        </div>

        {/* Telegram Card (Full Width Below if enabled) */}
        {telegramStatus?.enabled && (
          <div className='w-full'>
            {telegramCard}
          </div>
        )}

      </div>
    </div>
  )
}