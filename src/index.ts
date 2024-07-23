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

app.post('/create_project', function (req, res) {
	const id = req.body.id;
	const name = req.body.name;
	const description = req.body.description;
	try {
		create_project(id, name, description);
		res.send('Project created successfully!');
	} catch (error) {
		res.send('Error creating project!');
	}
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

async function create_project(id: string, name: string, description: string) {
	const sql =
		'INSERT INTO projects (id, name, description) VALUES (@id, @name, @description)';
	const params = { id: id, name: name, description: description };
	const result = db.run(sql, params);
	console.log(result);
}
