//const { ObjectId } = require('mongodb');
let Task = require('../models/taskModel')

async function createTask(req, res) {

    try{
        const task = await Task.create({task: req.body.newtask});
        res.redirect("/");
    }catch(err) {
        console.error(err.message);
     }
    
    //  //with promise      
    //   task.save()
    //      .then(task => {
    //        console.log(task)
    //        res.redirect("/");
    //      })
    //      .catch(err => {
    //        console.error(err)
    //      })      
};

function removeTask(req, res) {

    var completeTask = req.body.check;

    if(typeof(completeTask)=="object") {        //if more than one tasks selected, then we deal with array     
        for (var i = 0; i < completeTask.length; i++) {

            Task.deleteOne( {_id: completeTask[i]}, function (error){
                if (error) console.log(error);
                res.redirect("/");
            });
        }
    }
    else {
        Task.deleteOne( {_id: completeTask}, function(error){
            if (error) console.log(error);
            res.redirect("/");
        });
    }
};

function deleteAll(req, res) {
    Task.deleteMany({})
    .then(() => {
        res.redirect("/");
    })
    .catch(error => {
        console.log(error);
        next(error);
    });
};

function getTasks(req, res) {
    Task.find().sort('task').limit(10)
    .then(task => {
        console.log(task);
        res.render( 'index', {task : task});
      })
    .catch(error => {
        console.log(error);
        next(error);
    });
};

module.exports = {getTasks, deleteAll, removeTask, createTask}