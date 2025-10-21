import React from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

const App = () => {
  return (
    <>

      <Navbar />
      <div className=' bg-white bg-[radial-gradient(60%_120%_at_50%_50%,transparent_0,rgba(150,255,220,0.5)_100%)]'><Manager/></div>
    
      <Footer />
    </>
  )
}

export default App

