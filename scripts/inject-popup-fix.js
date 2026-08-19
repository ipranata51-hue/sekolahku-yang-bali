const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'index.html');
let html = fs.readFileSync(file, 'utf8');

const tag = '<script src="popup-fix.js"></script>';

if (!html.includes(tag)) {
  const marker = '</body>';
  if (!html.includes(marker)) {
    throw new Error('Penanda </body> tidak ditemukan di index.html');
  }
  html = html.replace(marker, `  ${tag}\n${marker}`);
  fs.writeFileSync(file, html, 'utf8');
  console.log('popup-fix.js berhasil dipasang ke index.html');
} else {
  console.log('popup-fix.js sudah terpasang. Tidak ada perubahan.');
}
