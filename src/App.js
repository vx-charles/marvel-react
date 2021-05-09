import Header from './components/Header'
import Heroes from './components/Heroes'
import DetailHero from './components/DetailHero'
import ContextHero from './context/contextHero'

import './css/global.css'
import { useState } from 'react'

function App() {

  const [closeDrawer, setCloseDrawer] = useState(false)
  const objActiveDrawer = { closeDrawer, setCloseDrawer }

  return (
    <>
      <ContextHero.Provider value={objActiveDrawer}>
        <Header />
        <main>
          <Heroes />
          <DetailHero />
        </main>
      </ContextHero.Provider>
    </>
  )
}

export default App
