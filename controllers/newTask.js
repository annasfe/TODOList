function newTask(req, res) {
  const task = {
    id: tasks.length + 1,
    description: req.body.description,
  };

  tasks.push(task);
  res.send(`<h3>The task ${task} was saved</h3>`);
}

module.exports = {
  newTask,
};
