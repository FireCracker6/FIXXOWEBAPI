const {gql} = require('apollo-server-express')

const typeDefs =  gql(` 
type Article { 
  _id: ID!
  title: String!
  content: String!
}
input ArticleInput { 
  title: String!
  imageURL: String!
}
type Query { 
  articles: [Article]
  article(id: ID!): Article
}
type Mutation { 
  createArticle(articleInput: ArticleInput): Article
  deleteArticle(id: ID!): Article
  updateProduct(_id: ID!, articleInput: ArticleInput): Article!
}
`)

module.exports = typeDefs; 