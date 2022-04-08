const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

var task = [{id:1, text: "buy socks", completed: false}, {id:2, text:"practise with nodejs", completed:true}];
var complete = [];
let counter = 2;

app.post('/tasks', function (req, res) {
    counter++;
    var newTask = {id: counter, text: req.body.newtask, completed: req.body.completed};
    task.push(newTask);
    res.redirect("/");
});

app.post('/tasks/remove', function(req, res) {
    var completeTask = req.body.check;
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
        counter--;
    } else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {     
        complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
            counter--;
        }
    }
    res.redirect("/");
});

app.post('/tasks/deleteall', function (req, res) {
    //empty the array
    res.redirect("/");
});

app.get('/', function (req, res) {
    res.render("index", { task: task, complete: complete});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});