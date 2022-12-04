const express = require('express')
const products = require('../data/simulated_database')
const controller = express.Router()

/* console.log(products) */

controller.param("articleNumber",  (req, res, next, articleNumber) => {
    req.product = products.find(product => product.articleNumber == articleNumber)
    next()

})
//get tagged products
controller.param("tag",  (req, res, next, tag) => {
    req.products = products.filter(x => x.tag === tag)
    next()

})

// http://localhost:5000/api/products
controller.route('/')
.post ((httpRequest, httpResponse) => {

    let product = {
        articleNumber: (products[products.length -1])?.articleNumber > 0  ? (products[products.length -1])?.articleNumber + 1 : 1,
        category: httpRequest.body.category,
        imageURL: httpRequest.body.imageURL,
        title: httpRequest.body.title,
        description: httpRequest.body.description,
        rating: httpRequest.body.rating,
        price: httpRequest.body.price
    }
    if ( httpRequest.body.category != 0 && httpRequest.body.imageURL != 0 &&  httpRequest.body.title != 0 && httpRequest.body.price != 0) {
        if (httpRequest.body.category != 'Missing' && httpRequest.body.imageURL.length > 4 &&  httpRequest.body.title.length > 4 && httpRequest.body.price > 9 )
   

    products.push(product)
}
    httpResponse.status(201).json(product)
}

)
.get ((httpRequest, httpResponse) => {
    httpResponse.status(200).json(products)
})


// http://localhost:5000/api/products/{id}
controller.route('/details/:articleNumber')
.get((httpRequest, httpResponse) => {
    if (httpRequest.product != undefined) {
        httpResponse.status(200).json(httpRequest.product)
    }
   
    else
    httpResponse.status(404).json()
})
controller.route('/:tag').get((req, res) => {

    if (req.products != undefined )
    res.status(200).json(req.products)
   else
    res.status(404).json()

    

})
controller.route('/:tag/:take').get((req, res) => {
    let list = []

    for (let i = 0; i < req.params.take; i++)
        list.push(req.products[i])
  

  res.status(200).json(list) 
  console.log('hämtar list')
console.log(list)
   
})


.put((httpRequest, httpResponse) => {
    if (httpRequest.product != undefined) {
      products.forEach(product => {
      if (product.articleNumber == httpRequest.product.articleNumber) {
        product.category = httpRequest.body.category ? httpRequest.body.category : product.category
        product.imageURL = httpRequest.body.imageURL ? httpRequest.body.imageURL : product.imageURL
        product.title = httpRequest.body.title ? httpRequest.body.title : product.title
        product.description = httpRequest.body.description ? httpRequest.body.description : product.description
        product.rating = httpRequest.body.rating ? httpRequest.body.rating : product.rating
        product.price = httpRequest.body.price ? httpRequest.body.price : product.price
      }
      })
      httpResponse.status(200).json(httpRequest.product)
    }
   
    else
    httpResponse.status(404).json()


})
.delete((httpRequest, httpResponse) => {
    if (httpRequest.product != undefined) {
        products = products.filter(product => product.articleNumber !== httpRequest.product.articleNumber)
        httpResponse.status(204).json()
    }
   
    else
    httpResponse.status(404).json()
    
})


module.exports = controller