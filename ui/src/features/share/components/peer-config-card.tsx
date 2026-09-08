'use client'

import { useEffect, useState } from 'react'
import { DownloadIcon, FileTextIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface ConfigCardProps {
  isLoading: boolean
  blob?: Blob
  peerName?: string
}

export default function PeerConfigCard({
  isLoading,
  blob,
  peerName,
}: ConfigCardProps) {
  const [configText, setConfigText] = useState<string>('')

  useEffect(() => {
    if (blob) {
      const reader = new FileReader()
      reader.onload = () => setConfigText(reader.result as string)
      reader.readAsText(blob)
    }
  }, [blob])

  const handleDownload = () => {
    if (!configText) return
    const file = new Blob([configText], { type: 'text/plain;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(file)
    link.download = `${peerName || 'wireguard'}.conf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className='border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-xl rounded-2xl p-2 flex flex-col justify-between h-full'>
      <CardHeader className='pb-2'>
        <CardTitle className='flex items-center gap-2 text-base font-semibold text-emerald-400'>
          <FileTextIcon className='h-5 w-5' />
          <span>فایل اتصال</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='py-4'>
        {isLoading ? (
          <Skeleton className='h-12 w-full rounded-xl bg-slate-800' />
        ) : (
          <p className='text-xs text-slate-400 text-center'>
            برای استفاده در اپلیکیشن‌های وایرگارد، فایل کانفیگ زیر را دانلود کنید.
          </p>
        )}
      </CardContent>
      {!isLoading && (
        <CardFooter className='pt-0'>
          <Button
            onClick={handleDownload}
            className='w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-900/20 transition-all duration-200 flex items-center justify-center gap-2 text-base'
          >
            <DownloadIcon className='h-5 w-5' />
            دانلود فایل کانفیگ (.conf)
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}