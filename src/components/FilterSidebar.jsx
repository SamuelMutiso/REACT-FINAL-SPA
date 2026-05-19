function FilterSidebar({ categories, selectedCategory, onSelectCategory, searchQuery, onSearchChange, searchId }) {
  return (
    <aside className="bg-studio-panel border border-studio-border rounded-xl p-6 h-fit flex flex-col gap-6 shadow-xl">
      <div className="flex flex-col gap-2">
        <label htmlFor={searchId} className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">
          Keyword Filter
        </label>
        <input 
          id={searchId} 
          type="text" 
          placeholder="Search by name, origin..." 
          value={searchQuery} 
          data-testid="search-input"
          onChange={(e) => onSearchChange(e.target.value)} 
          className="bg-studio-bg border border-studio-border rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-neon-emerald transition-colors w-full font-body" 
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Category Scope</span>
        <div className="flex flex-col gap-1.5">
          {categories.map(category => (
            <button 
              key={category} 
              onClick={() => onSelectCategory(category)} 
              className={`text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
                selectedCategory === category 
                  ? 'bg-neon-emerald/10 text-neon-emerald border border-neon-emerald/20 font-medium' 
                  : 'text-gray-400 hover:text-white hover:bg-studio-border/40 border border-transparent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default FilterSidebar