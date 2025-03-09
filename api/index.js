// api/index.js
const express = require('express');
const app = express();

// Enable JSON body parsing
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: "API is running. Access /first or /second endpoints for the challenge." });
});

// First endpoint - returns 200 with specific headers
app.get('/first', (req, res) => {
  res.statusCode = 200; // Set status code
  res.setHeader('Content-Type', 'application/json'); // Set Content-Type without charset
  res.setHeader('Authorization', 'Bearer token123'); // Set other headers
  res.end(); // End the response without using res.send()
});
// Second endpoint - returns 400 with specific headers and body
app.get('/second', (req, res) => {
  const data = {
    param1: 'value1',
    param2: 'value2'
  };

  const jsonData = JSON.stringify(data);
  const buffer = Buffer.from(jsonData, 'utf8');

  res.status(400)
     .setHeader('Content-Type', 'application/json')
     .setHeader('Authorization', 'Bearer token123')
     .writeHead(400, {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer token123'
     })
     .end(buffer);
});

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
