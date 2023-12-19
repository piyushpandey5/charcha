// Imports:
const express = require('express')
const { Socket } = require('socket.io')
// const req = require('express/lib/request')
// Typically, you wouldn't import the request object this way (lie the above line); Express automatically handles this for you. You might not need this line and could remove it.
const app = express()


// Server Setup
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000


// Server Listening
http.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

// Route Handling
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

// Socket

//we will pass http server to socket server so it will know on which server it needs to work on
const io = require('socket.io')(http)


// whenever a client or browser will connect this method will call 
io.on('connection',(socket)=>{
    console.log('Connected...')

    //here it will listen the request of the client side which it emmited
    socket.on('message',(msg)=>{
        // console.log(msg)
        socket.broadcast.emit('message',msg)
    })
})
