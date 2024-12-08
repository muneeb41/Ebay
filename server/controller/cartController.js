import CartModel from '../model/cartModel.js';

export const addToCart = async (req, res) => {
  try {
    const userId = req.id; 
    const { id, title, price, quantity ,...rest } = req.body;

    // Validate required fields
    if (!id || !title || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if item already exists in the cart
    const existingCartItem = await CartModel.findOne({ userId, id });

    if (existingCartItem) {
      // Update quantity if item exists
      existingCartItem.quantity += quantity || 1;
      await existingCartItem.save();
      return res.status(200).json({
        message: "Cart item updated successfully",
        cart: existingCartItem,
      });
    }

    // Create a new cart item
    const newCartItem = new CartModel({
      userId,
      id,
      title,
      price,
      quantity: quantity || 1,
      ...rest
    });

    await newCartItem.save();
    return res.status(201).json({
      message: "Cart item added successfully",
      cart: newCartItem,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};



export const removeFromCart = async (req, res) => {
    try {
      const userId = req.id; 
      const  id  = req.params.id; // The cart  ID to remove
  
      if (!id) {
        return res.status(400).json({ message: "Cart ID is required" });
      }
  
      // Find and delete the cart item
      const deletedItem = await CartModel.findOneAndDelete({ userId, id });
  
      if (!deletedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
  
      return res.status(200).json({
        message: "Cart removed successfully",
        id: deletedItem.id,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  };


  export const getCarts = async (req, res) => {
    try {
      const userId = req.id;
  
      const carts = await CartModel.find({ userId });

      if (!carts.length) {
        return res.status(200).json({ message: "No items found in the cart" ,carts: [] });
      }
  
      return res.status(200).json({
        message: "Carts retrieved successfully",
        carts,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  };




  export const clearCart = async (req, res) => {
    try {
      const userId = req.id;  // Assuming 'userId' is set in the token verification middleware
      
      // Check if userId is available
      if (!userId) {
        return res.status(400).json({ message: "User ID is missing" });
      }
  
      // Delete all cart items for the user
      const result = await CartModel.deleteMany({ userId });
  
      if (result.deletedCount === 0) {
        return res.status(200).json({ message: "No items found in the cart" });
      }
  
      return res.status(200).json({
        message: "Cart cleared successfully",
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  };
  