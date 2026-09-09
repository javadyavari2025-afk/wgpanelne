'use client'

interface PeerQrcodeCardProps {
  isLoading?: boolean
  config: string
}

export default function PeerQrcodeCard({ isLoading, config }: PeerQrcodeCardProps) {
  return (
    <div className='flex flex-col justify-between rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 sm:p-7 relative overflow-hidden'>
      <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent' />
      <div>
        <div className='flex items-center justify-between pb-4 border-b border-white/10 mb-5'>
          <span className='text-xs font-bold tracking-wider text-slate-300 uppercase'>QR Code</span>
          <span className='text-xs text-indigo-400 font-medium'>WireGuard</span>
        </div>
        <div className='flex items-center justify-center py-4'>
          <div className='p-4 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-md shadow-inner flex items-center justify-center'>
            <div className='w-40 h-40 bg-slate-900/90 rounded-xl flex flex-col items-center justify-center text-center p-4 border border-white/10'>
              <span className='text-xs font-mono text-slate-300 tracking-wider'>{isLoading ? 'LOADING...' : 'QR CODE'}</span>
              <span className='text-[10px] text-slate-500 mt-1 truncate max-w-full'>{config ? 'WireGuard Config' : 'No Config'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='pt-4 text-center'>
        <p className='text-xs text-slate-400'>Scan with your WireGuard app to connect instantly.</p>
      </div>
    </div>
  )
}