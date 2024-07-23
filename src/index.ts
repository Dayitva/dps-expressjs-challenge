import express, { Express } from 'express';
import dotenv from 'dotenv';

import projects from './routes/projects';
import reports from './routes/reports';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function authenticate(req: any, res: any, next: any) {
	const token = req.headers['authorization'];

	if (!token) {
		return res.status(403).send('A token is required for authentication');
	}

	if (token !== 'Password123') {
		return res.status(401).send('Invalid token');
	}

	next();
}

app.use(authenticate);

app.use('/projects', projects);
app.use('/reports', reports);

app.get('/', function (req, res) {
	res.send('API is working properly!');
});
