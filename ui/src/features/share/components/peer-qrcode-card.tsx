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
    <Card className='flex h-full flex-col justify-between border-border/60 bg-gradient-to-b from-card/80 to-card shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden'>
      <CardHeader className='flex flex-row items-center justify-between pb-3 border-b border-border/40'>
        <div className='flex items-center gap-2.5'>
          <div className='p-2 rounded-xl bg-blue-500/10 text-blue-500 shadow-inner'>
            <QrCode className='h-5 w-5' />
          </div>
          <CardTitle className='text-lg font-bold'>QR Code</CardTitle>
        </div>
        {!isLoading && qrCode && (
          <Button
            variant='ghost'
            size='sm'
            onClick={handleToggleBlur}
            className='h-8 px-2 text-xs text-muted-foreground hover:text-foreground gap-1.5'
          >
            {isBlurred ? <Eye className='h-4 w-4' /> : <EyeOff className='h-4 w-4' />}
            {isBlurred ? 'Reveal' : 'Hide'}
          </Button>
        )}
      </CardHeader>

      <CardContent className='flex flex-1 items-center justify-center p-6'>
        {isLoading ? (
          <Skeleton className='h-[260px] w-[260px] rounded-2xl' />
        ) : (
          <div
            onClick={handleToggleBlur}
            className='relative cursor-pointer group p-4 rounded-2xl bg-zinc-950/5 dark:bg-zinc-900/40 border border-border/50 shadow-inner transition-all hover:border-primary/40'
            title={isBlurred ? 'Click to reveal' : 'Click to hide'}
          >
            <img
              src={qrCode}
              alt='WireGuard QR Code'
              width={240}
              height={240}
              className={`h-[240px] w-[240px] rounded-xl transition-all duration-300 ${
                isBlurred ? 'blur-md scale-95 opacity-40' : 'blur-0 scale-100 opacity-100'
              }`}
            />
            {isBlurred && (
              <div className='absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-background/50 backdrop-blur-[2px] transition-all'>
                <span className='px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm text-xs font-medium flex items-center gap-2'>
                  <Eye className='h-3.5 w-3.5' /> Click to show QR Code
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}