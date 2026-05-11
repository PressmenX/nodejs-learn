const fs = require("node:fs");
const path = require("node:path");

const getFile = async () => {
  try {
    const folderTarget = path.join(__dirname, process.argv[2] ?? ".");
    const contents = await fs.promises.readdir(folderTarget);
    if (contents.length <= 0) throw new Error("Folder Kosong!");

    const contentsInfo = await Promise.all(
      contents.map(async (item) => {
        const filePath = path.join(folderTarget, item);
        const stats = await fs.promises.stat(filePath);

        return {
          name: item,
          size: stats.size,
          isFile: stats.isFile(),
          path: filePath,
        };
      }),
    );

    const files = contentsInfo.filter((item) => item.isFile);
    if (files.length <= 0) throw new Error("File kosong di folder ini!");

    const minFile = files.reduce((prev, curr) =>
      prev.size < curr.size ? prev : curr,
    );
    const maxFile = files.reduce((prev, curr) =>
      prev.size > curr.size ? prev : curr,
    );

    return { minFile, maxFile };
  } catch (err) {
    console.log(err.message);
  }
};

const getFileLength = (filePath) => {
  return new Promise((resolve, reject) => {
    const reader = fs.createReadStream(filePath, { encoding: "utf8" });
    let charLength = 0;
    reader.on("data", (chunk) => {
      charLength += chunk.length;
    });

    reader.on("error", (err) =>
      reject(`Kesalahan saat membaca file : ${err.message}`),
    );

    reader.on("end", () => {
      resolve(charLength);
    });
  });
};

async function main() {
  try {
    const { minFile, maxFile } = await getFile();
    if (!minFile || !maxFile) throw new Error("Kesalahan Pengambilan File!");

    const fileLength = await getFileLength(maxFile.path)

    console.log(fileLength);
  } catch (err) {
    console.log("[ERROR] : "+err.message);
  }
}

main();
