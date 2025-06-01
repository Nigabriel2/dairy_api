const express = require('express');
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const cowRoutes = require('./routes/cowRoutes'); // 🆕 Import cowRoutes

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cows', cowRoutes); // 🆕 Mount cow routes

// Optional: basic root endpoint
app.get('/', (req, res) => {
  res.send('Dairy API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
