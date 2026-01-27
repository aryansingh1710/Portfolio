import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Project from './pages/Project'
import Contact from './sections/Contact'

import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
  <>
    {/* Add this line! */}
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/projects' element={<Project />} />
      <Route path='/contact' element={<Contact />} />
    </Routes>
  </>
  )
}

export default App