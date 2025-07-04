import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import About from '../../components/About/About'
import Features from '../../components/Features/Features'
import Footer from '../../components/Footer/Footer'
import Banner from '../../components/Banner/Banner'

export default function Home() {
  return (
    <div className='font-manrope'>
      <Navbar />
      <Banner />
      <About />
      <Features />
      <Footer />
    </div>
  )
}
