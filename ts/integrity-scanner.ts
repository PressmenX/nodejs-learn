import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const TARGET_DIR = path.join(import.meta.dirname, "..", "target");
const baselineSnapshot = new Map<string, string>();
const currentSnapshot = new Map<string, string>();

function getHashFile(filePath: string) {
  const content = fs.readFileSync(filePath);
  const hashed = createHash("sha256").update(content).digest("hex");
  return hashed;
}

function scanDir(dirPath: string, map: Map<string, string>) {
  const folder = fs.readdirSync(dirPath);
  folder.forEach((item) => {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      scanDir(itemPath, map);
    } else {
      const hashed = getHashFile(itemPath);
      map.set(itemPath, hashed);
    }
  });
}

function verifIntegrity() {
  console.log("Verify files...");
  currentSnapshot.forEach((hash, filepath) => {
    const filename = path.relative(TARGET_DIR, filepath);

    if (!baselineSnapshot.has(filepath)) {
      console.log(`[NEW] ${filename}`);
    } else if (hash !== baselineSnapshot.get(filepath)) {
      console.log(`[MODIFIED] ${filename} `);
    }
  });

  baselineSnapshot.forEach((_, filepath)=> {
    const filename = path.relative(TARGET_DIR, filepath);
    if (!currentSnapshot.has(filepath)) {
      console.log(`[DELETED] ${filename}`);
    }
  })
}

scanDir(TARGET_DIR, baselineSnapshot);
console.log(`Baseline created for ${baselineSnapshot.size} files.`);
setTimeout(() => {
  scanDir(TARGET_DIR, currentSnapshot);
  verifIntegrity();
}, 10000);  
