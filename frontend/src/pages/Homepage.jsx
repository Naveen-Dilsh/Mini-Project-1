import React from 'react'
import HeroSection from '../components/HeroSection'
import Guarantee from '../components/Gurantee'
import Steps from '../components/Steps'
import Testimonial from '../components/Testimonial'
import BestOutfits from '../components/BestOutfits'



const Homepage = () => {
  return (
    <>
        <HeroSection/>
        <BestOutfits/>
        <Guarantee/>
        <Steps/>
        <Testimonial/>
    </>
  )
}

export default Homepage