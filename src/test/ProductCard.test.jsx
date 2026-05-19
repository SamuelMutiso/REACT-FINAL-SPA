import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ProductCard from '../components/ProductCard'

const mockItem = { 
  id: 1, 
  name: 'Studio Monitor', 
  origin: 'Germany', 
  price: 299.99, 
  description: 'Pro reference audio speakers.', 
  category: 'Microphones' 
}

describe('ProductCard Local Rendering Processes', () => {
  it('displays accurate object parameters correctly inside nodes', () => {
    render(<ProductCard instrument={mockItem} onDelete={vi.fn()} onUpdate={vi.fn()} />)
    expect(screen.getByText('Studio Monitor')).toBeInTheDocument() // Mixed Case lookup
    expect(screen.getByText('$299.99')).toBeInTheDocument()
  })

  it('unlocks price transformation inputs upon user edit clicks', () => {
    render(<ProductCard instrument={mockItem} onDelete={vi.fn()} onUpdate={vi.fn()} />)
    fireEvent.click(screen.getByTestId('edit-btn'))
    expect(screen.getByTestId('price-input')).toBeInTheDocument()
  })

  it('calls onUpdate callback when saving a new price configuration', () => {
    const mockUpdate = vi.fn()
    render(<ProductCard instrument={mockItem} onDelete={vi.fn()} onUpdate={mockUpdate} />)
    
    fireEvent.click(screen.getByTestId('edit-btn'))
    const input = screen.getByTestId('price-input')
    fireEvent.change(input, { target: { value: '350.00' } })
    fireEvent.click(screen.getByText('SAVE'))
    
    expect(mockUpdate).toHaveBeenCalledWith(1, { price: 350 })
  })
})