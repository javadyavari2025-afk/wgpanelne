'use client'

import PeerStatsCard from './peer-stats-card'
import PeerQrcodeCard from './peer-qrcode-card'
import PeerConfigCard from './peer-config-card'
import PeerTelegramCard from './peer-telegram-card'
import type { PeerDataType } from '@/schema/peer.ts'

export default function PeerSharePage({ data }: { data: PeerDataType }) {
  const {
    isLoading,
    shareId,
    trafficLimitBytes,
    transferUsedBytes,
    downloadBytes,
    uploadBytes,
    status,
    config,
    botStatus,
    linkStatus,
  } = data

  return (
    <main className='min-h-screen bg-[#070913] relative overflow-x-hidden text-white flex items-center justify-center p-4 sm:p-6 lg:p-10'>
      {/* Background Ambient Glows */}
      <div className='absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-gradient-to-tr from-indigo-600/20 to-purple-600/10 rounded-full blur-[100px] pointer-events-none' />
      <div className='absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] bg-gradient-to-tr from-pink-600/15 to-blue-600/15 rounded-full blur-[120px] pointer-events-none' />

      <div className='max-w-[1300px] w-full mx-auto space-y-8 relative z-10'>
        {/* Header Title */}
        <div className='text-center space-y-2'>
          <span className='text-[11px] uppercase tracking-widest text-indigo-400 font-bold'>Glassmorphism UI Presentation</span>
          <h1 className='text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent'>
            Welcome, Javad
          </h1>
        </div>

        {/* Responsive Grid Layout */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch'>
          <PeerStatsCard
            isLoading={isLoading}
            trafficLimitBytes={trafficLimitBytes}
            transferUsedBytes={transferUsedBytes}
            downloadBytes={downloadBytes}
            uploadBytes={uploadBytes}
            status={status}
          />

          <PeerQrcodeCard isLoading={isLoading} config={config} />

          <PeerConfigCard isLoading={isLoading} config={config} />

          <div className='md:col-span-2 lg:col-span-3'>
            <PeerTelegramCard
              isLoading={isLoading}
              shareId={shareId}
              botStatus={botStatus}
              linkStatus={linkStatus}
            />
          </div>
        </div>
      </div>
    </main>
  )
}