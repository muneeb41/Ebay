import React, { useEffect, useState } from 'react'
import Section from '../../../../components/ui/section/index.jsx';
import apiStore from '../../../../libs/apiStore.js';
import { toast } from 'react-toastify';


const RelatedProducts = ({category}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            setLoading(true);
            const response = await apiStore.get(`/products/category/${category}`);
            setProducts(response.data.products);
          } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("API error");
          } finally {
            setLoading(false);
          }
        };
        fetchProducts();
      }, [category]);
  return (
    <Section products={products} title={"Related Products"} loading={loading} />
  )
}

export default RelatedProducts