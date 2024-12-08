import React from 'react'
import Navbar from '../../components/ui/navbar/index.jsx'
import { fashionCategories } from '../../utils/staticData.js'
import CategoriesSection from '../../components/ui/categories-section/index.jsx'
import Footer from '../../components/ui/footer/index.jsx'
import fashion from '../../assets/images/collections/fashion.jpg'

const Fashion = () => {
  return (
    <div>
       <Navbar />
       <CategoriesSection categories={fashionCategories} />
       <img src={fashion} className='w-full h-[60vh]' />
       <Footer />
    </div>
  )
}

export default Fashion