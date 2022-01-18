const socket = io('http://localhost:3000');

$(document).ready(function () {
    $('.chat-icon').click(function (event) {
        $('.chat-box').toggleClass('active')
    })
})

var form = document.getElementById('send-container')
var mssgInput = document.getElementById('messageInput')
var mssgContainer = document.getElementById('container');

console.log(form)
console.log(mssgInput)
console.log(mssgContainer)
socket.emit('new-user-joined',dentalmaniac)