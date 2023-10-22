// index.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;
const secretKey = 'your-secret-key';

app.use(bodyParser.json());

// Dummy in-memory database
const users = require('./db/users.json');
const todos = require('./db/todos.json');

app.use('/auth', authRoutes(users, secretKey));
app.use('/todos', authMiddleware(secretKey, users), todoRoutes(todos));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
