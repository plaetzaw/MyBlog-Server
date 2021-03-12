require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
// const { buildSchema } = require('graphql')
const schema = require('./schema/schema')
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/graphql', graphqlHTTP({
  schema,
  // rootValue: root,
  graphiql: true
}))

app.use(require('./routes/Post'))
app.use(require('./routes/User'))

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
