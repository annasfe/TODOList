const express = require('express')
const app = express()
let ejs = require('ejs');
app.use(express.json())

const port = 3000
const hostName = 'localhost'

app.listen(port, hostName, (err) => {
    if (err) console.log("Something went wrong " + err );
    else console.log(`Server running on port ${port}...`);
})


//Database

let taskDatabase = []; //will include all typicalEntries
let idCounter = 0 // to assign IDs

// let typicalEntry = {
//    id: //number for each new entry it will be = counter +1
//    action: //plain text of the task
//    status: //automatically set to TODO but with further action (PUT) could be modify
//}

//TODO : 
    //Get /tasks => display all task entry in taskDatabase
    //Post /tasks => create typicalEntry with the correct data to assign to each property of the typical object entry and push it to taskDatabase
    //Delete /tasks => remove typicalEntry from the taskDatabase

//TODO : at some point use JSON or to stringify ?

//TODO : add verification to ensure that id comparaison is on the same format (two numbers)


// '/tasks/' endpoint
app.route('/tasks')
    .get((req, res) => {
        res.send(taskDatabase);
    }) //access all tasks

    .post((req, res) => {
        let newEntry = {
            id: idCounter+1,
            action: req.body.action,
            status: "todo"
        }

        taskDatabase.push(newEntry)
        res.redirect('/tasks');
    }); //create new task


// '/tasks/:id' endpoint
app.route('/tasks/:id')
    .get((req, res) => {
        res.send(taskDatabase.filter(element => element.id === req.params.id));
    }) //access specific tasks

    .put((req, res) => {
        let index = taskDatabase.findIndex( element => element.id === req.params.id)
        taskDatabase[index].status = req.body.status
        taskDatabase[index].action = req.body.action
        res.send(`Task ${req.params.id} has been updated`);

    }) //update specific tasks

    .delete((req, res) => {
        let index = taskDatabase.findIndex( element => element.id === req.params.id)
        taskDatabase.splice(index, 1)
        res.send(`Task ${req.params.id} has been deleted`);
    }); //supress specific tasks

// /tasks/:status
app.delete('/tasks/:status', (req, res) => {
    taskDatabase.forEach(function(elem) {
        if(elem.status === req.params.status) {
            taskDatabase.splice(taskDatabase.indexOf(elem), 1);
        }
    })    

    res.send(`All ${req.params.status} have been removed from the list`);
}); // remove all tasks from specific status

