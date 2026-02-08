import { useState } from "react";

export default function TaskCard({
	task,
	handleDrag,
	columnName,
	handleDelete,
	handleEdit,
}) {
	const [isDragging, setIsDragging] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(task.text);

	const handleDragStart = () => {
		setIsDragging(true);
		handleDrag(task, columnName);
	};

	const handleDragEnd = () => {
		setIsDragging(false);
	};

	return (
		<div
			className={`task-cards ${isDragging ? "dragging" : ""}`}
			draggable={true}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			<div className="task-text">
				{isEditing ? (
					<input
						value={editText}
						onChange={(e) => setEditText(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								handleEdit(task.id, columnName, editText);
								setIsEditing(false);
							}
						}}
						onBlur={() => {
							handleEdit(task.id, columnName, editText);
							setIsEditing(false);
						}}
						autoFocus
					/>
				) : (
					<div onDoubleClick={() => setIsEditing(true)}>{task.text}</div>
				)}
			</div>

			<div className="task-actions">
				<button
					className="task-cards-delete-btn"
					onClick={() => handleDelete(task.id, columnName)}
				>
					Delete
				</button>
			</div>
		</div>
	);
}
