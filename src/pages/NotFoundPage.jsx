import { useNavigate } from 'react-router-dom'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <main className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="font-display text-9xl text-studio-border leading-none">404</h1>
      <h2 className="font-display text-2xl text-gray-300 mt-2 tracking-wide uppercase">Route Target Misaligned</h2>
      <button 
        onClick={() => navigate('/')} 
        className="mt-6 bg-neon-emerald text-studio-bg font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-lg cursor-pointer hover:scale-105 transition-transform"
      >
        Return to Home Node
      </button>
    </main>
  )
}

export default NotFoundPage