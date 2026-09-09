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
    <Card className='flex h-full flex-col justify-between border-sky-500/30 bg-gradient-to-br from-sky-500/10 via-sky-950/20 to-sky-900/10 backdrop-blur-xl shadow-xl shadow-sky-500/5 hover:border-sky-500/50 transition-all duration-300 rounded-2xl overflow-hidden'>
      <CardHeader className='flex flex-row items-center justify-between pb-2 border-b border-sky-500/20 bg-sky-500/5'>
        <div className='flex items-center gap-2.5'>
          <div className='p-2 rounded-xl bg-sky-500/20 text-sky-400 shadow-inner'>
            <QrCode className='h-4 w-4' />
          </div>
          <CardTitle className='text-base font-bold text-sky-100'>QR Code</CardTitle>
        </div>
        {!isLoading && qrCode && (
          <Button
            variant='ghost'
            size='sm'
            onClick={handleToggleBlur}
            className='h-7 px-2 text-xs text-sky-300 hover:text-white hover:bg-sky-500/20 gap-1'
          >
            {isBlurred ? <Eye className='h-3.5 w-3.5' /> : <EyeOff className='h-3.5 w-3.5' />}
            {isBlurred ? 'Reveal' : 'Hide'}
          </Button>
        )}
      </CardHeader>

      <CardContent className='flex flex-1 items-center justify-center p-4 sm:p-5'>
        {isLoading ? (
          <Skeleton className='h-[200px] w-[200px] rounded-2xl bg-sky-500/10' />
        ) : (
          <div
            onClick={handleToggleBlur}
            className='relative cursor-pointer p-3 rounded-2xl bg-black/40 border border-sky-500/20 shadow-inner transition-all hover:border-sky-400/40'
            title={isBlurred ? 'Click to reveal' : 'Click to hide'}
          >
            <img
              src={qrCode}
              alt='WireGuard QR Code'
              width={200}
              height={200}
              className={`h-[190px] w-[190px] sm:h-[200px] sm:w-[200px] rounded-xl transition-all duration-300 ${
                isBlurred ? 'blur-md scale-95 opacity-30' : 'blur-0 scale-100 opacity-100'
              }`}
            />
            {isBlurred && (
              <div className='absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-sky-950/40 backdrop-blur-[2px] transition-all'>
                <span className='px-3 py-1.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-medium flex items-center gap-1.5 shadow-lg'>
                  <Eye className='h-3.5 w-3.5' /> Show QR
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}