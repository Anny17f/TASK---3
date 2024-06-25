const express = require('express');
const app = express();
const uuid = require('uuid');

// Initialize task array
let tasks = [];

// Create a new task
app.post('/tasks', (req, res) => {
  const { title, body } = req.body;
  const newTask = {
    id: uuid.v4(),
    title,
    body,
    status: 'pending'
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Get a single task by ID
app.get('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    res.json(task);
  }
});

// Update a task
app.patch('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const { title, body, status } = req.body;
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    task.title = title;
    task.body = body;
    task.status = status;
    res.json(task);
  }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    tasks.splice(index, 1);
    res.status(204).json({});
  }
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});