import TaskCard from "./TaskCard.jsx";

export default function Column({ title, tasks }) {
	return (
		<div className="column">
			<div className="column-header">
				<h2>{title}</h2>
			</div>
			<div className="column-tasks">
				{tasks.length === 0 ? (
					<p>No Task</p>
				) : (
					tasks.map((task) => <TaskCard key={task.id} task={task} />)
				)}
			</div>
		</div>
	);
}
