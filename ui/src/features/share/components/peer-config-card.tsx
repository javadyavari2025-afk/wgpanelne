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
    toast.success('Configuration copied to clipboard successfully.', { duration: 4000 })
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
    <Card className='flex h-full flex-col justify-between border-border/60 bg-gradient-to-b from-card/80 to-card shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden'>
      <CardHeader className='flex flex-row items-center justify-between pb-3 border-b border-border/40'>
        <div className='flex items-center gap-2.5'>
          <div className='p-2 rounded-xl bg-indigo-500/10 text-indigo-500 shadow-inner'>
            <FileText className='h-5 w-5' />
          </div>
          <CardTitle className='text-lg font-bold'>Configuration</CardTitle>
        </div>
        {!isLoading && configText && (
          <Button
            variant='ghost'
            size='sm'
            onClick={toggleBlur}
            className='h-8 px-2 text-xs text-muted-foreground hover:text-foreground gap-1.5'
          >
            {isBlurred ? <Eye className='h-4 w-4' /> : <EyeOff className='h-4 w-4' />}
            {isBlurred ? 'Reveal' : 'Hide'}
          </Button>
        )}
      </CardHeader>
      
      <CardContent className='flex flex-1 flex-col pt-4'>
        {isLoading ? (
          <div className='flex flex-1 flex-col justify-center space-y-3 py-4'>
            <Skeleton className='h-4 w-full rounded-md' />
            <Skeleton className='h-4 w-5/6 rounded-md' />
            <Skeleton className='h-4 w-4/6 rounded-md' />
            <Skeleton className='h-4 w-3/6 rounded-md' />
          </div>
        ) : (
          <div
            className='relative min-h-[13rem] flex-1 cursor-pointer overflow-auto rounded-xl bg-zinc-950/5 dark:bg-zinc-900/50 border border-border/50 p-4 transition-colors hover:border-primary/40 group'
            onClick={toggleBlur}
            title={isBlurred ? 'Click to reveal' : 'Click to hide'}
          >
            <pre
              className={`text-xs sm:text-sm font-mono break-words whitespace-pre-wrap transition-all duration-300 ${
                isBlurred ? 'blur-md select-none opacity-40' : 'blur-0 opacity-100 text-foreground'
              }`}
            >
              <code>{configText}</code>
            </pre>

            {isBlurred && (
              <div className='absolute inset-0 flex items-center justify-center rounded-xl bg-background/60 backdrop-blur-[2px] font-medium text-foreground transition-all'>
                <span className='px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm text-xs flex items-center gap-2'>
                  <Eye className='h-3.5 w-3.5' /> Click to reveal configuration
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
                className='absolute top-3 right-3 h-8 shadow-md gap-1.5 bg-background/80 backdrop-blur-md hover:bg-background'
              >
                <CopyIcon className='h-3.5 w-3.5 text-primary' />
                Copy
              </Button>
            )}
          </div>
        )}
      </CardContent>

      {!isLoading && (
        <CardFooter className='pt-0 pb-5 px-6'>
          <Button 
            className='w-full gap-2 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0' 
            onClick={handleDownload}
          >
            <Download className='h-4 w-4' />
            Download Config File
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}