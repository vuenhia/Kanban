import TaskCard from "./TaskCard.jsx";

export default function Column({
	title,
	tasks,
	handleDrag,
	columnName,
	handleDrop,
	handleDelete,
	handleEdit,
}) {
	const handleDragOver = (e) => {
		e.preventDefault();
	};

	return (
		<div
			className="column"
			draggable={false}
			onDragOver={handleDragOver}
			onDrop={() => handleDrop(columnName)}
		>
			<div className="column-header" draggable={false}>
				<h2 draggable={false}>{title}</h2>
			</div>

			{tasks.length === 0 ? (
				<div className="column-task-header" draggable={false}>
					<p draggable={false}>No Task</p>
				</div>
			) : (
				<div className="column-task-card" draggable={false}>
					{tasks.map((task) => (
						<TaskCard
							key={task.id}
							task={task}
							handleDrag={handleDrag}
							columnName={columnName}
							handleDelete={handleDelete}
							handleEdit={handleEdit}
						/>
					))}
				</div>
			)}
		</div>
	);
}
