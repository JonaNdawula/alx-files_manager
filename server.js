const express = require('express');
const dbClient = require('./utils/db');
const app = express();
const port = process.env.PORT || 5000;
const routes = require('./routes');

async function startServer() {
  try {
    await dbClient.ensureConnected();
    app.use(express.json());
    app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
} catch (err) {
  console.error('Failed to connect to the database or start the server:', err);
}
}

startServer();
