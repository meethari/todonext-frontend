// Requires
const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')

const setUpMongoose = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    var taskSchema = mongoose.Schema({
        text: String,
        done: Boolean
    })
    var Task = mongoose.model('task', taskSchema)
    return Task
}

const app = express()

var Task = setUpMongoose()

app.use(express.json())

app.get('/api/tasks', async (req, res) => {
    const taskList = await Task.find()
    res.send(taskList)
})

app.listen(process.env.PORT, () => {console.log(`Listening at port ${process.env.PORT}`)})