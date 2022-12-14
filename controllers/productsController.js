const express = require('express')
const Products = require('../schemas/productSchema')
const productSchema = require('../schemas/productSchema')
const controller = express()
const { authorize } = require('../middleswares/authorization')



// unsecured routes

controller.route('/').get(async (req, res) => {
    
    const products = []
    const list = await productSchema.find()
   if (list) {
    for (let product of list) {
      
        products.push( {
            _id: product._id,
            title: product.title,
            category: product.category,
            imageURL: product.imageURL,
            description: product.description,
            tag: product.tag,
            price: product.price,
            rating: product.rating
        })

    }
    res.status(200).json(products)
   }

    else
        res.status(400).json()
})


 controller.route('/:tag').get(async (req, res) => {
    const products = []
    const list = await productSchema.find({ tag: req.params.tag })
   if (list) {
    for (let product of list) {
        products.push( {
            _id: product._id,
            title: product.title,
            category: product.category,
            imageURL: product.imageURL,
            description: product.description,
            tag: product.tag,
            price: product.price,
            rating: product.rating
        })

    }
    res.status(200).json(products)
   }

    else
        res.status(400).json()

})

controller.route('/:tag/:take').get(async (req, res) => {
    const products = []
    const list = await productSchema.find({ tag: req.params.tag }).limit(req.params.take)
    if (list) {
        for (let product of list) {
            products.push( {
                _id: product._id,
                title: product.title,
                category: product.category,
                imageURL: product.imageURL,
                description: product.description,
                tag: product.tag,
                price: product.price,
                rating: product.rating
            })
    
        }
        res.status(200).json(products)
       }
    
        else
            res.status(400).json()


})

controller.route('/product/details/:_id').get(async (req, res) => {
    

    const item = await productSchema.findById(req.params._id)
    if (item) {
  res.status(200).json({
    _id: item._id,
    title: item.title,
    category: item.category,
    imageURL: item.imageURL,
    description: item.description,
    tag: item.tag,
    price: item.price,
    rating: item.rating,
})
    }else
         res.status(404).json()

}) 

// secured routes --NOT IN USE WITH GRAPHQL COMPONENTS
controller.route('/').post(/* authorize,  */async(req, res) => {
    const { _id, title, category, imageURL, description, tag, price, rating  } = req.body

    if(!title || !price )
        res.status(400).json({text: 'title, price, and category is required'})

    const item_exists = await productSchema.findOne({title})
    if (item_exists)
    res.status(409).json({text: 'A product with the same title already exists'})
    else {
        const product = await productSchema.create({
            _id,
            title,
            category,
            imageURL,
            description,
            tag, 
            price,
            rating,
        })
        if (product)
        res.status(201).json({text: `Product with article number ${product.id} was created successfully`})
        else
        res.status(400).json({text: 'something went wrong when we tried to create the product.'})
    }

})


// update product

controller.route('/product/details/:_id').put(/* authorize,  */async(req, res) => {
    const { _id, title, category, imageURL, description, tag, price, rating  } = req.body


    const item_exists = await productSchema.findById(req.params._id)
    if (item_exists)
    {
        const product = await productSchema.findOneAndUpdate({
          _id : _id,
            title : title ? title : product.title,
            category : category ? category : product.category,
            imageURL: imageURL ? imageURL : product.imageURL,
            description  : description ? description : product.description,
            tag: tag ? tag : product.tag, 
            price: price ? price : product.price,
            rating: rating ? rating : product.rating, 
        })
        if (product)
        res.status(201).json({text: `Product with article number ${product.id} was updated successfully`})
        else
        res.status(400).json({text: 'something went wrong when we tried to update the product.'})
    }


})





    

// remove product
controller.route('/:_id').delete(async(req, res) => {
    if (!req.params._id)
    res.status(400).json('no article number was specified')
else {
    const item = await productSchema.findById(req.params._id)
    if (item) {
       await productSchema.deleteOne(item)
       res.status(200).json({text: `product with article number ${req.params._id} was deleted successfully`})
   
    }
    else {
       res.status(404).json({text: `product with article number ${req.params._id} was not found.`})
    }
}
 
})

module.exports = controller



