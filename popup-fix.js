/* POPUP FIX - Sekolahku yang BALI */
(function(){
  const extra = {
    'piket-kelas': {schedule:'Senin–Jumat', goal:'Membangun tanggung jawab, disiplin, gotong royong, dan kepedulian terhadap lingkungan belajar.', photo:'dokumentasi/piket-kelas-1.jpg'},
    'piket-umum': {schedule:'Sesuai jadwal', goal:'Menumbuhkan kesadaran bahwa kebersihan sekolah merupakan tanggung jawab bersama.', photo:'dokumentasi/piket-umum.jpg'},
    'operasi-semut': {schedule:'Senin–Jumat', goal:'Membangun kepedulian dan kebiasaan menjaga kebersihan secara spontan.', photo:'dokumentasi/operasi-semut.jpg'},
    'general-clean-up': {schedule:'Setiap Jumat secara bergiliran', goal:'Menjaga lingkungan sekolah tetap bersih, nyaman, sehat, dan tertata.', photo:'dokumentasi/general-clean-up.jpg'},
    'sisir-meja': {schedule:'Setiap hari', goal:'Membentuk kebiasaan menjaga kebersihan sebelum meninggalkan tempat.', photo:'dokumentasi/sisir-meja.jpg'},
    'pemilahan-sampah': {schedule:'Setiap hari', goal:'Membangun kepedulian terhadap pengelolaan sampah.', photo:'dokumentasi/pemilahan-sampah.jpg'},
    'perawatan-tanaman': {schedule:'Setiap hari', goal:'Menumbuhkan tanggung jawab, kesabaran, dan kecintaan terhadap lingkungan.', photo:'dokumentasi/perawatan-tanaman.jpg'},
    'piral': {schedule:'Sesuai pelaksanaan program', goal:'Memanfaatkan kertas dan menumbuhkan kreativitas serta kepedulian lingkungan.'},
    'si-pahala': {schedule:'Sesuai kondisi dan kebutuhan', goal:'Memanfaatkan air hujan dan menumbuhkan kesadaran terhadap konservasi air.', photo:'si-pahala.jpeg'},
    'a-patar': {schedule:'Sesuai pelaksanaan program', goal:'Membiasakan penggunaan tumbler dan mengurangi penggunaan botol plastik sekali pakai.'},
    'dupa': {schedule:'Sesuai kebutuhan', goal:'Menjaga kebersihan dan ketertiban lingkungan sekolah.'},
    'eco-enzym': {schedule:'Sesuai pelaksanaan program', goal:'Memanfaatkan bahan organik dan mendorong praktik ramah lingkungan.'},
    'komposting': {schedule:'Sesuai pelaksanaan program', goal:'Mengolah sampah organik menjadi media yang bermanfaat dan mengurangi sampah.'},
    'ecobrick': {schedule:'Sesuai pelaksanaan program', goal:'Memanfaatkan sampah plastik agar memiliki nilai guna kembali.'},
    'recycle': {schedule:'Sesuai pelaksanaan program', goal:'Mengolah bahan yang tidak terpakai menjadi produk baru yang bermanfaat.'},
    'lagu-bali': {schedule:'Sesuai kegiatan sekolah', goal:'Menanamkan semangat Bersih, Asri, Lestari, dan Indah melalui media musik.', audio:'lagu-sekolahku-yang-bali.mp3'}
  };

  function closePopup(){
    const m=document.querySelector('[data-popup-fix="true"]');
    if(m)m.remove();
    document.body.classList.remove('aksi-modal-open');
  }

  function openPopup(id){
    const card=document.querySelector('[data-popup-id="'+CSS.escape(id)+'"]');
    if(!card)return;
    closePopup();
    const icon=(card.querySelector('.aksi-icon')?.textContent||'🌿').trim();
    const type=(card.querySelector('.aksi-label')?.textContent||'PROGRAM').trim();
    const title=(card.querySelector('h3')?.textContent||id).trim();
    const desc=(card.querySelector('p')?.textContent||'').trim();
    const d=extra[id]||{};
    const box=document.createElement('div');
    box.className='aksi-modal';
    box.setAttribute('data-popup-fix','true');
    box.setAttribute('role','dialog');
    box.setAttribute('aria-modal','true');
    box.innerHTML=`
      <div class="aksi-modal-panel">
        <button class="aksi-modal-close" type="button" aria-label="Tutup detail">×</button>
        ${d.photo ? `<img class="aksi-modal-photo" src="${d.photo}" alt="Dokumentasi ${title}">` : `<div class="aksi-modal-icon">${icon}</div>`}
        <span class="aksi-modal-type">${type}</span>
        <h2>${title}</h2>
        <p>${desc}</p>
        ${d.audio && id==='lagu-bali' ? `<div class="aksi-audio-box"><strong>🎵 Dengarkan Lagu Sekolahku yang BALI</strong><audio controls preload="metadata" playsinline src="${d.audio}" style="width:100%;margin-top:12px;"></audio></div>` : ''}
        <div class="aksi-detail-grid">
          <div class="aksi-detail-box"><strong>🎯 Tujuan</strong><span>${d.goal|| (type==='PEMBIASAAN' ? 'Membangun budaya peduli lingkungan melalui kebiasaan yang dilakukan secara konsisten.' : 'Mewujudkan solusi kreatif untuk mendukung lingkungan sekolah yang Bersih, Asri, Lestari, dan Indah.')}</span></div>
          <div class="aksi-detail-box"><strong>📅 Pelaksanaan</strong><span>${d.schedule||'Sesuai pelaksanaan program'}</span></div>
        </div>
        <div class="aksi-modal-note">🌿 <b>Sekolahku yang BALI</b> — Bersih • Asri • Lestari • Indah</div>
      </div>`;
    box.addEventListener('click',e=>{if(e.target===box)closePopup();});
    box.querySelector('.aksi-modal-close').addEventListener('click',closePopup);
    document.body.appendChild(box);
    document.body.classList.add('aksi-modal-open');
    box.querySelector('.aksi-modal-close').focus();
  }

  function wireCards(){
    document.querySelectorAll('.aksi-card[onclick*="openAksi"]').forEach(card=>{
      const attr=card.getAttribute('onclick')||'';
      const m=attr.match(/openAksi\(['"]([^'"]+)['"]\)/);
      if(!m)return;
      const id=m[1];
      card.setAttribute('data-popup-id',id);
      card.removeAttribute('onclick');
      card.addEventListener('click',()=>openPopup(id));
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',wireCards); else wireCards();
  window.openAksi=openPopup;
  window.closeAksi=closePopup;
})();
