'use client'

import { useEffect, useState } from 'react'
import { CopyIcon, Download, FileText, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
  const [isBlurred, setIsBlurred] = useState(true)

  useEffect(() => {
    if (blob) {
      const reader = new FileReader()
      reader.onload = () => setConfigText(reader.result as string)
      reader.readAsText(blob)
    }
  }, [blob])

  const handleCopy = async () => {
    if (!configText) return
    await navigator.clipboard.writeText(configText)
    toast.success('Configuration copied to clipboard.', { duration: 4000 })
  }

  const handleDownload = () => {
    if (!configText) return
    const file = new Blob([configText], { type: 'text/plain;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(file)
    link.download = `${peerName || 'peer'}.conf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Configuration downloaded.', { duration: 3000 })
  }

  const toggleBlur = () => {
    setIsBlurred((prev) => !prev)
  }

  return (
    <Card className='flex h-full flex-col justify-between border-2 border-amber-400/50 bg-gradient-to-br from-amber-500/30 via-orange-600/30 to-rose-700/30 backdrop-blur-2xl shadow-2xl shadow-amber-900/30 rounded-3xl overflow-hidden text-white'>
      <CardHeader className='flex flex-row items-center justify-between pb-3 border-b border-white/20 bg-amber-600/20'>
        <div className='flex items-center gap-3'>
          <div className='p-2.5 rounded-2xl bg-amber-400/30 text-amber-200 shadow-inner'>
            <FileText className='h-5 w-5' />
          </div>
          <CardTitle className='text-lg font-black tracking-wide text-white'>Configuration</CardTitle>
        </div>
        {!isLoading && configText && (
          <Button
            variant='ghost'
            size='sm'
            onClick={toggleBlur}
            className='h-8 px-3 text-xs font-bold text-amber-100 hover:text-white hover:bg-white/20 gap-1.5 rounded-xl border border-white/20'
          >
            {isBlurred ? <Eye className='h-4 w-4' /> : <EyeOff className='h-4 w-4' />}
            {isBlurred ? 'Reveal' : 'Hide'}
          </Button>
        )}
      </CardHeader>
      
      <CardContent className='flex flex-1 flex-col p-5 sm:p-6'>
        {isLoading ? (
          <div className='flex flex-1 flex-col justify-center space-y-3 py-2'>
            <Skeleton className='h-4 w-full bg-white/20' />
            <Skeleton className='h-4 w-5/6 bg-white/20' />
            <Skeleton className='h-4 w-4/6 bg-white/20' />
            <Skeleton className='h-4 w-3/6 bg-white/20' />
          </div>
        ) : (
          <div
            className='relative min-h-[12rem] flex-1 cursor-pointer overflow-auto rounded-2xl bg-black/40 border border-white/20 p-4 text-xs transition-colors shadow-inner'
            onClick={toggleBlur}
            title={isBlurred ? 'Click to reveal' : 'Click to hide'}
          >
            <pre
              className={`font-mono break-words whitespace-pre-wrap transition-all duration-300 ${
                isBlurred ? 'blur-md select-none opacity-20' : 'blur-0 opacity-100 text-amber-100'
              }`}
            >
              <code>{configText}</code>
            </pre>

            {isBlurred && (
              <div className='absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50 backdrop-blur-[3px] text-xs font-medium'>
                <span className='px-4 py-2 rounded-full bg-white/20 text-white border border-white/30 text-xs font-bold flex items-center gap-2 shadow-xl'>
                  <Eye className='h-4 w-4' /> Reveal Config
                </span>
              </div>
            )}

            {!isBlurred && (
              <Button
                variant='secondary'
                size='sm'
                onClick={(e) => {
                  e.stopPropagation()
                  handleCopy()
                }}
                className='absolute top-3 right-3 h-8 px-3 text-xs font-bold bg-white/20 text-white hover:bg-white/30 border border-white/30 gap-1.5 shadow-lg'
              >
                <CopyIcon className='h-3.5 w-3.5 text-amber-200' />
                Copy
              </Button>
            )}
          </div>
        )}
      </CardContent>

      {!isLoading && (
        <CardFooter className='pt-0 pb-5 px-5 sm:px-6'>
          <Button 
            className='w-full h-11 gap-2 text-sm font-black shadow-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border border-white/30 rounded-2xl' 
            onClick={handleDownload}
          >
            <Download className='h-4 w-4' />
            Download Config
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}