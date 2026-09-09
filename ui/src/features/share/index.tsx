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

  if (statsError && (statsError as AxiosError)?.response?.status === 404) {
    return <NotFoundError />
  }

  return (
    <div className='max-w-[1400px] mx-auto space-y-6 p-4 sm:p-6 lg:p-8 animate-fade-in'>
      {/* Header compact section without MWPanel banner */}
      <div className='relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900/40 via-zinc-900/40 to-slate-900/40 p-5 sm:p-6 border border-white/10 shadow-xl backdrop-blur-2xl text-center space-y-1.5'>
        <h1 className='text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent'>
          Welcome{stats?.name ? `, ${stats.name}` : ''}
        </h1>
        <p className='text-zinc-400 text-xs sm:text-sm max-w-lg mx-auto'>
          Scan the QR code with WireGuard or download your configuration file to connect.
        </p>
      </div>

      {/* 3 Main Cards side-by-side in 3 columns */}
      <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3 items-stretch'>
        <div className='h-full transform transition-all duration-300 hover:scale-[1.01]'>
          <PeerQRCodeCard isLoading={qrCodeLoading} qrCode={qrCode} />
        </div>
        <div className='h-full transform transition-all duration-300 hover:scale-[1.01]'>
          {configCard}
        </div>
        <div className='h-full transform transition-all duration-300 hover:scale-[1.01]'>
          {statsCard}
        </div>
      </div>

      {/* Telegram Card below if enabled */}
      {telegramStatus?.enabled && (
        <div className='max-w-2xl mx-auto transform transition-all duration-300 hover:scale-[1.01]'>
          <PeerTelegramCard
            isLoading={telegramStatusLoading || telegramLinkLoading}
            shareId={shareId}
            botStatus={telegramStatus}
            linkStatus={telegramLink}
          />
        </div>
      )}
    </div>
  )
}