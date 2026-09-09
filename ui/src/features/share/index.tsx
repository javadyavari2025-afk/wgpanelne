'use client'

import PeerStatsCard from './components/peer-stats-card'
import PeerQrcodeCard from './components/peer-qrcode-card'
import PeerConfigCard from './components/peer-config-card'
import PeerTelegramCard from './components/peer-telegram-card'

export default function PeerSharePage(props: any) {
  // پشتیبانی از هر دو حالت ساختار داده‌ای که ممکن است از API پاس داده شود
  const peerData = props?.data || props || {}
  
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
  } = peerData

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
            isLoading={Boolean(isLoading)}
            trafficLimitBytes={trafficLimitBytes}
            transferUsedBytes={transferUsedBytes || 0}
            downloadBytes={downloadBytes || 0}
            uploadBytes={uploadBytes || 0}
            status={status}
          />

          <PeerQrcodeCard 
            isLoading={Boolean(isLoading)} 
            config={config || ''} 
          />

          <PeerConfigCard 
            isLoading={Boolean(isLoading)} 
            config={config || ''} 
          />

          <PeerTelegramCard
            isLoading={Boolean(isLoading)}
            shareId={shareId || ''}
            botStatus={botStatus}
            linkStatus={linkStatus}
          />
        </div>
      </div>
    </main>
  )
}