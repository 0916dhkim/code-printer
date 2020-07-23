import express from "express";
import { PORT } from "./config";
import axios from "axios";
import { highlight } from "highlight.js";
const app = express();

app.get("/print", (req, res) => {
  const githubUrl = req.query.url;
  if (typeof githubUrl !== "string") {
    res.status(400);
    res.send({
      error: "url query string is required."
    });
    return;
  }
  const parsed = new URL(githubUrl);
  const pathArray = parsed.pathname.split("/");
  if (parsed.host !== "github.com" || pathArray[3] !== "blob") {
    res.status(400);
    res.send({
      error: "Invalid url."
    });
    return;
  }
  // Convert github url to github raw url.
  parsed.host = "raw.githubusercontent.com";
  parsed.pathname = [
    ...pathArray.slice(0, 3),
    ...pathArray.slice(4)
  ].join("/");
  // Fetch raw and return.
  axios.get(parsed.toString()).then(raw => {
    if (typeof raw.data !== "string") {
      throw new Error("Failed to fetch raw data.");
    }
    let highlightState: Mode | undefined;
    res.send(
      raw.data
        .split("\n")
        .map(line => {
          const highlightResult = highlight("json", line, true, highlightState)
          highlightState = highlightResult.top;
          return highlightResult.value;
        })
        .join("\n")
    );
  }).catch(e => {
    console.error(e);
    res.status(500);
    res.send(e);
  });
});

// Serve static files.
app.use(express.static("./static"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
