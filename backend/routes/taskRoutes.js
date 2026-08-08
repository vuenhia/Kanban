const express = require("express");
const router = express.Router();
const {
	getTasks,
	createTasks,
	updateTasks,
	deleteTasks,
} = require("../controllers/taskController");

router.get("/", getTasks);
router.post("/", createTasks);
router.put("/test", (req, res) => {
	console.log("🔥 PUT TEST HIT");
	res.json({ message: "PUT works" });
});
router.put("/:id", updateTasks);
router.delete("/:id", deleteTasks);
module.exports = router;
