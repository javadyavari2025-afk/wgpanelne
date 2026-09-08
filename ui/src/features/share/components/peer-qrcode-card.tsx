'use client'

import { QrCodeIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface QRCodeCardProps {
  isLoading: boolean
  qrCode?: string
}

export default function PeerQRCodeCard({ isLoading, qrCode }: QRCodeCardProps) {
  return (
    <Card className='border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden flex flex-col items-center text-center p-2'>
      <CardHeader className='pb-2'>
        <CardTitle className='flex items-center justify-center gap-2 text-base font-semibold text-emerald-400'>
          <QrCodeIcon className='h-5 w-5' />
          <span>اسکن QR کد</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex items-center justify-center p-4 w-full'>
        {isLoading ? (
          <Skeleton className='h-[260px] w-[260px] rounded-xl bg-slate-800' />
        ) : (
          <div className='p-3 bg-white rounded-2xl shadow-inner border border-slate-700 inline-block'>
            {qrCode ? (
              <img
                src={qrCode}
                alt='WireGuard QR Code'
                className='rounded-lg w-full max-h-[260px] object-contain'
              />
            ) : (
              <div className='h-[260px] w-[260px] flex items-center justify-center text-slate-400 text-sm'>
                بارکد موجود نیست
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}