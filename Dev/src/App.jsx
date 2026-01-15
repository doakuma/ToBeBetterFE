import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DocPage from './pages/DocPage'
import PracticePage from './pages/PracticePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/docs/:docId" element={<DocPage />} />
      <Route path="/docs/:docId/practices/:practiceId" element={<PracticePage />} />
    </Routes>
  )
}

export default App
