import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import ShopPage from '../pages/ShopPage'

vi.mock('../hooks/useInstruments', () => ({
  default: () => ({
    instruments: [
      { id: 1, name: 'Stratocaster', origin: 'USA', price: 899, category: 'Guitars' },
      { id: 2, name: 'TD-17 Drums', origin: 'Japan', price: 1400, category: 'Drums' }
    ],
    loading: false,
    error: null,
    updateInstrument: vi.fn(),
    deleteInstrument: vi.fn()
  })
}))

describe('ShopPage Query Filter Interface', () => {
  it('maps complete structural elements onto active layout arrays', () => {
    render(
      <MemoryRouter>
        <ShopPage />
      </MemoryRouter>
    )
    expect(screen.getByText('PRODUCT CATALOG')).toBeInTheDocument()
    expect(screen.getByText('Stratocaster')).toBeInTheDocument() // Mixed Case lookup
    expect(screen.getByText('TD-17 Drums')).toBeInTheDocument() // Mixed Case lookup
  })

  it('filters out non-matching products based on user keyword queries', () => {
    render(
      <MemoryRouter>
        <ShopPage />
      </MemoryRouter>
    )
    const searchInput = screen.getByTestId('search-input')
    fireEvent.change(searchInput, { target: { value: 'Japan' } })
    
    expect(screen.getByText('TD-17 Drums')).toBeInTheDocument()
    expect(screen.queryByText('Stratocaster')).not.toBeInTheDocument()
  })
})