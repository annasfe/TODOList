const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

var task = [{id:1, text: "buy socks", completed: false}, {id:2, text:"practise with nodejs", completed:false}];

app.post('/tasks', function (req, res) {
    var newTask = {id: Date.now(), text: req.body.newtask, completed: false};
    task.push(newTask);
    res.redirect("/");
});

app.post('/tasks/remove', function(req, res) {

    var completeTask = req.body.check;

    //TODO: REFACTOR - find some more clever way that the double for, maybe filter or reduce
    if(completeTask.length) {
        for (var i = 0; i < completeTask.length; i++) {
            for(var j=0; j<task.length; j++) {
                if(parseInt(completeTask[i]) === task[j].id)
                    task.splice(j,1);
            }
        }
    }

    res.redirect("/");
});

app.post('/tasks/deleteall', function (req, res) {
    task.splice(0, task.length);
    res.redirect("/");
});

app.get('/', function (req, res) {
    res.render("index", { task: task});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});