const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");

const port = 5002;

// Enable CORS for all routes
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url; // e.g., http://example.com
  try {
    const response = await axios.get(targetUrl);
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching the target URL");
  }
});

app.listen(port, () => {
  console.log(`CORS Proxy running at http://localhost:${port}`);
});
