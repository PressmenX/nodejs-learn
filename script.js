// Membuktikan Mekanisme Non-Blocking

console.log("LOG 1: Memulai permintaan data ke Server eksternal...");

// Simulasi Operasi I/O (seperti ambil data DB atau API)
// Kita delegasikan tugas 'Menunggu' selama 3 detik ke Libuv
setTimeout(() => {
    console.log("LOG 2: Data dari Server eksternal akhirnya diterima (setelah 3 detik).");
}, 3000);

console.log("LOG 3: Node.js tetap menjalankan baris ini tanpa menunggu LOG 2 selesai.");

// Operasi matematika ringan (CPU task)
const sum = 10 + 10;
console.log("LOG 4: Hasil penjumlahan simpel: " + sum);