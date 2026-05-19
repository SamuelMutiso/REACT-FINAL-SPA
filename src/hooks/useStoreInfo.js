import { useState, useEffect } from 'react'

const BASE_URL = 'http://localhost:3001/store_info'

function useStoreInfo() {
  const [storeInfo, setStoreInfo] = useState(null)
  const [loadingStore, setLoadingStore] = useState(true)

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then(data => setStoreInfo(data[0]))
      .catch(() => setStoreInfo(null))
      .finally(() => setLoadingStore(false))
  }, [])

  return { storeInfo, loadingStore }
}

export default useStoreInfo