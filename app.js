const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
const path = require("path");
app.use(express.json());
app.use(express.static("public"));
const tasks = [
  { id: 1, description: "clean the floor" },
  { id: 2, description: "make dinner" },
  { id: 3, description: "buy tickets" },
];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tasks", (req, res) => {
  res.send(tasks);
});

app.get("/task/:id", (req, res) => {
  const task = tasks.find((c) => c.id === parseInt(req.params.id));
  if (!tasks) {
    res.status(404).send("The task with the given ID does not exist.");
    res.sendStatus(task);
  }
});

app.post("/new-task", (req, res) => {
  const task = {
    id: tasks.length + 1,
    description: req.body.description,
  };

  tasks.push(task);
  res.send(`<h3>The task ${task} was saved</h3>`);
});

app.put("/task/:id", (req, res) => {
  const task = tasks.find((c) => c.id === parseInt(req.params.id));
  if (!task) {
    res.status(404).send("The task with the given ID does not exist.");
  }
  res.send(`<h3>The task ${req.body.id} was updated</h3>`);
  task.description = req.body.description;
  res.send(task);
});

app.delete("/task/:id", (req, res) => {
  const task = tasks.find((c) => c.id === parseInt(req.params.id));
  const index = tasks.indexOf(task);
  tasks.splice(index, 1);

  res.send(`<h3>The task ${req.body.id} was deleted</h3>`);
});

app.listen(port, "localhost", (err) => {
  if (err) {
    return;
  } else {
    console.log(`Server running on port ${port}`);
  }
});
