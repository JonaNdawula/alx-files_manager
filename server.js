const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const redisClient = require('./utils/redis');
const dbClient = require('./utils/db');

// Load routes
const routes = require('./routes');
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
