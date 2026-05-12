// 1. Fungsi menghasilkan warna HEX acak
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// 2. Mengubah latar belakang saat tombol diklik
const changeStyle = () => {
    const newColor = getRandomColor();
    const card = document.querySelector('.random-card');
    
    // Ubah warna background body
    document.body.style.background = newColor;
    
    // Beri efek rotasi sedikit pada kartu
    const randomRotation = Math.floor(Math.random() * 10) - 5; // -5 sampai 5 derajat
    card.style.transform = `rotate(${randomRotation}deg)`;
    
    console.log(`Warna baru: ${newColor}`);
};

// 3. Event Listener untuk tombol
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.random-button');
    
    if (button) {
        button.addEventListener('click', changeStyle);
        
        // Bonus: Ubah teks tombol secara acak saat hover
        const texts = ["Klik Saya!", "Coba Lagi?", "Warna Baru!", "Magic!"];
        button.addEventListener('mouseover', () => {
            const randomText = texts[Math.floor(Math.random() * texts.length)];
            button.innerText = randomText;
        });
    }
});
