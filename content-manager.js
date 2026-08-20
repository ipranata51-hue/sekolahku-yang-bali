/* SEKOLAHKU YANG BALI — PUSAT UPLOAD DOKUMENTASI */
(function(){
  const REPO='ipranata51-hue/sekolahku-yang-bali';
  const root='dokumentasi';
  const gh=p=>`https://github.com/${REPO}/tree/main/${p}`;
  const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  function addStyle(){if(document.getElementById('cm-style'))return;const s=document.createElement('style');s.id='cm-style';s.textContent=`
  .cm-section{background:linear-gradient(180deg,#f4fbf6,#fffdf7)}
  .cm-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
  .cm-card{background:var(--qc-card-bg,#fffdf8);border:1px solid var(--line,#e6e0cb);border-radius:22px;padding:25px;box-shadow:var(--qc-card-shadow,0 8px 24px rgba(31,63,45,.055))}
  .cm-icon{font-size:40px}.cm-card h3{color:var(--forest,#0f2e20);margin:7px 0}.cm-card p{color:var(--muted,#63705f);font-size:14px}.cm-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:15px}.cm-btn{display:inline-flex;align-items:center;gap:7px;padding:11px 16px;border-radius:999px;font-size:13px;font-weight:800;text-decoration:none}.cm-primary{background:var(--forest2,#2f6b46);color:#fff!important}.cm-secondary{background:#e9f1e8;color:var(--forest,#0f2e20)!important}
  @media(max-width:700px){.cm-grid{grid-template-columns:1fr}}
  `;document.head.appendChild(s)}
  function inject(){
    const aksi=document.getElementById('aksi');
    if(!aksi||document.getElementById('content-manager'))return;
    const sec=document.createElement('section');sec.id='content-manager';sec.className='section cm-section';
    sec.innerHTML=`<div class="c"><div class="head"><span class="kicker">Dokumentasi Mudah</span><h2>Upload Foto Pembiasaan & Inovasi</h2><p class="muted">Mulai sekarang dokumentasi dapat ditambahkan tanpa mengubah HTML. Pilih ruang dokumentasi, upload beberapa foto sekaligus, lalu commit ke GitHub.</p></div><div class="cm-grid"><article class="cm-card"><div class="cm-icon">🌱</div><span class="badge">PEMBIASAAN</span><h3>Dokumentasi Pembiasaan</h3><p>Upload foto/video kegiatan seperti Piket, Operasi Semut, General Clean Up, Pemilahan Sampah, Perawatan Tanaman, dan pembiasaan baik lainnya.</p><div class="cm-actions"><a class="cm-btn cm-primary" href="${gh(root+'/pembiasaan')}" target="_blank" rel="noopener">📤 Upload Foto</a><a class="cm-btn cm-secondary" href="${gh(root+'/pembiasaan')}" target="_blank" rel="noopener">📁 Buka Folder</a></div></article><article class="cm-card"><div class="cm-icon">💡</div><span class="badge">INOVASI</span><h3>Dokumentasi Inovasi</h3><p>Upload foto/video inovasi seperti PIRAL, Eco Enzym, Media Komposting, Lagu Sekolahku, Papan Nama Tanaman Digital, dan inovasi baru lainnya.</p><div class="cm-actions"><a class="cm-btn cm-primary" href="${gh(root+'/inovasi')}" target="_blank" rel="noopener">📤 Upload Foto</a><a class="cm-btn cm-secondary" href="${gh(root+'/inovasi')}" target="_blank" rel="noopener">📁 Buka Folder</a></div></article></div><div class="highlight" style="margin-top:22px"><strong>💡 Cara kerja:</strong> klik Upload Foto → pilih beberapa foto → Commit changes. Foto yang sudah masuk repo menjadi sumber dokumentasi website. Untuk saat ini GitHub menjadi tempat upload yang aman; tahap berikutnya kita bisa membuat halaman admin agar Bapak tidak perlu masuk GitHub.</div></div>`;
    aksi.insertAdjacentElement('afterend',sec);
  }
  function addPlantCard(){
    const grid=[...document.querySelectorAll('.aksi-grid')].find(g=>g.querySelector('.aksi-card.inovasi'));
    if(!grid||grid.querySelector('[data-cm-plant]'))return;
    const card=document.createElement('div');card.className='aksi-card inovasi';card.setAttribute('data-cm-plant','1');card.innerHTML='<div class="aksi-icon">🌿</div><span class="aksi-label">INOVASI</span><h3>Papan Nama Tanaman Digital</h3><p>Papan nama tanaman dengan informasi digital yang membantu warga sekolah mengenal jenis, manfaat, dan karakteristik tanaman.</p><button type="button">Lihat Detail →</button>';
    card.addEventListener('click',()=>{
      const box=document.createElement('div');box.style.cssText='position:fixed;inset:0;z-index:120;background:rgba(8,28,18,.72);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:18px';
      box.innerHTML='<div style="width:min(760px,96vw);max-height:90vh;overflow:auto;background:var(--paper,#fffdf7);border-radius:24px;padding:28px;border:1px solid var(--line,#e6e0cb)"><button style="float:right;border:0;background:#edf3ec;width:40px;height:40px;border-radius:50%;font-size:24px;cursor:pointer">×</button><span class="badge">INOVASI</span><h2 style="color:var(--forest);font-family:var(--serif);font-size:32px">🌿 Papan Nama Tanaman Digital</h2><p style="color:var(--muted);font-size:16px">Papan nama tanaman digital merupakan media informasi lingkungan yang membantu warga sekolah mengenal identitas, jenis, manfaat, dan karakteristik tanaman yang tumbuh di lingkungan sekolah.</p><div class="highlight"><strong>Tujuan:</strong><br>• mengenalkan keanekaragaman tanaman sekolah;<br>• menghubungkan teknologi dengan pembelajaran lingkungan;<br>• menumbuhkan kepedulian terhadap tanaman dan ruang hijau sekolah.</div><div class="cm-actions"><a class="cm-btn cm-primary" href="${gh(root+'/inovasi')}" target="_blank" rel="noopener">📤 Upload Foto Inovasi</a></div><p style="font-size:12px;color:var(--muted)">Dokumentasi foto/video Papan Nama Tanaman Digital disimpan bersama dokumentasi inovasi lainnya.</p></div>';
      box.querySelector('button').onclick=()=>box.remove();box.addEventListener('click',e=>{if(e.target===box)box.remove()});document.body.appendChild(box);
    });grid.appendChild(card);
  }
  function init(){addStyle();inject();addPlantCard();setTimeout(addPlantCard,1000);setTimeout(addPlantCard,3000)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
