import { Route, Routes } from 'react-router-dom'
import PosPage from './pages/Pos/PosPage'

function App() {

  return (
    <>
      <Routes>
            <Route path='/' element={<PosPage />} />
      </Routes> 
    </>
  )
}

export default App
