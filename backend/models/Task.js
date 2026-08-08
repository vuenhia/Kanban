const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
			trim: true,
		},
		status: {
			type: String,
			enum: ["toDo", "inProgress", "done", "review"],
			default: "toDo",
		},
	},
	{ timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
