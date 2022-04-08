const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

const ejs = require('ejs');
app.use(express.json());
app.set('view engine', 'ejs');



//task creator 
class TaskCreator {
    constructor (id="", content="This is a task", category="-", status="to do", emoji){
        this.id = id;
        this.content = content;
        this.category = category;
        this.status = status;
        this.emoji = emoji;
    }
}


//create an object from tasks
//const allTasks = Object.assign({}, ...allTheTasks);
//tasks array
const allTheTasks = [];
// const completedTasks = [];


function getAllTheTasks (req, res) {
    res.render('index', {allTheTasks: allTheTasks, categoriesArr: categoriesArr});
    console.log(allTheTasks);
}

function createNewTask (req, res) {
    let newId = Date.now()%10000;
    const category = addEmo(categories, req.body.selectcategory);
    if (!req.body.task == "") {
    const task = new TaskCreator(newId, req.body.task, req.body.selectcategory, req.body.status, category);
    allTheTasks.push(task);
    res.redirect('/tasks');
}
    
}



function getTaskById (req, res) {
    
    const reqTask = allTheTasks.filter(item => item.id === parseInt(req.params.id));
    if(reqTask != false) {res.render('task-details', {task: reqTask[0], taskId: req.params.id, categoriesArr: categoriesArr});}
    else {res.render('no-task-id', {taskId: req.params.id, categoriesArr: categoriesArr});}
    
}


function modifyTask (req, res) {
    reqTask = allTheTasks.filter(item => item.id === parseInt(req.params.id));
    if(reqTask != false) {


       
       reqTask[0].content = req.body.task;
       reqTask[0].category = req.body.selectcategory;
       reqTask[0].status = req.body.status;
       res.send(`Task ${req.params.id} changed to: (JSON.stringify(${reqTask[0]},null,2)`); 
    } else {res.render('no-task-id', {taskId: req.params.id, categoriesArr: categoriesArr});}
 
    
    
    
    /*const reqTask = allTheTasks.filter(item => item.id === parseInt(req.params.id));
    if(reqTask != false) {
       reqTask[0].content = req.body.task;
       reqTask[0].category = req.body.selectcategory;
       reqTask[0].status = req.body.status;
       res.send(`Task ${req.params.id} changed to: (JSON.stringify(${reqTask[0]},null,2)`);
    } else {res.send(`There is not a task with ${req.params.id} id.`);}
  */
}


function emptyList (req, res) {
    if (allTheTasks.length >= 1) {
    allTheTasks.splice(0, allTheTasks.length);
    res.redirect('/tasks');
    } 
}



// TO DO: delete completed tasks
/*
function deleteCompleted (req, res) {
    var completeTask = req.body.check;
    

    res.send(console.log(completeTask));
}
*/



///////cat object //****************************************** */

const categories = {
    Category: "",
    Home: '\u{1F3E0}',
    Important: '\u{2757}',
    Grocery: '\u{1F34E}',
    Care: '\u{1F493}',
    Pet: '\u{1F436}', 
    Work: '\u{1F6A7}',
    Birthday: '\u{1F389}',
    Healt: '\u{1F49A}',
    Urgent: '\u{1F4A5}',
    Pinned: '\u{1F4CC}',
    Others: '\u{1F47E}'

}


const categoriesArr = Object.keys(categories);

function addEmo(obj, category) {
    return obj[category];
   
}

//////////////////////////////////************************ */






module.exports = {getAllTheTasks, createNewTask, getTaskById, modifyTask, emptyList};