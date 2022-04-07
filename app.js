const express = require('express');
const app = express();

app.use(express.json());
const portName = 'localhost';
const port = process.env.PORT || 3000;




//tasks array
const allTheTasks = [];

//task creator 
class TaskCreator {
    constructor (id="", content="One task", category="", status="to do"){
        this.id = id;
        this.content = content;
        this.category = category;
        this.status = status;
    }
}

const task = new TaskCreator(1, 'first task', 'home', 'to do');
allTheTasks.push(task);

app.route('/api/tasks')
    .get((req, res) => {
      res.send(`These are all your tasks: ${getTaskContent(allTheTasks)}`);
      console.log(allTheTasks);
   })
    .post((req, res) => {
      let newId = allTheTasks.length+1;
      const task = new TaskCreator(newId, req.body.content, req.body.category, req.body.status);
    
      allTheTasks.push(task);
      res.send(`Task added!`);
      
 })


app.route('/api/tasks/:id')
   .get((req, res) => {
      const reqTask = allTheTasks.filter(item => item.id === parseInt(req.params.id));
      if(reqTask != false) {res.send(`This is task ${req.params.id}: ${reqTask[0]}`);}
      else {res.send(`There is not a task with ${req.params.id} id.`);}
    
})
    .put((req, res) => {
      const reqTask = allTheTasks.filter(item => item.id === parseInt(req.params.id));
      if(reqTask != false) {
         reqTask[0].content = req.body.content;
         reqTask[0].category = req.body.category;
         reqTask[0].status = req.body.status;
         res.send(`Task ${req.params.id} changed to: ${reqTask[0]}`);
      } else {res.send(`There is not a task with ${req.params.id} id.`);}
    
 })
 
    .delete((req, res) => {
      const reqTask = allTheTasks.filter(item => item.id === parseInt(req.params.id));
      if(reqTask != false) {
         allTheTasks.splice(allTheTasks.indexOf(reqTask),1);
         res.send(`Task ${req.params.id} deleted!`);
      } else {res.send(`There is not a task with ${req.params.id} id.`);}
}) 


function getTaskContent(arr) {
   let allTask = [];
   for (let i = 0; i < arr.length; i++) {
      allTask.push(arr[i].content);
   }
   return allTask;
}


//////
app.listen(port, (err) => {
      if (err) console.log(err);
      console.log(`Server running on port ${port}...`);
   })
