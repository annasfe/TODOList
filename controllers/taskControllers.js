const fs = require('fs');
const ejs = require('ejs');

const taskDatabaseJSON = fs.readFileSync('public/storage.json')
const taskJson = JSON.parse(taskDatabaseJSON) // convert in JSON format


function getAllTasks(req, res) { //access all tasks
     if (taskJson) {
        console.log(taskJson)
        return res.render('index', { tasksArray: taskJson})
        // return res.send(taskJson)
    } return res.send("No task yet")
    // res.render('index', { tasksArray: taskDatabase });
    }

function createTask(req, res) { 
    if (req.body.action) {
        let newEntry = {
            id: Date.now(),
            action: req.body.action,
            status: "todo"
        }
    
        taskJson.push(newEntry);
        const newData = JSON.stringify(taskJson) //back to row format
        fs.writeFile("public/storage.json", newData, (err) => {
            if (err) throw err;
                console.log("  New data added");
            });
        res.status(200)  
        res.redirect('/tasks');
    } res.end()
}

function getTask(req, res) {
       const task = taskJson.filter(element => element.id === parseInt(req.params.id));
    if (task) {
        console.log(task)
        return res.send(task);
    } return res.send(`The task with id:${req.params.id} doesn't exist`)
     } 

function updateTask(req, res) { 
        let index = taskJson.findIndex( element => element.id === parseInt(req.params.id))
        taskJson[index].status = req.body.status || taskJson[index].status
        taskJson[index].action = req.body.action || taskJson[index].action
        const newData = JSON.stringify(taskJson)
        fs.writeFile("public/storage.json",newData, (err) => {
            if (err) throw err;
                console.log("Data updated");
            });
        res.send(`Task ${req.params.id} has been updated`);

    }

function deleteTask(req, res) { 
        let index = taskJson.findIndex( element => element.id === parseInt(req.params.id))
        console.log(taskJson[0])
        console.log(index)
        if (index || index === 0) {
            taskJson.splice(index, 1)
            const newData = JSON.stringify(taskJson)
            fs.writeFile("public/storage.json", newData, (err) => {
                if (err) throw err;
                    console.log("Data deleted");
                });
            return res.redirect('/tasks');
        } return res.send("This task doesn't exist")
    }


// not working nor used for now    
function deleteByStatus(req, res) { 
    let filterArray = taskDatabase.filter((element) => {toString(element.status) !== toString(req.params.status)})
    taskDatabase = filterArray

    // taskDatabase.forEach(function(elem) {
    //     if(elem.status === req.query.status) {
    //         taskDatabase.splice(taskDatabase.indexOf(elem), 1);
    //     }
    // })    

    return res.send(`All ${req.params.status} have been removed from the list`);
}

module.exports = {getAllTasks, createTask, getTask, updateTask, deleteTask, taskJson, taskDatabaseJSON}