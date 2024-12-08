import React from 'react'
// Import Swiper React components
import { Swiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// import required modules
import {Autoplay} from 'swiper/modules';

const SwiperWraper = ({children}) => {
    const slidesCount = React.Children.count(children);
    
  return (
      // this component is a wrapper component that animate their children component
     <Swiper
     slidesPerView={Math.min(1, slidesCount)} // Adjust slidesPerView based on available children
     autoplay={{
        delay: 1800,
        disableOnInteraction: false,
      }}
        grabCursor={true}
        loop={slidesCount >= 2} // Enable loop only if there are enough slides
        spaceBetween={100}
        breakpoints={{
            640: {
              slidesPerView: Math.min(3, slidesCount),
            },
            768: {
              slidesPerView: Math.min(4, slidesCount),
            },
            1024: {
              slidesPerView: Math.min(6, slidesCount),
            },
           
          }}
     modules={[Autoplay]}
     className="mySwiper"
     >
       {children}
     </Swiper>
  )
}

export default SwiperWraper