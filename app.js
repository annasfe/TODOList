const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
const tasksController = require("./controllers/tasks.js");
const router1 = require("./routes/tasks");
const router2 = require("./routes/task");
const router3 = require("./routes/newTask");

app.use(express.json());
app.use(express.static("public"));

tasks = [];

app.use;
"/task", router2;
app.use;
"/tasks", router1;
app.use;
"/newTask", router3;

app.get("/", tasksController.loadList);

app.get("/tasks", tasksController.getTasks);

app.get("/task/:id", tasksController.getTakByID);

app.post("/newTask", tasksController.newTask);

app.put("/task/:id", tasksController.checkTask);

app.delete("/task/:id", tasksController.deleteTask);

app.listen(port, "localhost", (err) => {
  if (err) {
    return;
  } else {
    console.log(`Server running on port ${port}`);
  }
});
