const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "big_file.txt");
const writer = fs.createWriteStream(filePath);

for (let i = 1; i < 1e6; i++) {
  writer.write(`${crypto.randomBytes(16).toString("hex")}- Data ke-${i}\n`);
}
writer.end("File selesai dibuat\n")

writer.on('finish', ()=> console.log("File Sukses disimpan"))
writer.on('error', (err) => console.log("Kesalahan saat membuat file : "+ err.message))
