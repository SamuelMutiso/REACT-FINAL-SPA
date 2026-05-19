import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import AdminPage from '../pages/AdminPage'

vi.mock('../hooks/useInstruments', () => ({
  default: () => ({ addInstrument: vi.fn().mockResolvedValue({}) })
}))

describe('AdminPage Verification Layers', () => {
  it('triggers an error alert when the submit button is clicked on empty fields', async () => {
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: /Submit Record Entries/i }))
    await waitFor(() => {
      expect(screen.getByTestId('error-msg')).toBeInTheDocument()
    })
  })

  it('renders all structural form inputs with accessible labels', () => {
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    )
    expect(screen.getByTestId('input-name')).toBeInTheDocument()
    expect(screen.getByTestId('input-category')).toBeInTheDocument()
    expect(screen.getByTestId('input-origin')).toBeInTheDocument()
    expect(screen.getByTestId('input-price')).toBeInTheDocument()
    expect(screen.getByTestId('input-description')).toBeInTheDocument()
  })
})