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
    <Card className='flex h-full flex-col justify-between border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-950/20 to-orange-950/10 backdrop-blur-xl shadow-xl shadow-amber-500/5 hover:border-amber-500/50 transition-all duration-300 rounded-2xl overflow-hidden'>
      <CardHeader className='flex flex-row items-center justify-between pb-2 border-b border-amber-500/20 bg-amber-500/5'>
        <div className='flex items-center gap-2.5'>
          <div className='p-2 rounded-xl bg-amber-500/20 text-amber-400 shadow-inner'>
            <FileText className='h-4 w-4' />
          </div>
          <CardTitle className='text-base font-bold text-amber-100'>Configuration</CardTitle>
        </div>
        {!isLoading && configText && (
          <Button
            variant='ghost'
            size='sm'
            onClick={toggleBlur}
            className='h-7 px-2 text-xs text-amber-300 hover:text-white hover:bg-amber-500/20 gap-1'
          >
            {isBlurred ? <Eye className='h-3.5 w-3.5' /> : <EyeOff className='h-3.5 w-3.5' />}
            {isBlurred ? 'Reveal' : 'Hide'}
          </Button>
        )}
      </CardHeader>
      
      <CardContent className='flex flex-1 flex-col p-4 sm:p-5'>
        {isLoading ? (
          <div className='flex flex-1 flex-col justify-center space-y-2 py-2'>
            <Skeleton className='h-3.5 w-full bg-amber-500/10' />
            <Skeleton className='h-3.5 w-5/6 bg-amber-500/10' />
            <Skeleton className='h-3.5 w-4/6 bg-amber-500/10' />
            <Skeleton className='h-3.5 w-3/6 bg-amber-500/10' />
          </div>
        ) : (
          <div
            className='relative min-h-[11rem] flex-1 cursor-pointer overflow-auto rounded-xl bg-black/40 border border-amber-500/20 p-3 text-xs transition-colors hover:border-amber-400/40'
            onClick={toggleBlur}
            title={isBlurred ? 'Click to reveal' : 'Click to hide'}
          >
            <pre
              className={`font-mono break-words whitespace-pre-wrap transition-all duration-300 ${
                isBlurred ? 'blur-md select-none opacity-30' : 'blur-0 opacity-100 text-amber-100'
              }`}
            >
              <code>{configText}</code>
            </pre>

            {isBlurred && (
              <div className='absolute inset-0 flex items-center justify-center rounded-xl bg-amber-950/40 backdrop-blur-[2px] text-xs font-medium'>
                <span className='px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5 shadow-lg'>
                  <Eye className='h-3.5 w-3.5' /> Reveal Config
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
                className='absolute top-2 right-2 h-7 px-2 text-xs bg-amber-500/20 text-amber-200 hover:bg-amber-500/30 border border-amber-500/30 gap-1'
              >
                <CopyIcon className='h-3 w-3 text-amber-400' />
                Copy
              </Button>
            )}
          </div>
        )}
      </CardContent>

      {!isLoading && (
        <CardFooter className='pt-0 pb-4 px-4 sm:px-5'>
          <Button 
            className='w-full h-9 gap-2 text-xs font-bold shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 rounded-xl' 
            onClick={handleDownload}
          >
            <Download className='h-3.5 w-3.5' />
            Download Config
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}