const express = require('express')
const app = express()
const hostname = 'localhost';
const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })


app.route('/tasks')
    .get((req, res) => {
    res.send(`<html> <head> <title> Todo List </title> </head> <body><h1>All the tasks</h1>`)
})

    .post((req, res) => {
    console.log(req.body.task)
    res.send('New task received, thanks!');
 })


 
 app.route('/tasks/:id')
 
    .get((req, res) => {
    let id = req.params.id
    res.send(`<html> <head> <title> Todo List</title> </head> <body><h1>/This is task ${id}</h1>`)
 })
    .put((req, res) => {
    let id = req.params.id
    res.send(`<html> <head> <title> Todo List</title> </head> <body><h1>/Modified task ${id}</h1>`)
 })
 
    .delete((req, res) => {
    let id = req.params.id
    res.send(`<html> <head> <title> Todo List</title> </head> <body><h1>/Deleted task ${id}</h1>`)
     })


