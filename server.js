const express = require('express')
require('dotenv').config()
const app = express()

app.use(express.json())

app.get('/api/tasks', (req, res) => {
    res.send('<html><body><h1>God save the queen</h1></body></html>')
})

app.listen(process.env.PORT, () => {console.log(`Listening at port ${process.env.PORT}`)})