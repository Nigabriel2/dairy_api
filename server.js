const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
