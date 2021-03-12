const db = require('../models')
const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema } = graphql

const User = new GraphQLObjectType({
  name: 'User',
  desription: 'This is a user',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve (user) {
          return user.id
        }
      },
      firstname: {
        type: GraphQLString,
        resolve (user) {
          return user.firstname
        }
      },
      lastname: {
        type: GraphQLString,
        resolve (user) {
          return user.lastname
        }
      },
      username: {
        type: GraphQLString,
        resolve (user) {
          return user.username
        }
      },
      email: {
        type: GraphQLString,
        resolve (user) {
          return user.email
        }
      },
      password: {
        type: GraphQLString,
        resolve (user) {
          return user.password
        }
      }
    }
  }
})

const Blog = new GraphQLObjectType({
  name: 'Blog',
  description: 'This is a Blog',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve (post) {
          return post.id
        }
      },
      title: {
        type: GraphQLString,
        resolve (post) {
          return post.title
        },
        body: {
          type: GraphQLString,
          resolve (post) {
            return post.body
          }
        },
        author: {
          type: GraphQLString,
          resolve (post) {
            return post.author
          }
        },
        authorID: {
          type: GraphQLInt,
          resolve (post) {
            return post.authorID
          }
        }
      }
    }
  }
})

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => {
    return {
      users: {
        type: new GraphQLList(User),
        args: {
          id: {
            type: GraphQLInt
          },
          email: {
            type: GraphQLString
          }
        },
        resolve (root, args) {
          return db.users.findAll({ where: args })
        }
      },
      blogs: {
        type: new GraphQLList(Blog),
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve (root, args) {
          return db.blogs.findAll({ where: args })
        }
      }
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query

})

module.exports = Schema
