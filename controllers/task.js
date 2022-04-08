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
  const task = tasks.find((c) => c.id === parseInt(req.params.id));
  if (!task) {
    res.status(404).send("The task with the given ID does not exist.");
  }
  if (task.status === done) {
    //   add class done
  }
  res.send(`<h3>The task ${req.body.id} was updated</h3>`);
  task.description = req.body.description;
  res.send(task);
}

module.exports = {
  getTaskByID,
  deleteTask,
  checkTask,
};
