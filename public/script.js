var socket = io();
let btn = document.getElementById('btn');
let inputMsg = document.getElementById('newmsg');
let msgList = document.getElementById('msglist');

// sends message to server
btn.onclick = function exec() {
    socket.emit('msg_send', {
        msg: inputMsg.value,
    })
}
// receives data from server and sends message to all clients
socket.on('msg_received', (data) => {
    const liElement = document.createElement('li');
    liElement.innerText = data.msg;
    msgList.appendChild(liElement)
})