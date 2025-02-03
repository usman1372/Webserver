const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");

//---Working with express---
const app = express();

//Create handler in express
app.get("/", (req, res) => {
  res.end("Hello on the Home page");
});

app.get("/about", (req, res) => {
  res.end("Hello! I am a developer.");
});

//Create http server using express
app.listen(8005, () => "Server started!");

//---Working natively in Node.js---

//Http request handler
function httpRequestHandler(req, res) {
  //Not log this request
  if (req.url === "/favicon.ico") return res.end();

  //Log incoming request
  const log = `${Date.now()}: ${req.method}: ${
    req.url
  }: New request received\n`;

  //Parse url
  const parseURL = url.parse(req.url);
  console.log("parsed URL components: ", parseURL);

  fs.appendFile("log.txt", log, (err, data) => {
    switch (parseURL.path) {
      case "/":
        res.end("Home page");
        break;
      case "/about":
        res.end("About page: I am developer");
        break;
      case "/signup":
        if (req.method === "Get") {
          res.end("This is a signup form.");
        } else if (req.method === "Post") {
          //Db query
          res.end("successfully");
        }
      default:
        res.end("404 Not Found");
        break;
    }
  });
}

//Create http server nativley
const nativeServer = http.createServer(httpRequestHandler);
nativeServer.listen(8004, () => "Server started!");
