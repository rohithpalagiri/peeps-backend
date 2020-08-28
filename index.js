const express = require('express')
const app = express()
const cors = require('cors')


//Middleware
app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(requestLogger)

let users = require('./db.json')

const generateId = () => {
    const maxId = users.length > 0
        ? Math.max(...users.map(x => x.id))
        : 0
    return maxId + 1
}

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/users', (req, res) => {
    res.json(users)
})

app.get('/api/users/:id', (request, response) => {
    const id = Number(request.params.id)
    const user = users.find(user => user.id === id)

    if (user) {
        response.json(user)
    } else {
        response.status(404).end()
    }

})

app.put('/api/users/:id', (request, response, next) => {
    const body = request.body

    const user = {
        content: body.content,
        bgImg: body.bgImg,
    }


})

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})