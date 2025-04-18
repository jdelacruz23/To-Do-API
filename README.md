# To-Do-API

# Todo List Application

A simple Todo List application built with Express.js and SQLite.

## Overview

This project implements a basic Todo List API with a frontend interface. Users can create, view, and delete todo items. The application uses SQLite for data persistence and Express.js for the backend API.

## Features

- Create new todo items with name, priority, and "fun" status
- View all todo items
- View a specific todo item by ID
- Delete todo items
- Persistent storage using SQLite database
- Logging of new todo items to a log file

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: SQLite3
- **Frontend**: HTML, CSS, JavaScript

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/todo-list-app.git
   cd todo-list-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server (use nodemon for easy lyf):
   ```
   nodemon server.js
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Endpoints

- `GET /todos` - Get all todo items
- `GET /todos/:id` - Get a specific todo item by ID
- `POST /todos` - Create a new todo item
- `DELETE /todos/:id` - Delete a todo item

## Project Structure

```
├── server.js           # Main server file
├── public/             # Static files
│   ├── index.html      # Frontend interface
│   ├── styles.css      # CSS styles
│   └── script.js       # Frontend JavaScript
├── todo.db             # SQLite database
└── todo.log            # Log file for new todos
```
