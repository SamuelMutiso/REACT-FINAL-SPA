import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage'

vi.mock('../hooks/useStoreInfo', () => ({ default: () => ({ storeInfo: null, loadingStore: false }) }))

describe('Decoupled Path Routing Checks', () => {
  it('loads the correct tracking parameters on base branches', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByRole('button', { name: /Browse Inventory/i })).toBeInTheDocument()
  })

  it('renders the custom wildcard fallback 404 block for missing pointers', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText('Route Target Misaligned')).toBeInTheDocument() // Matches exactly
  })
})