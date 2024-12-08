import React, { useEffect, useState } from 'react'
import List from './components/list'
import apiStore from '../../../libs/apiStore';
import { toast } from 'react-toastify';
import Section from '../section/index.jsx';


const CategoriesSection = ({categories}) => {
    const [selectedCategory,setSelectedCategory] = useState(categories[0].name);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([])

    const capitalizeWords = (str) => {
        return str
          .split('-') // Split the string by hyphen
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
          .join(' '); // Join the words back with a space
      };

    const fetchProducts = async () => {
        
        try {
          setLoading(true); // Show loading state before fetching data
          const response = await apiStore.get(`/products/category/${selectedCategory}`);
          
          setProducts(response.data.products); // Update search results with fetched products
          
        } catch (error) {
          console.error('Error fetching products:', error);
          toast.error('Failed to fetch products. Please try again later.');
        } finally {
          setLoading(false); // Hide loading state after fetching data or error
        }
      };

     useEffect(()=>{
        fetchProducts();
     },[selectedCategory]) ;

  return (
    <div>
    <List categories={categories} setSelectedCategory={setSelectedCategory}  selectedCategory={selectedCategory}/>
        <Section products={products} loading={loading} title={capitalizeWords(selectedCategory)} />
    </div>
  )
}

export default CategoriesSection