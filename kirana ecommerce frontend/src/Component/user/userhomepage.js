import React from 'react'
import Header from './header'
import HeroBanner from './hero'
import Popularproducts from './popularproducts'
import DealOfTheDay from './dealofthedayproducts'
import HeroProcessSection from './heroprocess'
import Footer from './footer'
import ProductCategories from './categoriesproduct'

function Userhomepage() {
  return (
    <div >
        <Header/>
        <HeroBanner/>
        {/* <Popularproducts/> */}
        <ProductCategories/>
        {/* <DealOfTheDay/> */}
        <HeroProcessSection/>
        <Footer/>
  
    </div>
  )
}

export default Userhomepage
