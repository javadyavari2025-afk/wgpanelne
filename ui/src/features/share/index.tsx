'use client'

export default function PeerSharePage({ data }: { data?: any }) {
  const p = data || {}
  const formatBytes = (bytes: number) => {
    if (!bytes || bytes === 0) return '0.00 GB'
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
  }

  const startURL = p.botStatus?.bot_url ? `${p.botStatus.bot_url}?start=${p.shareId}` : undefined
  const linked = Boolean(p.linkStatus?.linked)
  const botName = p.botStatus?.bot_username ? `@${p.botStatus.bot_username.replace(/^@/, '')}` : '—'
  const account = p.linkStatus?.username || (linked ? 'Chat linked' : '—')
  const alertsLabel = linked ? (p.linkStatus?.notify_enabled ? 'On' : 'Off') : '—'

  const downloadConfig = () => {
    if (!p.config) return
    const blob = new Blob([p.config], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'wg-peer.conf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <main className='min-h-screen bg-[#070913] relative overflow-x-hidden text-white flex items-center justify-center p-4 sm:p-6 lg:p-10'>
      <div className='absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-gradient-to-tr from-indigo-600/20 to-purple-600/10 rounded-full blur-[100px] pointer-events-none' />
      <div className='absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] bg-gradient-to-tr from-pink-600/15 to-blue-600/15 rounded-full blur-[120px] pointer-events-none' />

      <div className='max-w-[1300px] w-full mx-auto space-y-8 relative z-10'>
        <div className='text-center space-y-2'>
          <span className='text-[11px] uppercase tracking-widest text-indigo-400 font-bold'>Glassmorphism UI Presentation</span>
          <h1 className='text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent'>
            Welcome, Javad
          </h1>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch'>
          
          {/* 1. Statistics Card */}
          <div className='flex flex-col justify-between rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 sm:p-7 relative overflow-hidden'>
            <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent' />
            <div>
              <div className='flex items-center justify-between pb-4 border-b border-white/10 mb-5'>
                <span className='text-xs font-bold tracking-wider text-slate-300 uppercase'>Statistics</span>
                <span className='text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5'>
                  <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' /> Online
                </span>
              </div>
              <div className='space-y-4'>
                <div className='flex items-baseline justify-between'>
                  <span className='text-xs text-slate-400 font-medium'>Traffic Limit</span>
                  <span className='text-base font-bold text-slate-100'>{p.trafficLimitBytes ? formatBytes(p.trafficLimitBytes) : 'Unlimited'}</span>
                </div>
                <div className='flex items-baseline justify-between'>
                  <span className='text-xs text-slate-400 font-medium'>Expiration</span>
                  <span className='text-base font-bold text-slate-100'>Active</span>
                </div>
                <div className='grid grid-cols-2 gap-3 pt-2'>
                  <div className='p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1'>
                    <span className='text-[10px] font-bold tracking-wider text-emerald-400 uppercase block'>DOWNLOAD</span>
                    <span className='text-lg font-black text-white'>{formatBytes(p.downloadBytes)}</span>
                  </div>
                  <div className='p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1'>
                    <span className='text-[10px] font-bold tracking-wider text-sky-400 uppercase block'>UPLOAD</span>
                    <span className='text-lg font-black text-white'>{formatBytes(p.uploadBytes)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-medium'>
              <span>Total Usage</span>
              <span className='text-white font-bold'>{formatBytes(p.transferUsedBytes)}</span>
            </div>
          </div>

          {/* 2. QR Code Card */}
          <div className='flex flex-col justify-between rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 sm:p-7 relative overflow-hidden'>
            <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent' />
            <div>
              <div className='flex items-center justify-between pb-4 border-b border-white/10 mb-5'>
                <span className='text-xs font-bold tracking-wider text-slate-300 uppercase'>QR Code</span>
                <span className='text-xs text-indigo-400 font-medium'>WireGuard</span>
              </div>
              <div className='flex items-center justify-center py-4'>
                <div className='p-4 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-md shadow-inner flex items-center justify-center'>
                  <div className='w-40 h-40 bg-slate-900/90 rounded-xl flex flex-col items-center justify-center text-center p-4 border border-white/10'>
                    <span className='text-xs font-mono text-slate-300 tracking-wider'>QR CODE</span>
                    <span className='text-[10px] text-slate-500 mt-1'>WireGuard Config</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='pt-4 text-center'>
              <p className='text-xs text-slate-400'>Scan with your WireGuard app to connect instantly.</p>
            </div>
          </div>

          {/* 3. Configuration Card */}
          <div className='flex flex-col justify-between rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 sm:p-7 relative overflow-hidden md:col-span-2 lg:col-span-1'>
            <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent' />
            <div>
              <div className='flex items-center justify-between pb-4 border-b border-white/10 mb-5'>
                <span className='text-xs font-bold tracking-wider text-slate-300 uppercase'>Configuration</span>
                <span className='text-xs text-amber-400 font-medium'>.conf file</span>
              </div>
              <div className='relative rounded-2xl bg-black/50 border border-white/10 p-3.5 text-xs font-mono overflow-y-auto max-h-40 text-slate-300 shadow-inner'>
                <pre className='whitespace-pre-wrap'>{p.config || '[Interface]\nPrivateKey = ...\nAddress = ...'}</pre>
              </div>
            </div>
            <div className='pt-6 mt-6 border-t border-white/10'>
              <button
                onClick={downloadConfig}
                className='w-full h-12 font-bold text-sm rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 text-white shadow-[0_10px_25px_rgba(120,50,255,0.4)] transition-all border border-white/20 flex items-center justify-center gap-2'
              >
                Download Configuration
              </button>
            </div>
          </div>

          {/* 4. Telegram Card */}
          <div className='md:col-span-2 lg:col-span-3 flex flex-col justify-between rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 sm:p-7 relative overflow-hidden'>
            <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent' />
            <div className='flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-white/10 mb-5 gap-4'>
              <div className='flex items-center gap-3'>
                <div className='p-2.5 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20'>
                  <svg className='h-5 w-5 fill-current' viewBox='0 0 24 24'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.63 3.73-.53.36-1.01.54-1.44.53-.47-.02-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.25.38-.51 1.06-.78 4.16-1.81 6.94-3 8.38-3.57 3.99-1.62 4.82-1.9 5.36-1.91.12 0 .39.03.56.17.14.12.18.28.2.45-.02.07-.02.13-.04.2z'/></svg>
                </div>
                <span className='text-xs font-bold tracking-wider text-slate-300 uppercase'>Telegram Notification</span>
              </div>
              <div className='px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-center text-emerald-400'>
                {linked ? 'Linked' : 'Not Linked'}
              </div>
            </div>
            <div className='py-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-medium'>
              <div className='p-3.5 rounded-2xl bg-white/[0.04] border border-white/15 text-center shadow-inner'>
                <span className='block text-slate-400 text-[10px] font-bold uppercase mb-1'>Bot</span>
                <span className='font-black text-white truncate block'>{botName}</span>
              </div>
              <div className='p-3.5 rounded-2xl bg-white/[0.04] border border-white/15 text-center shadow-inner'>
                <span className='block text-slate-400 text-[10px] font-bold uppercase mb-1'>Account</span>
                <span className='font-black text-white truncate block'>{account}</span>
              </div>
              <div className='p-3.5 rounded-2xl bg-white/[0.04] border border-white/15 text-center shadow-inner'>
                <span className='block text-slate-400 text-[10px] font-bold uppercase mb-1'>Alerts</span>
                <span className='font-black text-white block'>{alertsLabel}</span>
              </div>
            </div>
            {startURL && (
              <div className='pt-6 mt-6 border-t border-white/10'>
                <a
                  href={startURL}
                  target='_blank'
                  rel='noreferrer'
                  className='bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:opacity-90 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-600/30 border border-white/25 transition-all'
                >
                  {linked ? 'Open Telegram Bot' : 'Connect Telegram Bot'}
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  )
}