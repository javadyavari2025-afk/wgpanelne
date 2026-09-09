'use client'

import { useState } from 'react'
import { QrCode, Eye, EyeOff } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

interface QRCodeCardProps {
  isLoading: boolean
  qrCode?: string
}

export default function PeerQRCodeCard({ isLoading, qrCode }: QRCodeCardProps) {
  const [isBlurred, setIsBlurred] = useState(true)

  const handleToggleBlur = () => {
    setIsBlurred((prev) => !prev)
  }

  return (
    <Card className='flex h-full flex-col justify-between border-2 border-sky-400/50 bg-gradient-to-br from-blue-500/30 via-indigo-600/30 to-sky-700/30 backdrop-blur-2xl shadow-2xl shadow-sky-900/30 rounded-3xl overflow-hidden text-white'>
      <CardHeader className='flex flex-row items-center justify-between pb-3 border-b border-white/20 bg-sky-600/20'>
        <div className='flex items-center gap-3'>
          <div className='p-2.5 rounded-2xl bg-sky-400/30 text-sky-200 shadow-inner'>
            <QrCode className='h-5 w-5' />
          </div>
          <CardTitle className='text-lg font-black tracking-wide text-white'>QR Code</CardTitle>
        </div>
        {!isLoading && qrCode && (
          <Button
            variant='ghost'
            size='sm'
            onClick={handleToggleBlur}
            className='h-8 px-3 text-xs font-bold text-sky-100 hover:text-white hover:bg-white/20 gap-1.5 rounded-xl border border-white/20'
          >
            {isBlurred ? <Eye className='h-4 w-4' /> : <EyeOff className='h-4 w-4' />}
            {isBlurred ? 'Reveal' : 'Hide'}
          </Button>
        )}
      </CardHeader>

      <CardContent className='flex flex-1 items-center justify-center p-6'>
        {isLoading ? (
          <Skeleton className='h-[200px] w-[200px] rounded-2xl bg-white/20' />
        ) : (
          <div
            onClick={handleToggleBlur}
            className='relative cursor-pointer p-4 rounded-3xl bg-white/20 border border-white/30 shadow-inner transition-all hover:scale-105'
            title={isBlurred ? 'Click to reveal' : 'Click to hide'}
          >
            <img
              src={qrCode}
              alt='WireGuard QR Code'
              width={200}
              height={200}
              className={`h-[190px] w-[190px] sm:h-[200px] sm:w-[200px] rounded-2xl transition-all duration-300 bg-white p-2 ${
                isBlurred ? 'blur-md scale-95 opacity-20' : 'blur-0 scale-100 opacity-100'
              }`}
            />
            {isBlurred && (
              <div className='absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-black/40 backdrop-blur-[3px] transition-all'>
                <span className='px-4 py-2 rounded-full bg-white/30 text-white border border-white/40 text-xs font-bold flex items-center gap-2 shadow-xl'>
                  <Eye className='h-4 w-4' /> Show QR Code
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}