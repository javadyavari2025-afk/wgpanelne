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
    <div className='min-h-screen w-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-4 sm:p-6 lg:p-8 flex flex-col justify-center items-center'>
      <div className='max-w-[1400px] w-full mx-auto space-y-6 animate-fade-in'>
        {/* Header section */}
        <div className='relative overflow-hidden rounded-3xl bg-white/20 p-6 sm:p-8 border border-white/30 shadow-2xl backdrop-blur-2xl text-center space-y-2'>
          <h1 className='text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md'>
            Welcome{stats?.name ? `, ${stats.name}` : ''}
          </h1>
          <p className='text-white/90 text-sm sm:text-base max-w-lg mx-auto font-medium'>
            Scan the QR code with WireGuard or download your configuration file to connect.
          </p>
        </div>

        {/* 3 Main Cards: Statistics first, then QR Code, then Configuration */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch'>
          <div className='h-full transform transition-all duration-300 hover:scale-[1.02]'>
            {statsCard}
          </div>
          <div className='h-full transform transition-all duration-300 hover:scale-[1.02]'>
            <PeerQRCodeCard isLoading={qrCodeLoading} qrCode={qrCode} />
          </div>
          <div className='h-full transform transition-all duration-300 hover:scale-[1.02]'>
            {configCard}
          </div>
        </div>

        {/* Telegram Card below if enabled */}
        {telegramStatus?.enabled && (
          <div className='max-w-2xl mx-auto transform transition-all duration-300 hover:scale-[1.02]'>
            <PeerTelegramCard
              isLoading={telegramStatusLoading || telegramLinkLoading}
              shareId={shareId}
              botStatus={telegramStatus}
              linkStatus={telegramLink}
            />
          </div>
        )}
      </div>
    </div>
  )
}