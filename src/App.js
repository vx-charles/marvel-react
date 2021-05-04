import { Header } from './components/Header'
import Heroes from './components/Heroes'
import DetailHero from './components/DetailHero'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './css/global.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Heroes />
        <DetailHero />
      </main>
    </>
  )
}

export default App
