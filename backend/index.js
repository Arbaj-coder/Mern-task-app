const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const TaskRouter = require('./Routes/TaskRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Connect MongoDB here directly
mongoose.connect(process.env.MONGO_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => {
    console.error("❌ MongoDB connection failed:", err);
});

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/ping', (req, res) => {
    res.send('PONG');
});

// Routes
app.use('/auth', AuthRouter);
app.use('/tasks', TaskRouter);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
