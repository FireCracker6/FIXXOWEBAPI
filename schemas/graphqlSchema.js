
const graphql = require('graphql')
const {GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList} = graphql


const Vendor = require('./mongodb/vendorSchema')
const User = require('./mongodb/userSchema')
const Product = require('./mongodb/productSchema')
const ProductUpdate = require('./mongodb/productUpdateSchema')
const { Query } = require('../graphql/resolvers')
const { request } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        _id: {type: GraphQLID },
        imageURL: { type: GraphQLString},
        title: { type: GraphQLString},
        price: { type: GraphQLString},
        rating: { type: GraphQLString},
         tag: { type: GraphQLString}, 
        category: { type: GraphQLString},
        description: { type: GraphQLString},
        vendor: {
            type: VendorType,
            resolve(parent, args) {
                return Vendor.findById(parent.vendorId)
            }
        }
       
    })
})
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: {type: GraphQLID },
        firstName: { type: GraphQLString},
        lastName: { type: GraphQLString},
        email: { type: GraphQLString},
        password: { type: GraphQLString},
      
   
       
    })
})
const UserLoginType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: {type: GraphQLID },
        email: { type: GraphQLString},
        password: { type: GraphQLString},
      
   
       
    })
})


const UpdateType = new GraphQLObjectType({
    name: 'ProductUpdate',
    fields: () => ({
       
            _id: { type:  (GraphQLID)},
            title: { type:  (GraphQLString)},
            imageURL: { type:  (GraphQLString)},
            category: { type:  (GraphQLString)},
            description: { type:  (GraphQLString)},
            tag: { type:  (GraphQLString)},
            rating: { type:  (GraphQLString)},

      
        product: {
            type: ProductType,
            resolve(parent, args) {
                return Product.find({ _id: parent._id})
            }
        },
        imageURL: { type: GraphQLString},
        title: { type: GraphQLString},
        price: { type: GraphQLString},
        rating: { type: GraphQLString},
         tag: { type: GraphQLString}, 
        category: { type: GraphQLString},
        description: { type: GraphQLString},
 
       
    })
})
const DeleteType = new GraphQLObjectType({
    name: 'DeleteProduct',
    fields: () => ({
       
            _id: { type:  (GraphQLID)},
            title: { type:  (GraphQLString)},
            imageURL: { type:  (GraphQLString)},
            category: { type:  (GraphQLString)},
            description: { type:  (GraphQLString)},
            tag: { type:  (GraphQLString)},
            rating: { type:  (GraphQLString)},

      
        product: {
            type: ProductType,
            resolve(parent, args) {
                return Product.find({ _id: parent._id})
            }
        },
     
 
       
    })
})

const VendorType = new GraphQLObjectType({
    name: 'vendors',
    fields: () => ({
        _id: {type: GraphQLID },
        name: { type: GraphQLString},
        products: { 
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find({ vendorId: parent._id})
            }
        }
    })
})




const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQueryType', 
    fields: {
        vendor: {
            type: VendorType,
            args: { id: { type: graphql.GraphQLID } },
            resolve(parent, args) {
                return Vendor.findById(args.id)
            }
        },
        vendors: {
            type: new graphql.GraphQLList(VendorType),
            resolve(parent, args) {
                return Vendor.find({})
            }
        },
        user: {
            type: UserType,
            args: { id: { type: graphql.GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id)
            }
        },
        users: {
            type: new graphql.GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({})
            }
        },

        product: {
            type: ProductType,
            args: { id: { type: graphql.GraphQLID } },
            resolve(parent, args) {
                return Product.findById(args.id)
            }
        },
        productUpdate: {
            type: UpdateType,
            args: { id: { type: graphql.GraphQLID } },
            resolve(parent, args) {
                return ProductUpdate.findById(args.id)
            }
        },
        products: {
            type: new graphql.GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find({})
            }
        }

    }
})
const resolvers = {
    Query: {
      articles: function() {                     
        return Product.find({});
      },
      article: function(parent, args) {
        return Product.findById(args.id)
      }
    },
    Mutation: {
      createArticle: function(parent, args) {
        let article =  Product(args._id);
        return article.save();
      },
      deleteArticle: function(parent, args) {
        return Product.findByIdAndRemove(args.id);
      },
      updateArticle: function(parent, args) {
        return Product.findByIdAndUpdate(args.id, args.articleInput, { new: true });
      }
    }
  };
  
 
const Mutation = new GraphQLObjectType({
    
    Query: {
        articles: function() {                     
          return Product.find({});
        },
        article: function(parent, args) {
          return Product.findById(request.params.id)
        }
      },
    name: 'Mutation',
   
    fields: {
        addVendor: {
            type: VendorType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(parent, args) {
                const vendor = new Vendor({
                    name: args.name
                })
                return vendor.save()
            }
        },
        addUser: {
            
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }

          
          
            },
            resolve(parent, args) {
                var hash = bcrypt.hashSync(args.password, 10)
                const user = new User({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: hash,
                })
                return user.save()
            }
        },
        loginUser: {
            
            type: UserType,
            args: {
                _id: { type:  (GraphQLID)},
                email: { type: GraphQLString },
                password: { type: GraphQLString }

          
          
            },
            resolve(parent, args) {
              
                return User.findOne(args._id, args);
            }
        },
        addProduct: {
            type: ProductType,
            args: {
                imageURL: { type: GraphQLString },
                title: { type: GraphQLString },
                price: { type: GraphQLString },
                rating: { type: GraphQLString },
                tag: { type: GraphQLString },
                category: { type:GraphQLString },
                description: { type: GraphQLString },
                vendorId: { type: GraphQLID }
            },
            resolve(parent, args) {
                const product = new Product({
                    imageURL: args.imageURL,
                    title: args.title,
                    price: args.price,
                    rating: args.rating,
                    tag: args.tag,
                    category: args.category,
                    description: args.description,
                    vendorId: args.vendorId
                })
            
                return product.save()
            }
        },
      
        updateProduct: {
          
            type: UpdateType,
            args: {
                _id: { type: (GraphQLID) },
                imageURL: {type: GraphQLString},
           title: {type: GraphQLString},
           price: {type: GraphQLString},
           description: {type: GraphQLString},
           category: {type: GraphQLString},
           rating: {type: GraphQLString},
           tag: {type: GraphQLString},
          
         
                
            }, 
            resolve(parent, args) {
             
            
                console.log(args._id, args.title, args.imageURL)
                return Product.findByIdAndUpdate(args._id, args,  { new: true });
               
            
            }
            
        },
          deleteProduct: {
          
            type: DeleteType,
            args: {
                _id: { type: (GraphQLID) },
                imageURL: {type: GraphQLString},
           title: {type: GraphQLString},
           price: {type: GraphQLString},
           description: {type: GraphQLString},
           category: {type: GraphQLString},
           rating: {type: GraphQLString},
           tag: {type: GraphQLString},
          
        
                
            }, 
            resolve(parent, args) {
             
               
                console.log(args._id)
                return Product.findByIdAndRemove(args._id, args);
               
            
            }
            
        }
      
      
    }
    
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
    resolver: resolvers
})

