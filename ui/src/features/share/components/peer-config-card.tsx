'use client'

import { useEffect, useState } from 'react'
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
  const [copied, setCopied] = useState(false)

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
    setCopied(true)
    toast.success('Copied to clipboard.', { duration: 3000 })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!configText) return
    const file = new Blob([configText], { type: 'text/plain;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(file)
    link.download = `${peerName || 'config'}.conf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className='bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl p-2 rounded-2xl shadow-xl flex h-full flex-col justify-between text-slate-100'>
      <CardHeader className='w-full flex flex-row items-center justify-between border-b border-slate-800/60 pb-3 space-y-0'>
        <CardTitle className='text-xs font-semibold text-slate-300 tracking-wider'>CONFIGURATION</CardTitle>
        <span className='text-[10px] text-slate-400 font-mono'>.conf file</span>
      </CardHeader>

      <CardContent className='flex flex-1 flex-col py-4'>
        {isLoading ? (
          <div className='space-y-2'>
            <Skeleton className='h-4 w-full bg-slate-800' />
            <Skeleton className='h-4 w-5/6 bg-slate-800' />
            <Skeleton className='h-4 w-4/6 bg-slate-800' />
          </div>
        ) : (
          <textarea
            readOnly
            value={configText}
            onClick={handleCopy}
            placeholder='[Interface]...'
            className='w-full h-28 bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 text-[11px] font-mono text-slate-400 focus:outline-none resize-none cursor-pointer'
            title='برای کپی کلیک کنید'
          />
        )}
      </CardContent>

      {!isLoading && (
        <CardFooter className='flex flex-col gap-2 pt-0'>
          <button
            onClick={handleCopy}
            className='w-full py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 active:scale-95 transition-all rounded-xl border border-slate-700/50 shadow-md'
          >
            {copied ? 'کپی شد!' : 'کپی متن کانفیگ'}
          </button>
          <button
            onClick={handleDownload}
            className='w-full py-2.5 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:opacity-95 active:scale-95 transition-all rounded-xl shadow-lg shadow-indigo-600/20'
          >
            Download Configuration
          </button>
        </CardFooter>
      )}
    </Card>
  )
}