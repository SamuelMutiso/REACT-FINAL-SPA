import { useNavigate } from 'react-router-dom'
import useStoreInfo from '../hooks/useStoreInfo'

function HomePage() {
  const navigate = useNavigate()
  const { storeInfo, loadingStore } = useStoreInfo()

  return (
    <main className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neon-emerald/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl text-center relative z-10 flex flex-col items-center">
        <span className="font-mono text-xs tracking-[0.3em] text-neon-emerald uppercase mb-3 block animate-pulse">
          ▸ CORE PRODUCTION PORTAL
        </span>
        
        <h1 className="font-display text-6xl md:text-8xl tracking-wide text-white leading-none mb-6">
          {loadingStore ? 'SOUNDWAVE HUB' : storeInfo?.name.toUpperCase()}
        </h1>

        <p className="font-body text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-12">
          {loadingStore ? 'Loading network configuration...' : storeInfo?.description}
        </p>

        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => navigate('/shop')} 
            className="bg-neon-emerald text-studio-bg font-bold tracking-wider uppercase px-8 py-3.5 rounded-xl text-sm cursor-pointer shadow-lg shadow-neon-emerald/10 hover:scale-105 transition-transform duration-200"
          >
            Browse Inventory
          </button>
          <button 
            onClick={() => navigate('/admin')} 
            className="border border-studio-border text-gray-300 font-semibold tracking-wider uppercase px-8 py-3.5 rounded-xl text-sm cursor-pointer hover:border-neon-emerald hover:text-white transition-colors duration-200"
          >
            Admin Portal
          </button>
        </div>

        {storeInfo && (
          <div className="mt-16 bg-studio-panel border border-studio-border rounded-xl p-6 max-w-xs w-full text-center shadow-2xl">
            <span className="block font-mono text-[10px] text-neon-emerald tracking-widest uppercase mb-1">
              SUPPORT CONTEXT LINE
            </span>
            <p className="font-mono text-sm font-semibold text-gray-200">{storeInfo.phone_number}</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default HomePage