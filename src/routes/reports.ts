import { Router } from 'express';
import db from '../services/db.service';

const router = Router();

router.get('/', async function (req, res) {
	const reports = await read_reports();
	console.log(reports);
	res.json(reports);
});

router.get('/project/:projectid', async function (req, res) {
	const projectid = req.params.projectid;
	const reports = await read_reports_by_project(projectid);
	console.log(reports);
	res.json(reports);
});

router.post('/', async function (req, res) {
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

router.put('/', async function (req, res) {
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

router.delete('/', async function (req, res) {
	const id = req.body.id;
	try {
		await delete_report(id);
		res.send('Report deleted successfully!');
	} catch (error) {
		res.send('Error deleting report!');
	}
});

router.get('/special', async function (req, res) {
	const reports = await fetch_special_reports();
	console.log(reports);
	res.json(reports);
});

async function fetch_special_reports() {
	interface Report {
		id: string;
		text: string;
		projectid: string;
	}

	const sql = 'SELECT * FROM reports';
	const reports: Report[] = db.query(sql) as Report[];

	const specialReports = reports.filter((report) => {
		const wordCount: Record<string, number> = {};
		const words = report.text.split(/[\s,.!?;:()]+/);
		words.forEach((word) => {
			const cleanWord = word.toLowerCase();
			if (cleanWord) {
				// Check if the word is not empty after trimming punctuation
				if (wordCount[cleanWord]) {
					wordCount[cleanWord]++;
				} else {
					wordCount[cleanWord] = 1;
				}
			}
		});

		console.log(wordCount);

		for (let i = 0; i < words.length; i++) {
			if (wordCount[words[i]] >= 3) {
				return true;
			}
		}

		return false;
	});

	return specialReports;
}

async function read_reports() {
	const sql = 'SELECT * FROM reports';
	const reports = db.query(sql);
	return reports;
}

async function read_reports_by_project(projectid: string) {
	const sql = 'SELECT * FROM reports WHERE projectid = @projectid';
	const params = { projectid: projectid };
	const reports = db.query(sql, params);
	return reports;
}

async function create_report(id: string, text: string, projectid: string) {
	const sql =
		'INSERT INTO reports (id, text, projectid) VALUES (@id, @text, @projectid)';
	const params = { id: id, text: text, projectid: projectid };
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

async function delete_report(id: string) {
	const sql = 'DELETE FROM reports WHERE id = @id';
	const params = { id: id };
	const result = db.run(sql, params);
	console.log(result);
}

export default router;
