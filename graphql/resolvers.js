const Article = require('../schemas/graphqlSchema');          

const resolvers = {
  Query: {
    articles: function() {                     
      return Article.find({});
    },
    article: function(parent, args) {
      return Article.findById(args.id)
    }
  },
  Mutation: {
    createArticle: function(parent, args) {
      let article = new Article(args.articleInput);
      return article.save();
    },
    deleteArticle: function(parent, args) {
      return Article.findByIdAndRemove(args.id);
    },
    updateProduct: function(parent, args) {
      return Article.findByIdAndUpdate(args.id, args.articleInput, { new: true });
    }
  }
};

module.exports = resolvers; 