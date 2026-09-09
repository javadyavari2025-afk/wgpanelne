'use client'

import { QRCodeSVG } from 'qrcode.react'

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
            <div className='p-3 bg-slate-900 rounded-xl'>
              {isLoading ? (
                <div className='w-[145px] h-[145px] flex items-center justify-center text-slate-400 text-xs'>Loading...</div>
              ) : config ? (
                <QRCodeSVG value={config} size={145} includeMargin={false} />
              ) : (
                <div className='w-[145px] h-[145px] flex items-center justify-center text-slate-500 text-xs'>No Config</div>
              )}
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