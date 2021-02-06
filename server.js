// Requires
const express = require('express')
require('dotenv').config()
const path = require('path');
const mongoose = require('mongoose')
const passport = require('passport')
const connect_ensure_login = require('connect-ensure-login')
const Strategy = require('passport-local').Strategy;

// Mongoose

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

    var userSchema =  mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    })
    var User = mongoose.model('user', userSchema)

    return {Task, User}
}

var {Task, User} = setUpMongoose()

// Passport

passport.use(new Strategy(
    function(username, password, done) {
        User.findOne({username: username}, function(err, user){
            if (err) {return(done(err))}
            if (!user) {return(done(null, false))}
            if (user.password != password) {return done(null, false)}
            return done(null, user)
        })
    }
))

// Serialize and deserialize
passport.serializeUser(function(user, done) {
    done(null, user._id)
})

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (err) {return done(err)}
        done(null, user)
    })
})

// Express App

const app = express()
app.use(express.json())
app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/')
})

app.get('/logout', (req, res) => {
    req.logout()
    req.redirect('/')
})

app.post('/register', async function (req, res) {

    // If both fields not provided, reject
    if (!(req.body.username && req.body.password)) {
        res.status(404).send('Format: {username, password}')
        return
    }

    // Check if user already exists
    userExists = await User.findOne({'username': req.body.username})

    if (userExists) {
        res.status(409).send('Account already exists. Try logging in.')
        return
    }

    // Create user
    var newUser = new User({username: req.body.username, password: req.body.password})
    await newUser.save()

    // log in user and redirect them
    req.login(newUser, (err) => {
        if (err) {
            return res.status(500).send('Error in logging in user')
        }
        return res.redirect('/')

    })

    // TODO 2: when you do this, provide the UI a message

} )

// Tasks handlers

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

app.get('/api/tasks', connect_ensure_login.ensureLoggedIn() , async (req, res) => {
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