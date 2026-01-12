import React from "react";
import KanbanBoard from "./Components/KanbanBoard.jsx";
import Column from "./Components/Column.jsx";
import TaskCard from "./Components/TaskCard.jsx";
import AddTask from "./Components/AddTask.jsx";
import "./App.css";
export default function App() {
	return (
		<div>
			<div className="header">
				<h1>Kanban Board</h1>
			</div>

			<div className="kanban-board">
				<KanbanBoard />
				<AddTask />
				<div className="kanban-board-information">
					<Column />
					<TaskCard />
				</div>
			</div>
		</div>
	);
}
