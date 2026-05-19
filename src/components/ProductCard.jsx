import { useState, useRef } from 'react'
// imma add some emojis to symbolize the intsruments category
const ICON_MAP = {
  Guitars: '🎸',
  Drums: '🥁',
  Keyboards: '🎹',
  Microphones: '🎙️',
  default: '🎛️'
}

function ProductCard({ instrument, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef(null)

  const handlePriceUpdate = async () => {
    const rawVal = inputRef.current?.value
    const structuredFloat = parseFloat(rawVal)
    if (isNaN(structuredFloat) || structuredFloat <= 0) return
    
    await onUpdate(instrument.id, { price: structuredFloat })
    setIsEditing(false)
  }

  return (
    <article className="bg-studio-card border border-studio-border rounded-xl p-6 flex flex-col gap-4 transition-all duration-300 hover:border-neon-emerald hover:-translate-y-1 shadow-lg">
      <div className="flex justify-between items-center">
        <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
          {instrument.category} · {instrument.origin}
        </span>
        <span className="text-xl">{ICON_MAP[instrument.category] || ICON_MAP.default}</span>
      </div>

      <h3 className="font-display text-2xl tracking-wide text-gray-100 uppercase">{instrument.name}</h3>
      <p className="text-sm text-gray-400 leading-relaxed min-h-[48px]">{instrument.description}</p>
      
      <hr className="border-studio-border" />

      <div>
        <span className="block font-mono text-[10px] text-gray-500 tracking-widest uppercase mb-1">VALUATION MATRIX</span>
        {isEditing ? (
          <div className="flex items-center gap-2 mt-2">
            <span className="font-mono text-neon-emerald text-sm">$</span>
            <input 
              ref={inputRef} 
              type="number" 
              step="0.01" 
              defaultValue={instrument.price} 
              data-testid="price-input"
              className="bg-studio-bg border border-neon-emerald rounded-lg px-3 py-1.5 text-sm font-mono text-white w-24 outline-none focus:ring-1 focus:ring-neon-emerald" 
            />
            <button onClick={handlePriceUpdate} className="bg-neon-emerald text-studio-bg font-bold text-xs px-3 py-2 rounded-md cursor-pointer hover:opacity-90 transition-opacity">
              SAVE
            </button>
            <button onClick={() => setIsEditing(false)} className="border border-studio-border text-gray-400 text-xs px-3 py-2 rounded-md cursor-pointer hover:text-white hover:bg-studio-border transition-colors">
              ✕
            </button>
          </div>
        ) : (
          <p className="font-display text-3xl text-neon-emerald tracking-wider">${instrument.price.toFixed(2)}</p>
        )}
      </div>

      {!isEditing && (
        <div className="flex gap-2 mt-2">
          <button 
            onClick={() => setIsEditing(true)} 
            data-testid="edit-btn"
            className="flex-1 py-2 text-xs font-semibold tracking-wider uppercase border border-neon-emerald/30 text-neon-emerald rounded-lg cursor-pointer hover:bg-neon-emerald hover:text-studio-bg transition-all duration-200"
          >
            Edit Price
          </button>
          <button 
            onClick={() => onDelete(instrument.id)} 
            data-testid="delete-btn"
            className="flex-1 py-2 text-xs font-semibold tracking-wider uppercase border border-neon-rose/30 text-neon-rose rounded-lg cursor-pointer hover:bg-neon-rose hover:text-white transition-all duration-200"
          >
            Delete
          </button>
        </div>
      )}
    </article>
  )
}

export default ProductCard