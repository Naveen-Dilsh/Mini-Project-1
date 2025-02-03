import React from 'react'
import HeroSection from '../components/HeroSection'
import Guarantee from '../components/Gurantee'
import Steps from '../components/Steps'
import Testimonial from '../components/Testimonial'
import BestOutfits from '../components/BestOutfits'
import WeddingShowcase from '../components/WeddingShowcase'



const Homepage = () => {
  return (
    <>
        <HeroSection/>
        <WeddingShowcase/>
        <Guarantee/>
        <Steps/>
        <Testimonial/>
    </>
  )
}

export default Homepage