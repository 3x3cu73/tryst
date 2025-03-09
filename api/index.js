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
  res.status(200)
     .set('Content-Type', 'application/json')
     .set('Authorization', 'Bearer token123')
     .send();
});

// Second endpoint - returns 400 with specific headers and body
app.get('/second', (req, res) => {
  res.status(400)
     .set('Content-Type', 'application/json')
     .set('Authorization', 'Bearer token123')
     .json({
       param1: 'value1',
       param2: 'value2'
     });
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
