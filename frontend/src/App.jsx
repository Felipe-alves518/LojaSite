import { Routes, Route } from 'react-router'
import './App.css'
import HomePage from './pages/Homepage'
import Login from './pages/login'
import Cart from "./pages/cart"
import { useState } from 'react'


function App() {
  const [buttonDelete,Setdelete] = useState(0);
  const [loading,SetLoading] = useState(false)

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage loading={loading} SetLoading={SetLoading}/>}/>
        <Route path="/login" element={<Login loading={loading} SetLoading={SetLoading} />}/>
        <Route path='/cart' element={<Cart buttonDelete={buttonDelete} Setdelete={Setdelete} loading={loading} SetLoading={SetLoading}/>}/>

      </Routes>
      
    </>
  )
}

export default App
