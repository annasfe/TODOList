
var task = [{id:1, text: "buy socks", completed: false}, {id:2, text:"practise with nodejs", completed:false}];

function createTask(req, res) {
    var newTask = {id: Date.now(), text: req.body.newtask, completed: false};
    task.push(newTask);
    res.redirect("/");
};

function removeTask(req, res) {

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
};

function deleteAll(req, res) {
    task.splice(0, task.length);
    res.redirect("/");
};

function getTasks(req, res) {
    res.render("index", { task: task});
};

module.exports = {getTasks, deleteAll, removeTask, createTask}