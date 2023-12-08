const express = require('express');
const path = require('path');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 5000;

const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

// Load all from routes/index.js
app.use('/', routes);

// Starts express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
