const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();
// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

// Load all from routes/index.js
app.use('/', routes);

// Starts express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
