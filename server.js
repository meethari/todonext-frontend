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

app.get('/api/tasks/:id', async (req, res) => {

    try {
        const task = await Task.findById(req.params.id)
        res.send(task)
    } catch (err) {
        res.status(404).send(err)
    }
        
})

app.listen(process.env.PORT, () => {console.log(`Listening at port ${process.env.PORT}`)})