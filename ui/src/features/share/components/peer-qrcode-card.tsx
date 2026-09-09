'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface QRCodeCardProps {
  isLoading: boolean
  qrCode?: string
}

export default function PeerQRCodeCard({ isLoading, qrCode }: QRCodeCardProps) {
  const [isBlurred, setIsBlurred] = useState(false)

  const handleToggleBlur = () => {
    setIsBlurred((prev) => !prev)
  }

  return (
    <Card className='bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl p-2 rounded-2xl shadow-xl flex h-full flex-col items-center justify-between text-center text-slate-100'>
      <CardHeader className='w-full flex flex-row items-center justify-between border-b border-slate-800/60 pb-3 space-y-0'>
        <CardTitle className='text-xs font-semibold text-slate-300 tracking-wider'>QR CODE</CardTitle>
        <span className='text-[10px] text-slate-400 font-mono'>WireGuard</span>
      </CardHeader>

      <CardContent className='flex flex-1 flex-col items-center justify-center py-4'>
        {isLoading ? (
          <Skeleton className='h-36 w-36 rounded-2xl bg-slate-800' />
        ) : (
          <div
            onClick={handleToggleBlur}
            className='p-3 bg-white rounded-2xl shadow-inner relative cursor-pointer my-auto'
            title={isBlurred ? 'Click to reveal' : 'Click to hide'}
          >
            <img
              src={qrCode}
              alt='QR Code'
              className={`h-36 w-36 object-contain transition-all duration-300 ${
                isBlurred ? 'blur-md' : 'blur-0'
              }`}
            />
            {isBlurred && (
              <div className='absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50 text-xs font-semibold text-white'>
                Click to reveal
              </div>
            )}
          </div>
        )}
      </CardContent>

      <p className='text-[11px] text-slate-400 pb-2'>Scan with your WireGuard app to connect instantly.</p>
    </Card>
  )
}