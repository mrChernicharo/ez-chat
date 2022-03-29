const socket = io('localhost:3333');
console.log(socket);

const roomsList = document.querySelector('#rooms-list');
const messagesList = document.querySelector('#messages-list');
const sendMessageForm = document.querySelector('#send-message-form');
const sendMessageInput = document.querySelector('#send-message-input');
const roomForm = document.querySelector('#room-form');
const roomInput = document.querySelector('#room-input');

socket.on('connect', () => {
	console.log('connected id', socket.id);
});

socket.on('messageReceived', msg => {
	console.log(msg);
	appendMessage(msg);
});

sendMessageForm.addEventListener('submit', e => {
	e.preventDefault();
	const msg = sendMessageInput.value;
	const room = roomInput.value;

	if (!msg) return;
	appendMessage(msg);

	socket.emit('sendMessage', msg, room);
	sendMessageInput.value = '';
});

roomForm.addEventListener('submit', e => {
	e.preventDefault();
	const room = roomInput.value;
	console.log('join room:', room);
});

function appendMessage(msg) {
	const li = document.createElement('li');
	li.textContent = `${msg}`;
	messagesList.appendChild(li);
}
