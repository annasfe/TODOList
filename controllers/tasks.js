const path = require("path");
const fs = require("fs");

const tasks = [{ id: 1, checked: true, description: "drink water" }];

function loadList(req, res) {
  res.sendFile(path.join(__dirname, "../index.html"));
}

function getTasks(req, res) {
  res.send(tasks);
}

function getTaskByID(req, res) {
  const task = tasks.find((c) => c.id === parseInt(req.params.id));
  if (!tasks) {
    res.status(404).send("The task with the given ID does not exist.");
    res.sendStatus(task);
  }
}

function deleteTask(req, res) {
  const task = tasks.find((c) => c.id === parseInt(req.params.id));
  const index = tasks.indexOf(task);
  tasks.splice(index, 1);

  res.send(`<h3>The task ${req.body.id} was deleted</h3>`);
}

function checkTask(req, res) {
  const task = tasks.find((c) => c.id == req.params.id);
  if (!task) {
    res.status(404).send("The task with the given ID does not exist.");
  }
  console.log(req.body);

  const index = tasks.indexOf(task);
  tasks.splice(index, 1, {
    ...task,
    checked: req.body.checked,
  });
  console.log(tasks);

  res.send(`<h3>The task ${req.params.id} was updated</h3>`);
}

function newTask(req, res) {
  const newID = tasks.length + 1;
  const task = {
    id: newID,
    description: req.body.description,
  };

  tasks.push(task);
  res.status(200).send(newID.toString());
}

module.exports = {
  loadList,
  getTaskByID,
  deleteTask,
  checkTask,
  getTasks,
  newTask,
};
