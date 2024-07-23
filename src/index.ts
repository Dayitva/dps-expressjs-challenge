import express, { Express } from 'express';
import dotenv from 'dotenv';
import db from './services/db.service';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get('/', function (req, res) {
	res.send('API is working properly!');
});

app.get('/read_projects', function (req, res) {
	read_projects();
	res.send('API is working properly!');
});

app.get('/read_reports', function (req, res) {
	read_reports();
	res.send('API is working properly!');
});

async function read_projects() {
	const sql = 'SELECT * FROM projects';
	const projects = db.query(sql);
	console.log(projects);
}

async function read_reports() {
	const sql = 'SELECT * FROM reports';
	const reports = db.query(sql);
	console.log(reports);
}
