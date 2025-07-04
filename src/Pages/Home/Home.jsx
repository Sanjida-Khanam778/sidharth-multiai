import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import About from '../../components/About/About'
import Features from '../../components/Features/Features'
import Footer from '../../components/Footer/Footer'

export default function Home() {
  return (
    <div className='font-manrope'>
      <Navbar />
      <About />
      <Features />
      <Footer />
    </div>
  )
}
