const express = require("express");
const path = require("path");

const app = express();

// Serve the Angular built files
app.use(express.static(path.join(__dirname, "dist/frontend"))); 

// Redirect all other routes to index.html (Angular handles routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/frontend", "index.html"));
});

// Define port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Frontend is running on port ${PORT}`);
});
