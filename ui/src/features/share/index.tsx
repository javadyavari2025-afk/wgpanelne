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
    <div className='max-w-7xl mx-auto space-y-8 p-4 sm:p-6 lg:p-8 animate-fade-in'>
      <div className='relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 p-6 sm:p-8 border border-border/50 shadow-sm backdrop-blur-xl'>
        <div className='absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl pointer-events-none' />
        <div className='absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl pointer-events-none' />
        
        <div className='relative z-10 space-y-3 text-center'>
          <div className='inline-flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-inner mb-2'>
            <IconRoute className='h-5 w-5 animate-pulse' />
            <span className='font-bold tracking-wide text-sm'>MWPanel Secure Share</span>
          </div>
          <h1 className='text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent'>
            Welcome{stats?.name ? `, ${stats.name}` : ''}
          </h1>
          <p className='text-muted-foreground text-sm sm:text-base max-w-xl mx-auto'>
            Scan the QR code with your WireGuard client or download your custom configuration file to connect instantly.
          </p>
        </div>
      </div>

      {telegramStatus?.enabled ? (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-2'>
          <div className='transform transition-all duration-300 hover:translate-y-[-2px]'>
            <PeerQRCodeCard isLoading={qrCodeLoading} qrCode={qrCode} />
          </div>
          <div className='transform transition-all duration-300 hover:translate-y-[-2px]'>
            {configCard}
          </div>
          <div className='transform transition-all duration-300 hover:translate-y-[-2px]'>
            <PeerTelegramCard
              isLoading={telegramStatusLoading || telegramLinkLoading}
              shareId={shareId}
              botStatus={telegramStatus}
              linkStatus={telegramLink}
            />
          </div>
          <div className='transform transition-all duration-300 hover:translate-y-[-2px]'>
            {statsCard}
          </div>
        </div>
      ) : (
        <div className='grid items-start gap-6 md:grid-cols-2'>
          <div className='transform transition-all duration-300 hover:translate-y-[-2px]'>
            <PeerQRCodeCard isLoading={qrCodeLoading} qrCode={qrCode} />
          </div>
          <div className='space-y-6 transform transition-all duration-300 hover:translate-y-[-2px]'>
            {configCard}
            {statsCard}
          </div>
        </div>
      )}
    </div>
  )
}