import { useState } from 'react'
import Login from './components/Login'
import ErrorPage from './components/error-page';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importar BrowserRouter, Routes y Route desde react-router-dom

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
