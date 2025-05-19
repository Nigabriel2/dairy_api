const express = require('express');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const cowRoutes = require('./routes/cowRoutes');

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/cows', cowRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
