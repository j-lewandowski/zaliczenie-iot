const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
