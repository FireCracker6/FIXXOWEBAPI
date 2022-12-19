const mongoose = require('mongoose')


const productSchema = mongoose.Schema(
    {
        id:{ type: mongoose.Schema.Types.ObjectId },
        imageURL: { type: mongoose.Schema.Types.String, required: true},
        title: { type: mongoose.Schema.Types.String, required: true},
        price: { type: mongoose.Schema.Types.String, required: true},
        tag: { type: mongoose.Schema.Types.String, required: false},
        rating: { type: mongoose.Schema.Types.String, required: true},
        category: { type:mongoose.Schema.Types.String, required: true},
        description: { type: mongoose.Schema.Types.String},
        vendorId: { type:mongoose.Schema.Types.String, required: false }

    }
)

module.exports = mongoose.model("Product", productSchema)