import { useState } from 'react'
import Login from './components/Login'
import Profile from './components/Profile'
import Register from './components/Register'
import ErrorPage from './components/error-page';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importar BrowserRouter, Routes y Route desde react-router-dom
import RubikCube from './components/RubikCube';
import PlayGround from './components/PlayGround';
import PassRecover from './components/PassRecover';
import Code from './components/Code';
import Index from './components/Index';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/playground" element={<PlayGround />} />
        <Route path="/passrecover" element={<PassRecover />} />
        <Route path="/code" element={<Code />} />
        <Route path="/" element={<Index />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
