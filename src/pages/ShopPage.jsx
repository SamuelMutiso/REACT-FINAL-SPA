import { useState, useId } from 'react'
import useInstruments from '../hooks/useInstruments'
import SectionHeader from '../components/SectionHeader'
import FilterSidebar from '../components/FilterSidebar'
import ProductCard from '../components/ProductCard'

const CATEGORIES = ['All', 'Guitars', 'Drums', 'Keyboards', 'Microphones']

function ShopPage() {
  const { instruments, loading, error, updateInstrument, deleteInstrument } = useInstruments()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const searchInputId = useId()

  const handleFilteredMatrix = instruments.filter(item => {
    const matchedText = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.origin.toLowerCase().includes(searchQuery.toLowerCase())
    const matchedCategory = selectedCategory === 'All' || item.category === selectedCategory
    return matchedText && matchedCategory
  })

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <SectionHeader 
        title="PRODUCT CATALOG" 
        context="SYSTEM DISCOVERY LEDGER · LIVE UPDATE SYNCHRONIZATION" 
      />

      <hr className="border-studio-border mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <FilterSidebar 
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchId={searchInputId}
        />

        <section className="md:col-span-3">
          {loading && <p className="text-center font-mono text-gray-500 py-12 animate-pulse">Querying inventory dataset...</p>}
          {error && <p className="text-center font-mono text-neon-rose py-12">⚠ {error}</p>}

          {!loading && !error && (
            <>
              {handleFilteredMatrix.length === 0 ? (
                <div className="bg-studio-panel border border-studio-border rounded-xl p-12 text-center">
                  <p className="font-mono text-sm text-gray-500">No available records match search query parameters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {handleFilteredMatrix.map(item => (
                    <ProductCard 
                      key={item.id} 
                      instrument={item} 
                      onUpdate={updateInstrument} 
                      onDelete={deleteInstrument} 
                    />
                  ))}
                </div>
              )}

              <p className="font-mono text-[10px] text-gray-500 text-right mt-8 uppercase tracking-widest">
                Showing {handleFilteredMatrix.length} of {instruments.length} available nodes
              </p>
            </>
          )}
        </section>
      </div>
    </main>
  )
}

export default ShopPage