const express = require("express");
const path = require("path");

const app = express();

// Serve the Angular built files
app.use(express.static(path.join(__dirname, "dist/frontend/browser"))); 

// Redirect all other routes to index.html (Angular handles routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/frontend/browser", "index.html"));
});

// Define port
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Frontend is running on port ${PORT}`);
});
