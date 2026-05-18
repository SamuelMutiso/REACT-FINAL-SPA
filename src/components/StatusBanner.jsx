function StatusBanner({ type, message }) {
  if (!message) return null

  const isSuccess = type === 'success'
  
  return (
    <div 
      role="alert"
      className={`p-4 rounded-xl text-xs font-mono mb-6 border transition-all duration-300 ${
        isSuccess 
          ? 'bg-neon-emerald/10 border-neon-emerald/30 text-neon-emerald' 
          : 'bg-neon-rose/10 border-neon-rose/30 text-neon-rose'
      }`}
    >
      <span>{isSuccess ? '✓ SUCCESS: ' : '✕ ERROR: '}</span>
      {message}
    </div>
  )
}

export default StatusBanner