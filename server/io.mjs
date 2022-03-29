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

	socket.on('sendMessage', data => {
		console.log(socket.id, ' sent message ', data);

		// socket.broadcast.emit('SERVER_BROADCAST_MESSAGE', data); // send to all but me
		io.emit('messageReceived', {
			id: socket.id,
			text: data,
			timestamp: getTimestamp(),
		}); // send to all
	});

	socket.on('disconnect', () => {
		console.log(`socket ${socket.id} disconnected`);
	});
});

export { app, io, server };
