//Imports packages
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*",    //Allows server to load resources from other ports
    },
})

//Sets up express server, 'use' allows it to use folders public and views
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
//Allows use of url encoded parameters for body instead of form
app.use(express.urlencoded({ extended: true }))

//Creates empty object of rooms
const rooms = { }

//Renders index page as response.
app.get('/', (req, res) => {
    res.render('index', {rooms: rooms })
})

app.post('/room', (req, res) => {
    if (rooms[req.body.room] != null) {
        return res.redirect('/')
    }
    //Requests name of newly created room, makes an object for users
    rooms[req.body.room] = { users: {} }
    //Redirects user to new room
    res.redirect(req.body.room)
    // Send message that new room was created
    io.emit('room-created', req.body.room)
})

app.get('/:room', (req, res) => {
    if (rooms[req.params.room] == null) {
        return res.redirect('/')
      }
    res.render('room', { roomName: req.params.room })
})

//Creates a listener on port 3000
server.listen(3000)

io.on('connection', socket => {
    console.log('welcome :)') //Each time a new user joins, logs 'welcome' to the console
    
    socket.on('new-user', (room, username) => {
        socket.join(room)
        //Adds username to room object
        rooms[room].users[socket.id] = username
        //Emits that user joined to room only
        socket.to(room).emit('user-connected', username)    
    })

    //Sends 'Bro ' and whatever message has been typed to all other users
    //I know you can't type messages yet but we'll get there, I wanna make it hidden enough
    socket.on('conventional-emit', (room, message) => {
        if (message != null) {
            message = "Bro " + message
        } else {
            message = "Bro"
        }
        //Sends message to room only
        socket.to(room).emit('new-message', { message: message, name: rooms[room].users[socket.id] })
    })

    //Same as above but for "bro :)"
    socket.on('jolly-emit', (room, message) => {
        if (message != null) {
            message = "bro :) " + message
        } else {
            message = "bro :)"
        }
        socket.to(room).emit('new-message', { message: message, name: rooms[room].users[socket.id] })
    })

    //Same as above but for "bro?"
    socket.on('inquisitive-emit', (room, message) => {
        if (message != null) {
            message = "bro? " + message
        } else {
            message = "bro?"
        }
        socket.to(room).emit('new-message', { message: message, name: rooms[room].users[socket.id] })
    })

    //Sends "___ disconnected" to all rooms that the user was a part of
    socket.on('disconnect', () => {
        getUserRooms(socket).forEach(room => {
            socket.to(room).emit('user-disconnected', rooms[room].users[socket.id])
            delete rooms[room].users[socket.id]
        })
    })
})

//Iterates through rooms list, collects list of names
function getUserRooms(socket) {
    //Converts rooms list to an array
    //Reduce takes list of names, accesses parameters (key, value)
    return Object.entries(rooms).reduce((names, [name, room]) => {
        //If user isn't already in this room, push the name to the output array
        if (room.users[socket.id] != null) {
            names.push(name)
        }
      return names
    }, [])
  }