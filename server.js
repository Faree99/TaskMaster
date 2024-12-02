const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// MongoDB connection (MongoDB Atlas or local MongoDB)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error: " + err));

// Task schema and model
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  deadline: Date,
  userId: mongoose.Schema.Types.ObjectId,
});

const Task = mongoose.model('Task', taskSchema);

// User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Middleware for protecting routes
const protect = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// Routes for registration and login
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: 'User registered' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Routes for Task management
app.post('/api/tasks', protect, async (req, res) => {
  const { title, description, priority, deadline } = req.body;
  const task = new Task({
    title,
    description,
    priority,
    deadline,
    userId: req.user.id,
  });
  await task.save();
  res.status(201).json(task);
});

// Get tasks for the logged-in user
app.get('/api/tasks', protect, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

// Update task
app.put('/api/tasks/:id', protect, async (req, res) => {
  const { title, description, priority, deadline } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
    title, description, priority, deadline
  }, { new: true });
  res.json(updatedTask);
});

// Delete task
app.delete('/api/tasks/:id', protect, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
