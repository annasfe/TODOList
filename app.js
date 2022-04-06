const port = 8888;
const express = require("express");
const app = express();

let checkList = "localhost:3000";

app.get("/tasks", (req, res) => {
  res.sendFile(__dirname + `/index.html`);
});

app.route("/tasks/:id");
app.get("/", (req, res) => {
  res.send(`<p>${`this is the ${res.body.id} task`}</p>`);
});

app.put("/tasks", (req, res) => {
  res.send(`<p>Update ${res.body.id} task</p>`);
});

app.post("/tasks/:id", (req, res) => {
  res.send(`<h1>Add a new task called ${res.body.id}</h1>`);
});

app.delete("/tasks/:ID", (req, res) => {
  res.send(`<h1>Delete ${res.body.id} task</h1>`);
});

app.listen(port, "localhost", (err) => {
  if (err) {
    return;
  } else {
    console.log(`Server running on port ${port}`);
  }
});
