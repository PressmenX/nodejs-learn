const http = require("http");
const path = require("path");
const fs = require("fs").promises; 

const mapMime = {
  ".html": "text/html",
  ".png": "image/png",
  ".css": "text/css",
  ".js": "application/javascript",
};

const server = http.createServer(
  async (req, res) => {
    if (req.url === "/") {
      try {
        const data = await fs.readFile(
          path.join(__dirname, "public", "image.png"),
        );
        res.writeHead(200, { "content-type": "image/png" });
        res.end(data);
      } catch (err) {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Page is not found");
      }
    } else {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("Page is not found");
    }
  },
);

server.listen(3000, () => {
  console.log("Server siap! Buka http://localhost:3000 di browsermu.");
});