/* SEKOLAHKU YANG BALI — PUSAT UPLOAD DOKUMENTASI */
(function(){
  const REPO='ipranata51-hue/sekolahku-yang-bali';
  const root='dokumentasi';
  const gh=p=>`https://github.com/${REPO}/tree/main/${p}`;
  function addStyle(){
    if(document.getElementById('cm-style'))return;
    const s=document.createElement('style');s.id='cm-style';
    s.textContent=`.cm-section{background:linear-gradient(180deg,#f4fbf6,#fffdf7)}.cm-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}.cm-card{background:var(--qc-card-bg,#fffdf8);border:1px solid var(--line,#e6e0cb);border-radius:22px;padding:25px;box-shadow:var(--qc-card-shadow,0 8px 24px rgba(31,63,45,.055))}.cm-icon{font-size:40px}.cm-card h3{color:var(--forest,#0f2e20);margin:7px 0}.cm-card p{color:var(--muted,#63705f);font-size:14px}.cm-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:15px}.cm-btn{display:inline-flex;align-items:center;gap:7px;padding:11px 16px;border-radius:999px;font-size:13px;font-weight:800;text-decoration:none}.cm-primary{background:var(--forest2,#2f6b46);color:#fff!important}.cm-secondary{background:#e9f1e8;color:var(--forest,#0f2e20)!important}@media(max-width:700px){.cm-grid{grid-template-columns:1fr}}`;
    document.head.appendChild(s);
  }
  function inject(){
    const aksi=document.getElementById('aksi');
    if(!aksi||document.getElementById('content-manager'))return;
    const sec=document.createElement('section');sec.id='content-manager';sec.className='section cm-section';
    sec.innerHTML=`<div class="c"><div class="head"><span class="kicker">Dokumentasi Mudah</span><h2>Upload Foto Pembiasaan & Inovasi</h2><p class="muted">Dokumentasi dapat ditambahkan tanpa mengubah HTML. Untuk keamanan, tombol upload ini akan kita jadikan area admin; pengunjung umum hanya dapat melihat hasil publikasi.</p></div><div class="cm-grid"><article class="cm-card"><div class="cm-icon">🌱</div><span class="badge">PEMBIASAAN</span><h3>Dokumentasi Pembiasaan</h3><p>Upload foto/video kegiatan seperti Piket, Operasi Semut, General Clean Up, Pemilahan Sampah, Perawatan Tanaman, dan pembiasaan baik lainnya.</p><div class="cm-actions"><a class="cm-btn cm-primary" href="${gh(root+'/pembiasaan')}" target="_blank" rel="noopener">📤 Upload Foto</a><a class="cm-btn cm-secondary" href="${gh(root+'/pembiasaan')}" target="_blank" rel="noopener">📁 Buka Folder</a></div></article><article class="cm-card"><div class="cm-icon">💡</div><span class="badge">INOVASI</span><h3>Dokumentasi Inovasi</h3><p>Upload foto/video inovasi seperti PIRAL, Eco Enzym, Media Komposting, Lagu Sekolahku, Papan Nama Tanaman Digital, dan inovasi baru lainnya.</p><div class="cm-actions"><a class="cm-btn cm-primary" href="${gh(root+'/inovasi')}" target="_blank" rel="noopener">📤 Upload Foto</a><a class="cm-btn cm-secondary" href="${gh(root+'/inovasi')}" target="_blank" rel="noopener">📁 Buka Folder</a></div></article></div><div class="highlight" style="margin-top:22px"><strong>💡 Cara kerja:</strong> pilih ruang dokumentasi → upload beberapa foto → Commit changes. Setelah masuk repo, foto menjadi sumber dokumentasi website. Pada tahap berikutnya tombol upload akan dibatasi untuk admin sekolah.</div></div>`;
    aksi.insertAdjacentElement('afterend',sec);
  }
  function init(){addStyle();inject()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
