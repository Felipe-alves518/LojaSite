import { Routes, Route } from 'react-router'
import './App.css'
import HomePage from './pages/Homepage'
import Login from './pages/login'
import Cart from "./pages/cart"
import { useState } from 'react'


function App() {
  const [buttonDelete,Setdelete] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/cart' element={<Cart buttonDelete={buttonDelete} Setdelete={Setdelete}/>}/>

      </Routes>
      
    </>
  )
}

export default App
