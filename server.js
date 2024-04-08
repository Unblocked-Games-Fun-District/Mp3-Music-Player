const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/music', (req, res) => {
  const filePath = path.join(__dirname, 'path/to/your/musicfile.mp3');
  const stat = fs.statSync(filePath);

  res.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Content-Length': stat.size
  });

  const readStream = fs.createReadStream(filePath);
  // Stream the MP3 file to the client
  readStream.pipe(res);
});

app.listen(port, () => {
  console.log(`Music player server running at http://localhost:${5000}/`);
});

