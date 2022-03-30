const socket = io('localhost:3333');
console.log(socket);

const appState = {
	user: '',
	currentRoom: '',
	rooms: []
}

const chatRoom = document.querySelector('#chat-room')
const chatCloseBtn = document.querySelector('#chat-close-btn')
const chatRoomTitle = document.querySelector('#chat-room-title')
const roomsList = document.querySelector('#rooms-list');
const messagesList = document.querySelector('#messages-list');
const sendMessageForm = document.querySelector('#send-message-form');
const sendMessageInput = document.querySelector('#send-message-input');
const roomForm = document.querySelector('#room-form');
const roomInput = document.querySelector('#room-input');

socket.on('connect', () => {
	console.log('connected id', socket.id);
	appState.rooms.push(socket.id);
	appState.user = socket.id;
	appendRoom(socket.id);
});

socket.on('messageReceived', msg => {
	console.log(msg);
	appendMessage(msg);
});

sendMessageForm.addEventListener('submit', e => {
	e.preventDefault();
	const msg = sendMessageInput.value;

	if (!msg) return;
	appendMessage(msg);

	socket.emit('sendMessage', msg, appState.currentRoom);
	sendMessageInput.value = '';
});

roomForm.addEventListener('submit', e => {
	e.preventDefault();
	const room = roomInput.value;

	console.log('join room:', room);
	socket.emit('joinRoom', room, appendMessage)
	socket.emit('loadRooms', loadRooms)
});

chatCloseBtn.addEventListener('click', e => {
	chatRoom.classList.toggle('closed');
})

function appendMessage(msg) {
	const li = document.createElement('li');
	li.textContent = `${msg}`;
	messagesList.appendChild(li);
}

function loadRooms(rooms) {
	appState.rooms = [...rooms]
	console.log(appState)

	roomsList.innerHTML = '';
	rooms.forEach(room => {
		appendRoom(room)
	})
}

function appendRoom(room) {
	const li = document.createElement('li')
	li.textContent = `${room}`;
	li.addEventListener('click', e => {
		enterRoom(room)
	})
	roomsList.appendChild(li)
}

function enterRoom(room) {
	if (appState.currentRoom === room) {
		chatRoom.classList.toggle('closed');
	} else {
		chatRoom.classList.remove('closed');
		appState.currentRoom = room
		chatRoomTitle.textContent = room;
	}

}