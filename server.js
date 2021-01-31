// Requires
const express = require('express')
require('dotenv').config()
const path = require('path');
const mongoose = require('mongoose')

const setUpMongoose = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    var taskSchema = mongoose.Schema({
        text: {
            type: String,
            required: true
        },
        done: {
            type: Boolean,
            default: false
        } 
    })
    var Task = mongoose.model('task', taskSchema)
    return Task
}

const app = express()

var Task = setUpMongoose()

app.use(express.json())


app.post('/api/tasks', async (req, res) => {
    // handler for create

    try {
        var newTask = new Task(req.body)
        await newTask.save()
        res.status(201).send(newTask)
    } catch (err) {
        res.status(404).send(err)
    }

})

app.get('/api/tasks', async (req, res) => {
    // handler for reading all tasks

    const taskList = await Task.find()
    res.send(taskList)
})

app.get('/api/tasks/:id', async (req, res) => {
    // handler for reading specific task

    try {
        const task = await Task.findById(req.params.id)
        if (task !== null)
            res.send(task)
        else
            res.status(404).send("No matching document found")
    } catch (err) {
        res.status(404).send(err)
    }
        
})

app.patch('/api/tasks/:id', async (req, res) => {
    // handler for update
    const task = await Task.findById(req.params.id)

    if (task == null) {
        res.status(404).send("No matching document found")
        return
    }

    const sentObject = req.body

    if (!('done' in sentObject && 'text' in sentObject)) {
        res.status(404).send("Both done and text fields should be present")
        return
    }

    task.done = sentObject.done
    task.text = sentObject.text

    try {
        task.save()
    } catch {
        res.status(404).send("Both done and text fields should be present")
    } finally {
        res.send(task)
    }


})

app.delete('/api/tasks/:id', async (req, res) => {
    // handler for delete

    try {
        const returnVal = await Task.deleteOne({_id: req.params.id})
        if (returnVal && returnVal.deletedCount > 0)
            res.status(200).send('OK')
        else 
            res.status(404).send('No matching document found')
    } catch (err) {
        res.status(404).send(err)
    }
})

if (process.env.NODE_ENV == 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

const port = process.env.PORT || 5000

app.listen(port, () => {console.log(`Listening at port ${port}`)})