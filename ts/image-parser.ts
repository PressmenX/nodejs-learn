import fs from "node:fs";
import path from "node:path";

const FILE_NAME = process.argv[2] ?? "nodejs.png";
const IMAGE_PATH = path.join(import.meta.dirname, "..", "public", FILE_NAME);

function imageParser(filepath: string): void {
  let fd: number | null = null;
  try {
    fd = fs.openSync(filepath, "r");

    const stat = fs.fstatSync(fd)
    const buffer = Buffer.alloc(24);
    fs.readSync(fd, buffer, 0, 24, 0);

    const isPng = buffer.readUInt32BE(0) === 0x89504E47 && buffer.readUInt32BE(4) === 0x0D0A1A0A;
    if (!isPng) throw new Error("file extension is not png");

    console.log("--------------------------------");
    console.log(
      `File name : ${FILE_NAME}\nSize : ${Math.floor(stat.size/ 1024)} KB\nWidth : ${buffer.readUInt32BE(16)} px\nHeight : ${buffer.readUInt32BE(20)} px`,
    );
    console.log("--------------------------------");
  } catch (err: unknown) {
    if (err instanceof Error) {
      const nodeErr = err as NodeJS.ErrnoException;
      if (nodeErr.code === "ENOENT") console.log("File not found");
      else console.log(`Error : ${err.message}`);
    } else {
      console.log(`Another Error : ${err}`);
    }
  } finally {
    if (fd !== null) {
      fs.closeSync(fd);
    }
  }
}

imageParser(IMAGE_PATH);
