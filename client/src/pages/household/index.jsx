import React from 'react'
import Navbar from '../../components/ui/navbar/index.jsx'
import CategoriesSection from '../../components/ui/categories-section/index.jsx'
import { householdCategories } from '../../utils/staticData.js'
import Footer from '../../components/ui/footer/index.jsx'

const Household = () => {
  return (
    <div>
        <Navbar />
        <CategoriesSection categories={householdCategories} />
        
        <Footer />
    </div>
  )
}

export default Household