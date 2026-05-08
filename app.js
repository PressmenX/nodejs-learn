// 1. Melihat info lokasi
console.log("Lokasi Folder saat ini:", __dirname);
console.log("Nama File saat ini:", __filename);

// 2. Mengambil data dari terminal (argv)
const username = process.argv[2] || "Guest";
console.log(`Halo, ${username}!`);

// 3. Melihat penggunaan memori sistem (RAM) oleh Node.js
const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`Aplikasi ini menggunakan RAM sebesar: ${memoryUsage.toFixed(2)} MB`);

// 4. Logika penutupan otomatis (Control Panel)
if (process.argv[3] === "stop") {
    console.log("Perintah stop diterima. Mematikan sistem...");
    process.exit();
}

console.log("Sistem terus berjalan karena tidak ada perintah stop.");