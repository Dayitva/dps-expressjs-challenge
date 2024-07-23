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

app.post('/create_project', async function (req, res) {
	const id = req.body.id;
	const name = req.body.name;
	const description = req.body.description;
	try {
		await create_project(id, name, description);
		res.send('Project created successfully!');
	} catch (error) {
		res.send('Error creating project!');
	}
});

app.post('/create_report', async function (req, res) {
	const id = req.body.id;
	const text = req.body.text;
	const projectid = req.body.projectid;
	try {
		await create_report(id, text, projectid);
		res.send('Report created successfully!');
	} catch (error) {
		res.send('Error creating report!');
	}
});

app.put('/update_project', async function (req, res) {
	const id = req.body.id;
	const name = req.body.name;
	const description = req.body.description;
	try {
		await update_project(id, name, description);
		res.send('Project updated successfully!');
	} catch (error) {
		res.send('Error updating project!');
	}
});

app.put('/update_report', async function (req, res) {
	const id = req.body.id;
	const text = req.body.text;
	const projectid = req.body.projectid;
	try {
		await update_report(id, text, projectid);
		res.send('Report updated successfully!');
	} catch (error) {
		res.send('Error updating report!');
	}
});

app.delete('/delete_project', async function (req, res) {
	const id = req.body.id;
	try {
		await delete_project(id);
		res.send('Project deleted successfully!');
	} catch (error) {
		res.send('Error deleting project!');
	}
});

app.delete('/delete_report', async function (req, res) {
	const id = req.body.id;
	try {
		await delete_report(id);
		res.send('Report deleted successfully!');
	} catch (error) {
		res.send('Error deleting report!');
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

async function create_report(id: string, text: string, projectid: string) {
	const sql =
		'INSERT INTO reports (id, text, projectid) VALUES (@id, @text, @projectid)';
	const params = { id: id, text: text, projectid: projectid };
	const result = db.run(sql, params);
	console.log(result);
}

async function update_project(id: string, name: string, description: string) {
	const sql =
		'UPDATE projects SET name = @name, description = @description WHERE id = @id';
	const params = { id: id, name: name, description: description };
	const result = db.run(sql, params);
	console.log(result);
}

async function update_report(id: string, text: string, projectid: string) {
	const sql =
		'UPDATE reports SET text = @text WHERE id = @id AND projectid = @projectid';
	const params = { id: id, text: text, projectid: projectid };
	const result = db.run(sql, params);
	console.log(result);
}

async function delete_project(id: string) {
	const sql = 'DELETE FROM projects WHERE id = @id';
	const params = { id: id };
	const result = db.run(sql, params);
	console.log(result);
}

async function delete_report(id: string) {
	const sql = 'DELETE FROM reports WHERE id = @id';
	const params = { id: id };
	const result = db.run(sql, params);
	console.log(result);
}
