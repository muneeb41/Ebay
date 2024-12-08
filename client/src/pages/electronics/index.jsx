import React from 'react'
import Navbar from '../../components/ui/navbar/index.jsx'
import { electronicsCategories } from '../../utils/staticData.js'
import CategoriesSection from '../../components/ui/categories-section/index.jsx'
import Footer from '../../components/ui/footer/index.jsx'

const Electronics = () => {
  return (
    <div>
        <Navbar />
        <CategoriesSection categories={electronicsCategories} />
        <Footer />
    </div>
  )
}

export default Electronics