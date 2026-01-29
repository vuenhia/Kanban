export default function TaskCard({ task }) {
	// Need props from addtask to display user submitted task
	return <div className="task-card">{task.text}</div>;
}
