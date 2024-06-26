const express = require('express');
const { v4: uuidv4 } = require('uuid'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const tasks = [];
let idCounter = 1;

app.post('/tasks', (req, res) => {
  const { title, body } = req.body;
  const newTask = {
    id: idCounter++,  // Use a numeric counter or uuid
    title,
    body,
    status: 'pending', 
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get('/tasks/', (req, res) => {
  res.json(tasks);
});

// Get a task by ID
app.get('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const foundTask = tasks.find((task) => task.id === parseInt(id, 10)); // Convert id to integer
  if (!foundTask) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(foundTask);
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const foundTask = tasks.find((task) => task.id === parseInt(id, 10)); // Convert id to integer
  if (!foundTask) {
    return res.status(404).json({ message: 'Task not found' });
  }
  foundTask.title = title;
  foundTask.body = body;
  res.json(foundTask);
});

// Update task status
app.patch('/tasks/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const foundTask = tasks.find((task) => task.id === parseInt(id, 10)); // Convert id to integer
  if (!foundTask) {
    return res.status(404).json({ message: 'Task not found' });
  }
  foundTask.status = status;
  res.json(foundTask);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id, 10)); // Convert id to integer
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks.splice(taskIndex, 1);
  res.json({ message: 'Task removed successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
