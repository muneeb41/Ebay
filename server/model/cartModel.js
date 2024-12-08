
import mongoose from 'mongoose';

const { Schema } = mongoose;


const ReviewSchema = new Schema({
    rating: { type: Number, required: true },
    comment: { type: String },
    date: { type: Date },
    reviewerName: { type: String },
    reviewerEmail: { type: String },
  });
  
  const DimensionSchema = new Schema({
    width: { type: Number },
    height: { type: Number },
    depth: { type: Number },
  });
  
  const MetaSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    barcode: { type: String },
    qrCode: { type: String },
  });


const CartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true, default: 1 },
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  discountPercentage: { type: Number },
  rating: { type: Number },
  stock: { type: Number },
  tags: { type: [String] },
  brand: { type: String },
  sku: { type: String },
  weight: { type: Number },
  dimensions: { type: DimensionSchema },
  warrantyInformation: { type: String },
  shippingInformation: { type: String },
  availabilityStatus: { type: String },
  reviews: { type: [ReviewSchema] },
  returnPolicy: { type: String },
  minimumOrderQuantity: { type: Number },
  meta: { type: MetaSchema },
  images: { type: [String] },
  thumbnail: { type: String },
});


const CartModel = mongoose.model('cart', CartSchema);

export default CartModel;