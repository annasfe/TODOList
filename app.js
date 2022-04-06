const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("Empty homepage");
});

app.get('/tasks', (req, res) => {
  res.send("Checking all tasks");
});

app.get('/tasks/:id', (req, res) => {
  res.send("Checking tasks by id");
});

app.get('/tasks/:status', (req, res) => {
  res.send("Checking tasks by status");
});

app.post('/tasks', (req, res) => {
  res.send("Posting new task");
});

app.delete('/tasks/:id', (req, res) => {
  res.send("Delete task by id");
});

app.delete('/tasks/:status', (req, res) => {
  res.send("Posting task");
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