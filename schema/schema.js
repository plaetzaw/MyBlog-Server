const db = require('../models')
const graphql = require('graphql')
const bcrypt = require('bcrypt')
const SALT = 2

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLSchema } = graphql

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
      },
      blogs: {
        type: new GraphQLList(Blog),
        resolve (user) {
          return user.getBlogs()
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
        }
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
      },
      user: {
        type: User,
        resolve (post) {
          return post.getUsers()
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

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'We making that new shit',
  fields () {
    return {
      addUser: {
        type: User,
        args: {
          firstname: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastname: {
            type: new GraphQLNonNull(GraphQLString)
          },
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve (_, args) {
          return db.users.create()({
            firstname: args.firstname,
            lastname: args.lastname,
            email: args.email,
            username: args.username,
            /// !OBVOIUSLY THIS WILL NEED TO BE HASHED
            password: args.password
          })
        }
      }
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query

})

module.exports = Schema
