import React, { useState } from 'react'
import TopSection from './components/top-section/index.jsx'
import MiddleSection from './components/middle-section/index.jsx'
import BottomSection from './components/bottom-section/index.jsx'
import SmallScreenNavbar from './components/small-screen-navbar/index.jsx'
import Section from '../section/index.jsx'
import { FiX } from 'react-icons/fi'; 

const Navbar = () => {
  const [searchResults , setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <div className=''>
        <TopSection />
        <MiddleSection loading={loading} setLoading={setLoading} setSearchResults={setSearchResults} />
        <BottomSection />
        <SmallScreenNavbar  loading={loading} setLoading={setLoading} setSearchResults={setSearchResults} />
        {searchResults.length?(<div className='relative'>
          <button
            onClick={() => setSearchResults([])}  // Set the state to false to hide the section
            className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800"
          >
            <FiX size={24} />
          </button>
          <Section title={'Search Results : '} products={searchResults} loading={loading}  />
        </div>):('')  }
    </div>
  )
}

export default Navbar