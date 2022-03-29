import { app, server } from './io.mjs';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3333;

app.get('/', (req, res) => {
	res.send(`<h1>Welcome</h1>`);
});

server.listen(PORT, () => console.log(`Listening to port ${PORT}`));
