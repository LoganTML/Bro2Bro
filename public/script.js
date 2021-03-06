const socket = io('bro2bro.fly.dev')

//Creates variables corresponding to each button
const convBro = document.getElementById('conv-form')
const jolBro = document.getElementById('jol-form')
const inqBro = document.getElementById('inq-form')

const roomContainer = document.getElementById('room-container')
//msgText corresponds to the bro type plus whatever text has been entered
const msgText = null

//broContainer is where all messages are displayed
const broContainer = document.getElementById('bro-text-container')

//There's currently no way to add text but I'm planning on adding some kinda hidden way later
const message = null

if (convBro != null) {
    const newUser = prompt('Tell me your name. Now. Please.')
    printBro('So kind of you to join us.')
    socket.emit('new-user', roomName, newUser)

    //When the conventional Bro button is pressed, send info to the server with emit
    convBro.addEventListener('submit', e => {
        e.preventDefault()
        //Sends the message to server to be printed for other users
        socket.emit('conventional-emit', roomName, message)
        
        //Prints the new message to your chat log
        if (message != null) {
            printBro(`You: Bro ${message}`, true)
        } else {
            printBro(`You: Bro`, true)
        }
    
    })

    jolBro.addEventListener('submit', e => {
        e.preventDefault()
        socket.emit('jolly-emit', roomName, message)

        if (message != null) {
            printBro(`You: bro :) ${message}`, true)
        } else {
            printBro(`You: bro :)`, true)
        }
    })

    inqBro.addEventListener('submit', e => {
        e.preventDefault()
        socket.emit('inquisitive-emit', roomName, message)

        if (message != null) {
            printBro(`You: bro? ${message}`, true)
        } else {
            printBro(`You: bro?`, true)
        }
    })

}

//When server.js says a room is created, create a new div for its name
//plus a join button and add it to the page
socket.on('room-created', room => {
    const roomElement = document.createElement('div')
    roomElement.innerText = room
    const roomLink = document.createElement('a')
    roomLink.href = `/${room}`
    roomLink.innerText = 'join'
    roomContainer.append(roomElement)
    roomContainer.append(roomLink)
})

//When a new message is received from server, prints it to chat log
socket.on('new-message', data => {
    printBro(`${data.name}: ${data.message}`, false)
})

//Takes in new user's name and prints it to chat log
socket.on('user-connected', username => {
    printBro(`${username} connected`, null)
})

//Tells group when a user disconnects
socket.on('user-disconnected', username => {
    printBro(`${username} disconnected`, null)
})

//Prints the message to the chat
function printBro(printableText, isUser) {
    const newBro = document.createElement('div')
    newBro.innerText = printableText

    //Checks if text is from user. Adjusts CSS accordingly (margins, bg colour)
    if (isUser == true) {
        newBro.id = "msg-from-user"
    } else if (isUser == false) {
        newBro.id = "msg-from-other"
    } else {
        newBro.id = "msg-from-server"
    }
    
    broContainer.append(newBro)
}