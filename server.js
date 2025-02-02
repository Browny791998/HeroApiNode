const express = require("express");
const cors = require("cors");
const axios = require("axios");
require('dotenv').config();


const app = express();
const PORT = 5000;

// Enable CORS for all routes
// app.use(cors());
app.use(cors({
  origin: "*", // Allows all origins (for development)
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization"
}));
const publicKey = process.env.PUBLIC_KEY;
app.get("/api/search/:heroName", async (req, res) => {
  try {
    const heroName = req.params.heroName;
    const response = await axios.get(
      `https://www.superheroapi.com/api.php/${publicKey}/search/${heroName}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hero data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});