import http, { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";
import fs from "node:fs/promises";

interface FileMetaData {
  status : number
  filename : string
}

const mimeMap: Record<string, string> = {
  ".html": "text/html",
  ".png": "image/png",
  ".css": "text/css",
  ".js": "application/javascript",
};
const urlMap: Record<string, FileMetaData> = {
  "/": {status : 200, filename : "/index.html"},
  "/image": {status : 200, filename : "/image.png"},
  "/style": {status : 200, filename : "/style.css"},
  "/script": {status : 200, filename : "/script.js"},
};

console.log("Script dimulai...");
const server = http.createServer(
  async (req: IncomingMessage, res: ServerResponse) => {

    try {
      const targetUrl = urlMap[req.url!]

      if (!targetUrl) throw new Error("url tidak valid");
      const data = await fs.readFile(
        path.join(import.meta.dirname, "public", targetUrl.filename),
      );

      if (!data) throw new Error("FIle tidak ditemukan");
      
      const ext = path.extname(targetUrl.filename)
      res.writeHead(200, { "content-type": mimeMap[ext] });
      res.end(data);
    } catch (err) {
      const error = err as Error
      console.error(error.message);
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("Page is not found");
    }
  },
);

console.log("Mencoba menjalankan server.listen...");
server.listen(3000, () => {
  console.log("Server siap! Buka http://localhost:3000 di browsermu.");
});
