import React from 'react'
import Header from '../components/header'
import HeroSection from '../components/Herosection'
import Sectors from '../components/Sector'
import Footer from '../components/footer'

const Home = () => {
  return (
    <div>
      <Header />    
      <HeroSection />
      <Sectors />
      <Footer />
    </div>
  )
}

export default Home
