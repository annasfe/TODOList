const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
const tasksController = require("./controllers/tasks.js");
const routerTasks = require("./routes/tasks");

app.use(express.json());
app.use(express.static("public"));

tasks = [];
app.use(express.urlencoded({ extended: true }));

app.use("/", routerTasks);

// app.get("/", tasksController.loadList);

routerTasks.get(tasksController.loadList);

routerTasks.get(tasksController.getTasks);

routerTasks.get(tasksController.getTaskByID);

routerTasks.post(tasksController.newTask);

routerTasks.put(tasksController.checkTask);

routerTasks.delete(tasksController.deleteTask);

app.listen(port, "localhost", (err) => {
  if (err) {
    return;
  } else {
    console.log(`Server running on port ${port}`);
  }
});
