const Task = require("../models/Task");

// Get All Tasks
const getTasks = async (req, res) => {
	try {
		const tasks = await Task.find();
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Create Task
const createTasks = async (req, res) => {
	try {
		const task = await Task.create(req.body);
		res.status(201).json(task);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update Task
const updateTasks = async (req, res) => {
	console.log("UPDATE ROUTE HIT");
	console.log("ID:", req.params.id);
	console.log("BODY:", req.body);
	try {
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Delete Task
const deleteTasks = async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);
		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}
		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
module.exports = { getTasks, createTasks, updateTasks, deleteTasks };
