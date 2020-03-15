import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser'
import { container } from 'tsyringe'
import setup from './setup'
import { UserController } from './controllers/UserController'

// User interface using http sample.

const app = express()
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

setup(container)

const userController = container.resolve(UserController)

app.get('/users/:id', userController.get)
app.post('/users', userController.post)
app.put('/users/:id', userController.put)

app.listen(3000, () => {
  console.log('listening on port 3000!')
})
