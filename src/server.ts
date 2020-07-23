import express from "express";
import { PORT } from "./config";
const app = express();

// Serve static files.
app.use(express.static("./static"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
