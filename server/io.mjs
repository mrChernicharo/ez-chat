import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { getTimestamp } from './utils/helpers.mjs';

dotenv.config();
// const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

io.on('connection', socket => {
	console.log('a user connected ', socket.id);

	io.emit('connected', {
		serverMessage: socket.id + ' has connected',
	});

	socket.on('sendMessage', (message, room) => {
		console.log(socket.id, ' sent message ', message);

		if (room) {
			console.log('room: ', room);
			socket.to(room).emit('messageReceived', message);
		} else {
			console.log('everyone');
			socket.broadcast.emit('messageReceived', message);
			// io.emit('messageReceived', message);
		}
	});

	socket.on('disconnect', () => {
		console.log(`socket ${socket.id} disconnected`);
	});
});

export { app, io, server };
