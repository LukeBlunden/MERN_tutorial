const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const items = require("./routes/api/items");

const app = express();

// Bodyparser middleware (now included in express)
app.use(express.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

// Use routes - any items that go through /api/items/ should be directed to the items file
app.use("/api/items/", items);

// Serve static assets if we're in production
if (process.env.NODE_ENV === "production") {
  // Set a static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
