import { NavLink } from 'react-router-dom'

function Navbar() {
  const linkStyles = ({ isActive }) =>
    `px-4 py-2 text-sm font-medium uppercase tracking-wider rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-neon-emerald text-studio-bg font-semibold shadow-md shadow-neon-emerald/20' 
        : 'text-gray-400 hover:text-white hover:bg-studio-border/50'
    }`

  return (
    <nav className="bg-studio-panel/90 border-b border-studio-border sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 group">
          <span className="text-xl transition-transform duration-300 group-hover:rotate-12">🎙️</span>
          <span className="font-display text-2xl tracking-widest text-white transition-colors group-hover:text-neon-emerald">
            SOUNDWAVE GEAR
          </span>
        </NavLink>

        <div className="flex gap-2">
          <NavLink to="/" end className={linkStyles}>Home</NavLink>
          <NavLink to="/shop" className={linkStyles}>Shop Inventory</NavLink>
          <NavLink to="/admin" className={linkStyles}>Admin Portal</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar