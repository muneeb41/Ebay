import React, { useEffect, useState } from 'react'
import Navbar from '../../components/ui/navbar/index.jsx'
import ExploreSlider from './components/explore-slider/index.jsx'
import apiStore from '../../libs/apiStore.js'
import { toast } from 'react-toastify'
import Section from '../../components/ui/section/index.jsx'
import Footer from '../../components/ui/footer/index.jsx'



const Explore = () => {
    const [products , setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    
    
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true); // Show loading state before fetching data
    
          // Fetch all products concurrently
          const [shirtsResponse, response, response2,response4] = await Promise.all([
            apiStore.get('/products/category/mens-shirts'),
            apiStore.get('/products/category/sports-accessories'),
            apiStore.get('/products/category/furniture'),
            apiStore.get('/products/category/smartphones'),
          ]);
    
           // Combine all products
        let allProducts = [
          ...shirtsResponse.data.products,
          ...response.data.products.slice(0,5),
          ...response2.data.products,
          ...response4.data.products.slice(0,5)
        ];
  
        // Shuffle the products array
        allProducts = allProducts.sort(() => Math.random() - 0.5);
  
        // Set shuffled products
        setProducts(allProducts);
        } catch (error) {
          console.error('Error fetching products:', error);
          toast.error('Failed to fetch products. Please try again later.');
        } finally {
          setLoading(false); // Hide loading state after fetching data or error
        }
      };
    
      fetchProducts();
    }, []);
  return (
    <div>
        <Navbar />
        <ExploreSlider />
        <Section title={"Explore"} loading={loading} products={products}/>

        <Footer />

    </div>
  )
}

export default Explore