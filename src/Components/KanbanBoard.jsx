import { useState, useEffect } from "react";
import Column from "./Column.jsx";
import AddTask from "./AddTask.jsx";

export default function KanbanBoard() {
	const [tasks, setTasks] = useState(() => {
		const saved = localStorage.getItem("tasks");
		return saved
			? JSON.parse(saved)
			: {
					toDo: [],
					inProgress: [],
					review: [],
					done: [],
				};
	});

	useEffect(() => {
		const saved = localStorage.getItem("tasks");
		if (saved) {
			setTasks(JSON.parse(saved));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	const handleDelete = (taskId, columnName) => {
		setTasks((prev) => ({
			...prev,
			[columnName]: prev[columnName].filter((task) => task.id !== taskId),
		}));
	};

	const handleEdit = (taskId, columnName, newText) => {
		setTasks((prev) => ({
			...prev,
			[columnName]: prev[columnName].map((task) =>
				task.id === taskId ? { ...task, text: newText } : task,
			),
		}));
	};
	// Drag and Drop
	const [draggedTask, setDraggedTask] = useState(null);
	const [sourceColumn, setSourceColumn] = useState(null);
	const handleDrag = (task, sourceColumn) => {
		setDraggedTask(task);
		setSourceColumn(sourceColumn);
		console.log("Task is " + task.text);
	};

	const handleDrop = (targetColumn) => {
		if (sourceColumn === targetColumn) {
			setDraggedTask(null);
			setSourceColumn(null);
			return;
		}

		setTasks((prevTasks) => ({
			...prevTasks,
			[sourceColumn]: prevTasks[sourceColumn].filter(
				(task) => task.id !== draggedTask.id,
			),
			[targetColumn]: [...prevTasks[targetColumn], draggedTask],
		}));
		setDraggedTask(null);
		setSourceColumn(null);
	};

	const handleNewTask = (newTask) => {
		setTasks((prevTasks) => ({
			...prevTasks,
			toDo: [...prevTasks.toDo, newTask],
		}));
	};
	// Drag and drop

	return (
		<div>
			<AddTask handleNewTask={handleNewTask} />

			<div className="kanban-board-grid">
				<Column
					title="To Do"
					columnName="toDo"
					tasks={tasks.toDo}
					handleDrag={handleDrag}
					handleDrop={handleDrop}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
				/>
				<Column
					title="In Progress"
					columnName="inProgress"
					tasks={tasks.inProgress}
					handleDrag={handleDrag}
					handleDrop={handleDrop}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
				/>
				<Column
					title="Review"
					columnName="review"
					tasks={tasks.review}
					handleDrag={handleDrag}
					handleDrop={handleDrop}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
				/>
				<Column
					title="Done"
					columnName="done"
					tasks={tasks.done}
					handleDrag={handleDrag}
					handleDrop={handleDrop}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
				/>
			</div>
		</div>
	);
}
