const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
   
    title: {
        type: String,
       
      },
      category: {
        type:String,
      },
      imageURL: {
        type: String,
      },
      description: {
        type: String,
      },
      tag: {
        type: String,
      },
      price: {
        type:  Number,
        default: 100
      },
      rating: {
        type:  Number,
        default: 5,
      },

})

/* module.exports = mongoose.model("products", productSchema) */
const Products = mongoose.model("products", productSchema);
module.exports = Products;