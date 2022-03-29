const socket = io('localhost:3333');

console.log(socket);

const roomsList = document.querySelector('#rooms-list');
const messagesList = document.querySelector('#messages-list');
const sendMessageForm = document.querySelector('#send-message-form');
const sendMessageInput = document.querySelector('#send-message-input');

socket.on('messageReceived', msg => {
	console.log(msg);
	appendMessage(msg);
});

sendMessageForm.addEventListener('submit', e => {
	e.preventDefault();
	const msg = sendMessageInput.value;

	socket.emit('sendMessage', msg);
});

function appendMessage(msg) {
	const li = document.createElement('li');
	li.textContent = `${msg.id} ${msg.text} ${msg.timestamp}`;
	messagesList.appendChild(li);
}
