// server.js
// A simple Express.js backend for a Todo list API

const express = require('express');
const app = express();
const path = require('path')
const PORT = 3000;
//sqlite3
const sqlite3 = require("sqlite3").verbose();
const fs = require('fs');
  // Create or open the 'todo.db' database.
const toDbName = "todo.db"
const db = new sqlite3.Database(toDbName, (err) => {
  if (err) {
    return console.error("Error opening database:", err.message);
  }
    console.log(`Connected to the ${toDbName} database.`);
});

db.run(`
  CREATE TABLE IF NOT EXISTS todos(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  priority TEXT NOT NULL,
  is_fun INTEGER
  )`, (err) => {
    if (err){
      return console.error("Error creating table: ", err.message)
    }
    console.log("ToDo table created (if it didn't already exist).")
})

// Middleware to parse JSON requests
app.use(express.json());

// TODO ✅  Middleware to include static content from 'public' folder
app.use(express.static(path.join(__dirname, 'public')))
/** not using the one below because express.static is relative to the
 *  directory from where we launch our node process
 * */  
// app.use(express.static('public'))

// In-memory array to store todo items
let todos = [];
let nextId = 1;

// TODO ✅ serve index.html from 'public' at the '/' path
app.get('/', (req, res) => {
  res.sendFile('index.html')
});



// TODO ✅ GET all todo items at the '/todos' path
app.get('/todos', (req, res) => {
  db.all("SELECT * FROM todos", [], (err, rows) => {
    if (err){
      console.error("Error retrieving todos: ", err.message);
      return res.status(500).json({message: "Error retrieving todos!"})
    }
  })
  
  res.json(todos)
})



// GET a specific todo item by ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(item => item.id === id);
  db.get("SELECT * FROM todos WHERE id = ?", [id], (err, row) =>{
    if(err){
      console.error("Error retrieving todo: ", err.message)
      return res.status(500).json({message: "Error retrieving todo"})
    }
  })
  if (todo) {
    res.json(todo);
  } else {
    // TODO ✅ handle 404 status with a message of { message: 'Todo item not found' }
    res.status(404).json({ message: 'Todo item not found' });
  }
});

// POST a new todo item
app.post('/todos', (req, res) => {
  const { name, priority = 'low', isFun } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  const sql = `INSERT INTO todos (name, priority, is_fun) 
               VALUES (?,?,?)`
  db.run(sql, [name, priority, isFun], function(err){
    if(err){
      console.error("Error inserting todo: ", err.message)
      return res.status(500).json({message: "Error saving todo"})
    }
  })

  const newTodo = {
    id: nextId++,
    name,
    priority,
    isComplete: false,
    isFun
  };
  
  todos.push(newTodo);

  // TODO ➡️ Log every incoming TODO item in a 'todo.log' file @ the root of the project
  // In your HW, you'd INSERT a row in your db table instead of writing to file or push to array!
  const logEntry = `${new Date().toISOString()} - Added Todo: ${JSON.stringify(newTodo)}\n`;
  fs.appendFile('todo.log', logEntry, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
  res.status(201).json(newTodo);
});

// DELETE a todo item by ID
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(item => item.id === id);

  if (index !== -1) {
    todos.splice(index, 1);
    res.json({ message: `Todo item ${id} deleted.` });
  } else {
    res.status(404).json({ message: 'Todo item not found' });
  }
});

// Start the server
// TODO ✅ Start the server by listening on the specified PORT
app.listen(PORT, () =>{
  console.log(`Server running on ${PORT}`)
})