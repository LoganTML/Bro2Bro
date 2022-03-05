const socket = io('http://localhost:3000')

//Creates variables corresponding to each button
const convBro = document.getElementById('conv-form')
const jolBro = document.getElementById('jol-form')
const inqBro = document.getElementById('inq-form')
//msgText corresponds to the bro type plus whatever text has been entered
const msgText = null

//broContainer is where all messages are displayed
const broContainer = document.getElementById('bro-text-container')

//There's currently no way to add text but I'm planning on adding some kinda hidden way later
const message = null

const newUser = prompt('Tell me your name. Now. Please.')
printBro('So kind of you to join us.')
socket.emit('new-user', newUser)

//When a new message is received from server, prints it to chat log
socket.on('new-message', data => {
    printBro(`${data.name}: ${data.message}`)
})

//Takes in new user's name and prints it to chat log
socket.on('user-connected', username => {
    printBro(`${username} connected`)
})

//Tells group when a user disconnects
socket.on('user-disconnected', username => {
    printBro(`${username} disconnected`)
})

//When the conventional Bro button is pressed, send info to the server with emit
convBro.addEventListener('submit', e => {
    e.preventDefault()
    //Sends the message to server to be printed for other users
    socket.emit('conventional-emit', message)
    
    //Prints the new message to your chat log
    if (message != null) {
        printBro(`You: Bro ${message}`)
    } else {
        printBro(`You: Bro`)
    }
    
})

jolBro.addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('jolly-emit', message)

    if (message != null) {
        printBro(`You: bro :) ${message}`)
    } else {
        printBro(`You: bro :)`)
    }
})

inqBro.addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('inquisitive-emit', message)

    if (message != null) {
        printBro(`You: bro? ${message}`)
    } else {
        printBro(`You: bro?`)
    }
})

//Prints the message to the chat
function printBro(printableText) {
    const newBro = document.createElement('div')
    newBro.innerText = printableText
    broContainer.append(newBro)
}