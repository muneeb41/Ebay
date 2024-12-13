


export const cartSwagger = (req,res,next)=>{
    // #swagger.tags = ['Carts API'] 
    next();
}


export const addToCartSwagger = (req,res,next)=>{
  /*
#swagger.parameters['body'] = {
  in: 'body',
  schema: {
      quantity: 1,
      id: 115,
      title: 'MotoGP CI.H1',
      description: 'The MotoGP CI.H1 is a high-performance motorcycle inspired by MotoGP racing.',
      category: 'motorcycle',
      price: 14999.99,
      discountPercentage: 17,
      rating: 4.15,
      stock: 85,
      tags: ['sports', 'racing'],
      brand: 'MotoGP',
      sku: '0ENL5IX6',
      weight: 9,
      dimensions: {
        properties: {
          width: 2.5,
          height: 1.2,
          depth: 0.8
        }
      },
      warrantyInformation: '2 year warranty',
      shippingInformation: 'Ships in 1 month',
      availabilityStatus: 'In Stock',
      reviews: [
        {
          rating: 5,
          comment: 'Excellent bike!',
          date: '2024-12-01T10:00:00Z',
          reviewerName: 'John Doe',
          reviewerEmail: 'john@example.com'
        },
        {
          rating: 4,
          comment: 'Good but expensive.',
          date: '2024-11-15T08:30:00Z',
          reviewerName: 'Jane Smith',
          reviewerEmail: 'jane@example.com'
        }
      ],
      returnPolicy: '30 days return policy',
      minimumOrderQuantity: 1,
      meta: {
        properties: {
          createdAt: '2024-12-01T10:00:00Z',
          updatedAt: '2024-12-02T12:00:00Z',
          barcode: '123456789012',
          qrCode: 'https://example.com/qrcode'
        }
      },
      images: [
        'https://cdn.dummyjson.com/products/images/motorcycle/image1.jpg',
        'https://cdn.dummyjson.com/products/images/motorcycle/image2.jpg',
        'https://cdn.dummyjson.com/products/images/motorcycle/image3.jpg',
        'https://cdn.dummyjson.com/products/images/motorcycle/image4.jpg'
      ],
      thumbnail: 'https://cdn.dummyjson.com/products/images/motorcycle/MotoGP%20CI.H1/thumbnail.jpg'
  }
};
*/


       next(); 
}


export const updateCartSwagger = (req,res,next)=>{
    /*
     #swagger.parameters['body'] = {
       in: 'body',
       schema: {
           quantity: 1,
       }
     };
     #swagger.description = 'demo id is 115 but please firstly add cart into database by using addToCart API method',
     */
   next();
}
