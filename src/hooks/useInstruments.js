import { useState, useEffect, useCallback } from 'react'

const BASE_URL = 'http://localhost:3001/instruments'

function useInstruments() {
  const [instruments, setInstruments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchInstruments = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(BASE_URL)
      if (!res.ok) throw new Error('Could not parse instrument inventory ledger data.')
      const data = await res.json()
      setInstruments(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchInstruments()
  }, [fetchInstruments])

  const addInstrument = useCallback(async (newInstrument) => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInstrument),
    })
    if (!res.ok) throw new Error('Server rejected creation parameters.')
    const saved = await res.json()
    setInstruments(prev => [...prev, saved])
    return saved
  }, [])

  const updateInstrument = useCallback(async (id, localizedChanges) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(localizedChanges),
    })
    if (!res.ok) throw new Error('Server rejected structural patch updates.')
    const updated = await res.json()
    setInstruments(prev => prev.map(item => (item.id == id ? updated : item)))
    return updated
  }, [])

  const deleteInstrument = useCallback(async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to remove specified node file.')
    setInstruments(prev => prev.filter(item => item.id != id))
  }, [])

  return { instruments, loading, error, addInstrument, updateInstrument, deleteInstrument }
}

export default useInstruments