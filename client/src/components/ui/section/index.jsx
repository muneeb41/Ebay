import React from 'react'
import Cart from '../cart'
import Loading from '../loading/index.jsx'

const Section = ({title , products ,loading}) => {

      /////////////////////////////////////////////////// LOADING COMPONENT ///////////////////////////////////////////////
  // loading state check  and return loading component if loading is true
  if(loading) return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 '>
       <Loading />
    </div>
  )
  return (
    <div>
        <div className=''>
            <p className='text-xl sm:text-2xl  font-semibold ml-2 sm:ml-10 my-3'>{title}</p>
            <hr />
        </div>
        <div className='flex flex-row flex-wrap gap-9 justify-center py-6'> 
            {products.map((product) => (
                <Cart product={product} key={product.id} />
            ))}
        </div>
    </div>
  )
}

export default Section