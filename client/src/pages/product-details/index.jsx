import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/ui/loading/index.jsx";
import apiStore from "../../libs/apiStore.js";
import Navbar from "../../components/ui/navbar";
import { FaCheckCircle, FaTruck, FaUndo } from "react-icons/fa";
import { toast } from "react-toastify";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import StarRating from "./components/star-rating/index.jsx";
import { getUserFromLocalStorage } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart/cartSlice";
import RelatedProducts from "./components/related-products/index.jsx";
import { FaCartPlus, FaShoppingBag } from "react-icons/fa";



const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState(null);
  const user = getUserFromLocalStorage();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiStore.get(`/products/${id}`);
        setCategory(response.data.category);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("API error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  const handleAddToCart = async () => {
    const payload = { ...product, quantity };
    if (!user) {
      toast.error("You need to login to add items to cart");
      navigate("/signup");
      return;
    }
    dispatch(addToCart(payload));
    toast.success("Item added to cart");
  };

  const handleBuy = () => {
    if (!user) {
      toast.error("You need to login to buy products");
      navigate("/signup");
      return;
    }
    toast.success("Order Placed successfully");
  };

  return (
    <div>
      <Navbar />
      {loading && <Loading />}
      {!loading && (
        <div className="max-w-6xl mx-auto p-6 ">
          <div className="flex flex-col sm:flex-row bg-white shadow-md box-shadow-main rounded-lg overflow-hidden relative">
            {/* Percentage Badge */}
            <div className="absolute top-0 left-0 bg-green-500 md:text-lg md:h-10 md:w-32 text-white text-xs font-bold py-1 px-2 rounded-br-full flex items-center z-10">
              {product.discountPercentage}% OFF
            </div>
            {/* Image Section */}
            <div className="w-full flex justify-center sm:items-center lg:w-1/2 p-4">
              <img
                src={product.thumbnail || "placeholder.png"}
                alt={product.title || "Product Image"}
                className=" rounded-lg w-[35vw] hover-scale "
              />
            </div>

            {/* Details Section */}
            <div className="w-full lg:w-1/2 p-6 space-y-2  sm:space-y-3">
              <h2 className="text-2xl font-bold text-gray-800">
                {product.title || "Product Title"}
              </h2>
              <p className="text-gray-500">{product.category || "Category"}</p>
              <div className="flex items-center space-x-3">
                <p className="text-xl font-semibold text-red-600">
                  ${Number(product.price)?.toFixed(2) || "0.00"}
                </p>
                {product.discountPercentage > 0 && (
                  <span className="ml-2 text-md text-gray-500 line-through">
                    {/* calculate amount before discount  with formula*/}$
                    {(
                      product.price /
                      (1 - product.discountPercentage / 100)
                    ).toFixed(2)}
                  </span>
                )}
              </div>
              {product.discountPercentage && (
                <div className="text-xl font-semibold text-green-600 flex justify-start gap-5 ">
                  <span>Save ${((
                      product.price /
                      (1 - product.discountPercentage / 100)
                    ).toFixed(2) - product.price ).toFixed(2)}</span>
                </div>
              )}
              <StarRating rating={product.rating} />
              {/* this is description container */}
              <hr />
              <p className="text-gray-700">
                {product.description || "No description available"}
              </p>
              <hr />
              {/* Availability */}
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-green-500" />
                <span className="text-sm text-gray-600">
                  {product.availabilityStatus || "Unavailable"} (
                  {product.stock || 0} available)
                </span>
              </div>

               {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {product.tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-600 text-sm py-1 px-3 rounded-full shadow-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

              {/* Shipping and Return Info */}
  <div className="text-sm text-gray-600 space-y-4 border-t pt-4 mt-2">
    <div className="flex items-center space-x-2">
      <FaTruck className="text-purple-600" />
      <span>
        <span className="font-medium text-gray-700">Shipping:</span>{' '}
        {product.shippingInformation || "Ships in 2 weeks"}
      </span>
    </div>
    <div className="flex items-center space-x-2">
      <FaUndo className="text-blue-500" />
      <span>
        <span className="font-medium text-gray-700">Returns:</span>{' '}
        {product.returnPolicy || "No return policy"}
      </span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-yellow-500 font-medium">⏳</span>
      <span>
        <span className="font-medium text-gray-700">Warranty:</span>{' '}
        {product.warrantyInformation || "3 months"}
      </span>
    </div>
  </div>

              {/* Dimensions & Weight */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  Dimensions: {product.dimensions?.width || 0}cm (W) x{" "}
                  {product.dimensions?.height || 0}cm (H) x{" "}
                  {product.dimensions?.depth || 0}cm (D)
                </p>
                <p>Weight: {product.weight || 0}kg</p>
              </div>
              <hr />

            {/* Quantity Control */}
        <div className="flex items-center space-x-4">
          <label className="hidden sm:block text-gray-700 font-medium">Qty:</label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="p-2 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white transition"
            >
              <AiOutlineMinus size={16} />
            </button>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-12 sm:w-16 text-center py-1 border rounded-md"
            />
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="p-2 rounded-full bg-gray-200 hover:bg-green-500 hover:text-white transition"
            >
              <AiOutlinePlus size={16} />
            </button>
          </div>
        </div>
{/* Add to Cart Button */}
<div className="w-full max-w-sm mx-auto">
  {/* Add to Cart Button */}
  <button
    onClick={handleAddToCart}
    className="flex items-center justify-center w-full py-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold shadow-lg rounded-lg hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
  >
    <FaCartPlus className="mr-2 text-lg" />
    Add to Cart
  </button>

  {/* Spacer for responsiveness */}
  <div className="my-3"></div>

  {/* Buy Now Button */}
  <button
    onClick={handleBuy}
    className="flex items-center justify-center w-full py-3 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white font-semibold shadow-lg rounded-lg hover:from-red-600 hover:via-red-700 hover:to-red-800 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
  >
    <FaShoppingBag className="mr-2 text-lg" />
    Buy Now
  </button>
</div>

            </div>
          </div>
        </div>
      )}
      {category  && <RelatedProducts category={category} />}
    </div>
  );
};

export default ProductDetails;
