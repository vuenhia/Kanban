import { useState } from "react";

export default function AddTask({ handleNewTask }) {
	const [taskInput, setTaskInput] = useState("");
	const [clicked, setClicked] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (taskInput.trim()) {
			handleNewTask({
				id: Date.now(),
				text: taskInput,
			});
			(setTaskInput(""), setClicked(false));
		}
	};

	const handleCancel = () => {
		setTaskInput("");
		setClicked(false);
	};
	return (
		<div className="add-task">
			{!clicked ? (
				<span className="add-Task-Clickable" onClick={() => setClicked(true)}>
					Add New Task
				</span>
			) : (
				<div className="add-task-submit">
					<form onSubmit={handleSubmit}>
						<textarea
							className="add-task-input"
							type="text"
							onChange={(e) => setTaskInput(e.target.value)}
							placeholder="Add Task"
							value={taskInput}
							onKeyDown={(e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									handleSubmit(e);
								}
							}}
						/>
						<div className="add-task-buttons">
							<button type="submit">Submit</button>
							<button type="button" onClick={handleCancel}>
								Cancel
							</button>

							{console.log(taskInput)}
						</div>
					</form>
				</div>
			)}
		</div>
	);
}
