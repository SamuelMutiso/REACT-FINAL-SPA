import { useState, useRef, useId } from 'react'
import useInstruments from '../hooks/useInstruments'
import SectionHeader from '../components/SectionHeader'
import StatusBanner from '../components/StatusBanner'

function AdminPage() {
  const { addInstrument } = useInstruments()
  
  const nameId = useId()
  const catId = useId()
  const originId = useId()
  const priceId = useId()
  const descId = useId()

  const [formData, setFormData] = useState({ name: '', origin: '', price: '', description: '', category: '' })
  const [banner, setBanner] = useState({ type: '', message: '' })
  const autoFocusFieldRef = useRef(null)

  const handleFormSubmission = async (e) => {
    e.preventDefault()
    setBanner({ type: '', message: '' })

    if (!formData.name.trim() || !formData.origin.trim() || !formData.category || !formData.description.trim()) {
      setBanner({ type: 'error', message: 'Validation Failure: All fields must be filled out completely.' })
      return
    }

    const numericalPrice = parseFloat(formData.price)
    if (isNaN(numericalPrice) || numericalPrice <= 0) {
      setBanner({ type: 'error', message: 'Validation Failure: Price must be greater than zero.' })
      return
    }

    try {
      await addInstrument({ ...formData, price: numericalPrice })
      setFormData({ name: '', origin: '', price: '', description: '', category: '' })
      setBanner({ type: 'success', message: 'Instrument data record securely appended to persistent repository.' })
      autoFocusFieldRef.current?.focus()
    } catch {
      setBanner({ type: 'error', message: 'Network Mutation Error: Server rejected creation packet entries.' })
    }
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <SectionHeader 
          title="ADD NEW PRODUCT" 
          context="Ingest fresh product data nodes directly into the mock backend storage engine" 
        />
      </div>

      <StatusBanner type={banner.type} message={banner.message} />

      <form onSubmit={handleFormSubmission} className="bg-studio-panel border border-studio-border rounded-xl p-6 flex flex-col gap-5 shadow-2xl" noValidate>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={nameId} className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Instrument Name</label>
          <input 
            ref={autoFocusFieldRef} 
            id={nameId} 
            type="text" 
            value={formData.name} 
            onChange={e => setFormData({ ...formData, name: e.target.value })} 
            className="bg-studio-bg border border-studio-border rounded-lg p-3 text-sm text-white outline-none focus:border-neon-emerald transition-colors" 
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={catId} className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">System Category Mapping</label>
          <select 
            id={catId} 
            value={formData.category} 
            onChange={e => setFormData({ ...formData, category: e.target.value })} 
            className="bg-studio-bg border border-studio-border rounded-lg p-3 text-sm outline-none focus:border-neon-emerald text-gray-200 cursor-pointer"
          >
            <option value="">Choose category block...</option>
            {['Guitars', 'Drums', 'Keyboards', 'Microphones'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={originId} className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Country of Origin</label>
            <input 
              id={originId} 
              type="text" 
              value={formData.origin} 
              onChange={e => setFormData({ ...formData, origin: e.target.value })} 
              className="bg-studio-bg border border-studio-border rounded-lg p-3 text-sm text-white outline-none focus:border-neon-emerald transition-colors" 
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={priceId} className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Base Valuation (USD)</label>
            <input 
              id={priceId} 
              type="number" 
              step="0.01" 
              value={formData.price} 
              onChange={e => setFormData({ ...formData, price: e.target.value })} 
              className="bg-studio-bg border border-studio-border rounded-lg p-3 text-sm text-white outline-none focus:border-neon-emerald transition-colors font-mono" 
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={descId} className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Specification Meta Description</label>
          <textarea 
            id={descId} 
            value={formData.description} 
            onChange={e => setFormData({ ...formData, description: e.target.value })} 
            rows={3} 
            className="bg-studio-bg border border-studio-border rounded-lg p-3 text-sm text-white outline-none focus:border-neon-emerald transition-colors resize-none leading-relaxed" 
          />
        </div>

        <button type="submit" className="bg-neon-emerald text-studio-bg font-bold tracking-wider uppercase py-3.5 rounded-xl text-sm mt-2 cursor-pointer shadow-md hover:opacity-90 transition-opacity">
          Submit Record Entries
        </button>
      </form>
    </main>
  )
}

export default AdminPage