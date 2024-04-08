const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Replace 'Your_API_Key' with your actual API key for the radio station service
const API_KEY = 'Your_API_Key';
const BASE_URL = 'http://api.radio-browser.info/json/stations';

app.get('/find-station', async (req, res) => {
  try {
    // Replace 'rock' with the genre you want to search for
    const genre = 'rock';
    const response = await axios.get(`${BASE_URL}/bytag/${genre}`, {
      headers: { 'User-Agent': 'Node.js Radio Station Finder' }
    });

    if (response.data.length > 0) {
      // Just picking the first station for simplicity
      const stationUrl = response.data[0].url;
      res.json({ stationUrl });
    } else {
      res.status(404).json({ message: 'No stations found' });
    }
  } catch (error) {
    console.error('Error fetching radio stations:', error);
    res.status(500).json({ message: 'Error fetching radio stations' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

