import React from "react";
import Column from "./Column.jsx";
import AddTask from "./AddTask.jsx";

export default function KanbanBoard() {
	const [tasks, setTasks] = React.useState({
		toDo: [],
		inProgress: [],
		review: [],
		done: [],
	});

	const handleNewTask = (newTask) => {
		setTasks((prevTasks) => ({
			...prevTasks,
			toDo: [...prevTasks.toDo, newTask],
		}));
	};

	return (
		<div>
			<AddTask handleNewTask={handleNewTask} />

			<div className="kanban-board-grid">
				<Column title="To Do" tasks={tasks.toDo} />
				<Column title="In Progress" tasks={tasks.inProgress} />
				<Column title="Review" tasks={tasks.review} />
				<Column title="Done" tasks={tasks.done} />
			</div>
		</div>
	);
}
