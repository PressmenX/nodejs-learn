import fs from "node:fs";
import path from "node:path";

const TARGET_FILE = path.join(import.meta.dirname, "app.log");
const MAX_SIZE = 1 * 1024 * 1024;

function checkAndRotate(stat: fs.Stats): void {
  try {
    if (stat.size > MAX_SIZE) {
      const newName = `app.backup-[${Date.now()}].log`;

      fs.unwatchFile(TARGET_FILE);
      fs.renameSync(TARGET_FILE, newName);
      fs.writeFileSync(TARGET_FILE, "", { flag: "w" });

      console.log(
        `${new Date().toLocaleTimeString()} [ROTATION] : The file is archived and renamed to ${newName} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`,
      );

      startWacth();
    } else {
      console.log(
        `${new Date().toLocaleTimeString()} [SUCCES] : file changed successfully (${(stat.size / 1024 / 1024).toFixed(2)} MB)`,
      );
    }
  } catch (err: unknown) {
    console.log(err);
  }
}

function startWacth(): void {
  fs.watchFile(TARGET_FILE, { interval: 1000 }, (curr: fs.Stats) => {
    checkAndRotate(curr);
  });
}

console.log("Checking Starting...");
startWacth();
