import "./App.css";
import KanbanBoard from "./Components/KanbanBoard.jsx";
export default function App() {
	return (
		<div>
			<div className="header">
				<h1>Kanban Board</h1>
			</div>

			<div className="kanban-board">
				<KanbanBoard />
			</div>
		</div>
	);
}
