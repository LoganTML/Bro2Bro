const io = require('socket.io')(3000, {
    cors: {
        origin: "*",    //Allows server to load resources from other ports
    },
})

const users = {}

io.on('connection', socket => {
    console.log('welcome i guess') //Each time a new user joins, logs 'welcome' to the console
    
    socket.on('new-user', username => {
        users[socket.id] = username
        socket.broadcast.emit('user-connected', username)
    })

    //Sends 'Bro ' and whatever message has been typed to all other users
    socket.on('conventional-emit', message => {
        if (message != null) {
            message = "Bro " + message
        } else {
            message = "Bro"
        }
        socket.broadcast.emit('new-message', { message: message, name: users[socket.id] })
    })

    socket.on('jolly-emit', message => {
        if (message != null) {
            message = "bro :) " + message
        } else {
            message = "bro :)"
        }
        socket.broadcast.emit('new-message', { message: message, name: users[socket.id] })
    })

    socket.on('inquisitive-emit', message => {
        if (message != null) {
            message = "bro? " + message
        } else {
            message = "bro?"
        }
        socket.broadcast.emit('new-message', { message: message, name: users[socket.id] })
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})