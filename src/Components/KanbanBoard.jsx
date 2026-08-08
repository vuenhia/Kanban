import { useState, useEffect } from "react";
import Column from "./Column.jsx";
import AddTask from "./AddTask.jsx";

export default function KanbanBoard() {
	const [tasks, setTasks] = useState({
		toDo: [],
		inProgress: [],
		review: [],
		done: [],
	});

	useEffect(() => {
		const getTask = async () => {
			const response = await fetch("http://localhost:5000/api/tasks");
			const data = await response.json();

			const organizedTasks = {
				toDo: [],
				inProgress: [],
				review: [],
				done: [],
			};
			data.forEach((task) => {
				organizedTasks[task.status].push(task);
			});

			setTasks(organizedTasks);
		};
		getTask();
	}, []);

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	// Drag and Drop
	const [draggedTask, setDraggedTask] = useState(null);
	const [sourceColumn, setSourceColumn] = useState(null);
	const handleDrag = (task, sourceColumn) => {
		setDraggedTask(task);
		setSourceColumn(sourceColumn);
		console.log("Task is " + task.text);
	};

	const handleDrop = async (targetColumn) => {
		if (sourceColumn === targetColumn) {
			setDraggedTask(null);
			setSourceColumn(null);
			return;
		}
		try {
			const response = await fetch(
				`http://localhost:5000/api/tasks/${draggedTask._id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						status: targetColumn,
					}),
				},
			);

			const data = await response.json();

			setTasks((prevTasks) => ({
				...prevTasks,
				[sourceColumn]: prevTasks[sourceColumn].filter(
					(task) => task._id !== draggedTask._id,
				),
				[targetColumn]: [...prevTasks[targetColumn], draggedTask],
			}));
			setDraggedTask(null);
			setSourceColumn(null);
		} catch (error) {
			console.error("Error fetching data", error);
		}
	};
	const handleDelete = async (taskId, columnName) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/tasks/${taskId}`,
				{
					method: "DELETE",
				},
			);

			setTasks((prev) => ({
				...prev,
				[columnName]: prev[columnName].filter((task) => task._id !== taskId),
			}));
		} catch (error) {
			console.error("Error deleting", error);
		}
	};
	const handleEdit = async (taskId, columnName, newText) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/tasks/${taskId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						text: newText,
					}),
				},
			);

			const data = await response.json();
			setTasks((prev) => ({
				...prev,
				[columnName]: prev[columnName].map((task) =>
					task._id === taskId ? data : task,
				),
			}));
		} catch (error) {
			console.error("Error updating task:", error);
		}
	};
	const handleNewTask = async (text) => {
		try {
			const response = await fetch("http://localhost:5000/api/tasks", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					text,
					status: "toDo",
				}),
			});

			const data = await response.json();

			// Update React state with real DB object
			setTasks((prevTasks) => ({
				...prevTasks,
				toDo: [...prevTasks.toDo, data],
			}));
		} catch (error) {
			console.error("Error creating task:", error);
		}
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
