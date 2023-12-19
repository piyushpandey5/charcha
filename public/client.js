const socket = io()

let name;

let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

do{
    name = prompt('Please Enter your name: ')
}while(!name)

textarea.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
})

function sendMessage(message){
    let msg = {
        user: name,
        message: message.trim()
    }

    // Append message

    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server
    // this will send the message to server which then broadcast to the desired clients
    socket.emit('message',msg)
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type;
    mainDiv.classList.add(className,'message')

    // here markup means the elements which is inside the outgoing or incoming message div
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}


// Recieves the data/message coming from the server which has been broadcast for now
// here the 'message' is which is broadcasted or emited by the server
socket.on('message',(msg)=>{
    // console.log(msg)
    appendMessage(msg, 'incoming')
    scrollToBottom()
})


function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}