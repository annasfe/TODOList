const path = require("path");
const fs = require("fs");
const tasks = [];

// function loadList(req, res) {
//   items = fs.res.sendFile(path.join(__dirname, "../index.html"));
// }

function getTasks(req, res) {
  res.send(tasks);
}

module.exports = {
  loadList,
  getTasks,
};
