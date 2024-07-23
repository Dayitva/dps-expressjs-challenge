import { Router } from 'express';
import db from '../services/db.service';

const router = Router();

router.get('/', async function (req, res) {
	const projects = await read_projects();
	console.log(projects);
	res.json(projects);
});

router.post('/', async function (req, res) {
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

router.put('/', async function (req, res) {
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

router.delete('/', async function (req, res) {
	const id = req.body.id;
	try {
		await delete_project(id);
		res.send('Project deleted successfully!');
	} catch (error) {
		res.send('Error deleting project!');
	}
});

async function read_projects() {
	const sql = 'SELECT * FROM projects';
	const projects = db.query(sql);
	return projects;
}

async function create_project(id: string, name: string, description: string) {
	const sql =
		'INSERT INTO projects (id, name, description) VALUES (@id, @name, @description)';
	const params = { id: id, name: name, description: description };
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

async function delete_project(id: string) {
	const sql = 'DELETE FROM projects WHERE id = @id';
	const params = { id: id };
	const result = db.run(sql, params);
	console.log(result);
}

export default router;
