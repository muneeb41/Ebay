import React, { useState } from 'react'
import banner from '../../../../assets/images/hero-section/banner.jpg'
import banner2 from '../../../../assets/images/hero-section/banner2.jpg'
import banner3 from '../../../../assets/images/hero-section/banner3.jpg'

import small from '../../../../assets/images/hero-section/1.jpg'
import small2 from '../../../../assets/images/hero-section/2.jpg'
import small3 from '../../../../assets/images/hero-section/3.jpg'

import { Swiper } from 'swiper/react'
import { SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";








const HeroSection = () => {

   const imagesForLargerScreen = [banner, banner2 ,banner3];
   const imagesForSmallerScreen = [small , small2, small3];
    
 

  return (
    <div className='w-full h-[52vh]'>
         <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]} // Add modules for pagination and navigation
        spaceBetween={0} // Space between slides
        slidesPerView={1} // Number of slides visible at a time
        
        loop={true} // Enable infinite looping
        className="h-full "
        speed={600}
      >
         {imagesForLargerScreen.map((image, index) =>(
         <SwiperSlide key={index} className=''>
         <img src={imagesForLargerScreen[index]} alt="Slide" className="h-full w-full hidden sm:flex " />
         <img src={imagesForSmallerScreen[index]} alt="Slide" className="h-full w-full sm:hidden" />
       </SwiperSlide>
       ))}
     
        
      </Swiper>
    </div>

  )
}

export default HeroSection

