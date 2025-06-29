
import './App.css'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import ProducDetilsPage from './pages/ProducDetilsPage'
import Header from './Components/Header'
import CartPage from './pages/CartPage'

function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/products/:id' element={<ProducDetilsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  )
}

export default App
