import React from 'react'
import HeroSection from '../components/HeroSection'
import Guarantee from '../components/Gurantee'
import Steps from '../components/Steps'
import Testimonial from '../components/Testimonial'
import BestOutfits from '../components/BestOutfits'
import WeddingShowcase from '../components/WeddingShowcase'
import WeddingSuitsGrid from '../components/WeddingSuitdGrid'
import WeddingHeroOverlay from '../components/Overlay'
import Overlay from '../components/Overlay'



const Homepage = () => {
  return (
    <>
        <HeroSection/>
        <WeddingShowcase/>
        <WeddingSuitsGrid/>
        <Guarantee/>
        {/* <Steps/> */}
        <Overlay/>
        <Testimonial/>
    </>
  )
}

export default Homepage