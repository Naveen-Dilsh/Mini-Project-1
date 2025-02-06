import React from 'react'
import HeroSection from '../components/HeroSection'
import Guarantee from '../components/Gurantee'
import Steps from '../components/Steps'
import Testimonial from '../components/Testimonial'
import BestOutfits from '../components/BestOutfits'
import WeddingShowcase from '../components/WeddingShowcase'
import WeddingSuitsGrid from '../components/WeddingSuitdGrid'



const Homepage = () => {
  return (
    <>
        <HeroSection/>
        <WeddingShowcase/>
        <WeddingSuitsGrid/>
        <Guarantee/>
        <Steps/>
        <Testimonial/>
    </>
  )
}

export default Homepage