const express = require('express');
const app = express();

app.get('/tasks', (req, res) => {
  res.send("Checking all tasks");
});

app.get('/tasks/:id', (req, res) => {
  res.send("Checking tasks by id");
});

app.get('/tasks/pending', (req, res) => {
  res.send("Checking only pending tasks");
});

app.post('/tasks', (req, res) => {
  res.send("Posting a new task");
});

app.delete('/tasks/completed/', (req, res) => {
  res.send("Deleting all completed tasks");
});

app.delete('/tasks/:id', (req, res) => {
  res.send("Deleting task with this id");
});

const port = 3000;
const hostname = 'localhost';

app.listen(port, hostname, (err) => {
  if (err) {
    return console.log("Something went wrong: " + err);
  } else {
    console.log(`Server running on port ${port}...`)
  }
})