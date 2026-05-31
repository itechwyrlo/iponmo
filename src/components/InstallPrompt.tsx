import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPrompt() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setInstallEvent(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if (!installEvent) return null

  const handleInstall = async () => {
    await installEvent.prompt()
    const { outcome } = await installEvent.userChoice
    if (outcome === 'accepted') setInstallEvent(null)
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 80,
      left: 16,
      right: 16,
      background: '#1e1c2e',
      border: '1px solid #2e2b45',
      borderRadius: 16,
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 1000,
      boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
    }}>
      <div>
        <p style={{ margin: 0, fontWeight: 700, color: '#f0eeff' }}>Install IponMo</p>
        <p style={{ margin: 0, fontSize: 13, color: '#a5a2d9' }}>Add to your home screen</p>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => setInstallEvent(null)}
          style={{ background: 'transparent', border: '1px solid #2e2b45', borderRadius: 8, padding: '8px 12px', color: '#a5a2d9', cursor: 'pointer' }}
        >
          Later
        </button>
        <button
          onClick={handleInstall}
          style={{ background: '#f4a535', border: 'none', borderRadius: 8, padding: '8px 16px', color: '#0f0e17', fontWeight: 700, cursor: 'pointer' }}
        >
          Install
        </button>
      </div>
    </div>
  )
}
