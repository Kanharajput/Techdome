// routes/todoRoutes.js
const express = require('express');
const Todo = require('../models/todo');

function todoRoutes() {
  const router = express.Router();

  // Middleware to check if the user is an admin
  const isAdmin = (req, res, next) => {
    if (req.user.role === 'Admin') {
      next(); // Allow admin access
    } else {
      res.status(403).json({ message: 'Permission denied' });
    }
  };

  // Create a new todo
  router.post('/create', isAdmin, async (req, res) => {
    try {
      const { title } = req.body;
      if (!title) {
        return res.status(400).json({ message: 'Title is required' });
      }

      const newTodo = await Todo.create({
        title,
        userId: req.user.id,
      });

      res.json(newTodo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Get all todos
  router.get('/getall', isAdmin, async (req, res) => {
    try {
      const todos = await Todo.findAll();
      res.json(todos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Get a single todo by ID
  router.get('/get/:id', isAdmin, async (req, res) => {
    try {
      const todoId = parseInt(req.params.id);
      const todo = await Todo.findOne({
        where: { id: todoId },
      });
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.json(todo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Update a todo by ID
  router.put('/update/:id', isAdmin, async (req, res) => {
    try {
      const todoId = parseInt(req.params.id);
      const updatedTodo = await Todo.findOne({
        where: { id: todoId },
      });

      if (!updatedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      const { title } = req.body;
      if (!title) {
        return res.status(400).json({ message: 'Title is required' });
      }

      updatedTodo.title = title;
      await updatedTodo.save();
      res.json(updatedTodo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Delete a todo by ID
  router.delete('/delete/:id', isAdmin, async (req, res) => {
    try {
      const todoId = parseInt(req.params.id);
      const todo = await Todo.findOne({
        where: { id: todoId },
      });

      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      await todo.destroy();
      res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  return router;
}

module.exports = todoRoutes;
