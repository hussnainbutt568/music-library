import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DrawerAppBar from './navBar'
import About  from './About'
import Contact from './Contact'
import Details from './Details'
import OpenMediaPlayer from './OpenMediaPlayer'

export default function Routers() {
  return (
    <div>
        
<Router>
    <DrawerAppBar />
    <Routes>
    <Route path='/' element={<About />} />
    <Route path='/Contact' element={<Contact />} />
    <Route path='/OpenMedia' element={<OpenMediaPlayer />} />


    </Routes>
</Router>

    </div>
  )
}
