const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/taskRoutes");

//Initialize environment + database
dotenv.config();
connectDb();
const app = express();

//Middleware

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => {
	res.send("Server response");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
