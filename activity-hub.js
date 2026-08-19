/* SEKOLAHKU YANG BALI — PUSAT AKTIVITAS */
(function(){
  const REPO='ipranata51-hue/sekolahku-yang-bali';
  const ROOT='dokumentasi';
  const categories={
    pembiasaan:{title:'Pembiasaan',icon:'🌱',desc:'Kebiasaan baik yang dilakukan warga sekolah setiap hari untuk menjaga lingkungan tetap bersih, asri, lestari, dan indah.',folder:'pembiasaan'},
    inovasi:{title:'Inovasi',icon:'💡',desc:'Gagasan, karya, dan solusi kreatif warga sekolah untuk mengembangkan Program Sekolahku yang BALI.',folder:'inovasi'}
  };
  const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const api=p=>`https://api.github.com/repos/${REPO}/contents/${p}?ref=main`;
  const gh=p=>`https://github.com/${REPO}/tree/main/${p}`;
  async function list(path){try{const r=await fetch(api(path),{headers:{Accept:'application/vnd.github+json'}});if(!r.ok)throw 0;return await r.json()}catch(e){return[]}}
  function css(){if(document.getElementById('ah-style'))return;const s=document.createElement('style');s.id='ah-style';s.textContent=`
  .ah-section{background:linear-gradient(180deg,#f4fbf6 0%,#fffdf7 100%)}
  .ah-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}
  .ah-card{background:var(--qc-card-bg);border:1px solid var(--line);border-radius:22px;padding:28px;box-shadow:var(--qc-card-shadow);transition:.25s}
  .ah-card:hover{transform:translateY(-6px);box-shadow:var(--qc-card-hover-shadow);border-color:#a9cbb3}
  .ah-icon{font-size:42px;margin-bottom:10px}.ah-card h3{margin:4px 0 8px;color:var(--forest);font-size:27px}.ah-card p{color:var(--muted);min-height:75px}
  .ah-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}.ah-btn{display:inline-flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:11px 17px;font-weight:800;cursor:pointer;font:inherit}.ah-primary{background:var(--forest2);color:#fff}.ah-secondary{background:#e9f1e8;color:var(--forest)}
  .ah-latest{margin-top:34px}.ah-latest h3{color:var(--forest);margin-bottom:14px}.ah-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.ah-media{border:1px solid var(--line);border-radius:15px;overflow:hidden;background:#fff}.ah-media img,.ah-media video{display:block;width:100%;height:165px;object-fit:cover}.ah-media figcaption{padding:8px 10px;font-size:11px;color:var(--muted);word-break:break-word}.ah-empty{padding:18px;border:1px dashed #cbd8cc;border-radius:15px;color:var(--muted);background:#fbfcf9}
  .ah-modal{position:fixed;inset:0;z-index:110;background:rgba(8,28,18,.72);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:18px}.ah-panel{width:min(1050px,96vw);max-height:92vh;overflow:auto;background:var(--paper);border:1px solid var(--line);border-radius:24px;padding:28px;box-shadow:0 24px 70px rgba(0,0,0,.25)}.ah-close{float:right;border:0;background:#edf3ec;width:40px;height:40px;border-radius:50%;font-size:24px;cursor:pointer;color:var(--forest)}.ah-panel h2{color:var(--forest);font-size:32px;margin:0 0 8px}.ah-panel>p{color:var(--muted)}.ah-list{display:grid;gap:10px;margin-top:18px}.ah-item{padding:15px 17px;border:1px solid #dfe9dc;border-radius:15px;background:#f7faf5}.ah-item strong{display:block;color:var(--forest);margin-bottom:5px}.ah-item p{margin:0;color:var(--muted);white-space:pre-wrap}.ah-modal-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:12px}
  @media(max-width:800px){.ah-grid{grid-template-columns:1fr}.ah-gallery{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){.ah-gallery,.ah-modal-gallery{grid-template-columns:1fr}.ah-media img,.ah-media video{height:220px}.ah-panel{padding:20px}}
  `;document.head.appendChild(s)}

  function openPapanNamaDigital(){
    const old=document.querySelector('.ah-modal[data-papan-nama="true"]');if(old)old.remove();
    const box=document.createElement('div');box.className='ah-modal';box.dataset.papanNama='true';
    box.innerHTML=`<div class="ah-panel"><button class="ah-close" aria-label="Tutup">×</button><span class="badge">🌱 INOVASI TIM INOVASI</span><h2>Papan Nama Tanaman Digital</h2><p>Inovasi yang menggabungkan papan nama tanaman dengan informasi digital sehingga tanaman di lingkungan SD Negeri 1 Renon dapat dikenali, dipelajari, dan menjadi sumber belajar kontekstual.</p><div style="padding:16px 18px;border-left:4px solid var(--gold);background:#f6f8ef;border-radius:12px;margin:18px 0"><strong>🎯 Tujuan</strong><p style="margin:6px 0 0">Mengenalkan jenis dan identitas tanaman, menjadikan lingkungan sekolah sebagai sumber belajar, memanfaatkan teknologi untuk edukasi lingkungan, serta menumbuhkan kepedulian terhadap tanaman sekolah.</p></div><h3 style="color:var(--forest);margin-top:24px">🌿 Nilai Sekolahku yang BALI</h3><p>Mendukung lingkungan yang <b>Asri, Lestari, dan Indah</b> sekaligus menjadikan tanaman sebagai media belajar yang menarik bagi warga sekolah.</p><div class="ah-actions"><a class="ah-btn ah-primary" href="${gh('dokumentasi/bali-rangers/tim-inovasi')}" target="_blank" rel="noopener">📤 Upload Foto / Aktivitas</a></div><p style="font-size:12px">Foto dan video pelaksanaan dapat diunggah ke folder Tim Inovasi tanpa mengubah HTML website.</p></div>`;
    box.addEventListener('click',e=>{if(e.target===box)box.remove()});box.querySelector('.ah-close').onclick=()=>box.remove();document.body.appendChild(box);
  }

  function addMainInnovationCard(){
    if(document.querySelector('[data-papan-nama-digital="true"]'))return;
    const grids=[...document.querySelectorAll('#aksi .aksi-grid')];
    const grid=grids.find(g=>g.querySelector('.aksi-card.inovasi'));
    if(!grid)return;
    const card=document.createElement('article');
    card.className='aksi-card inovasi';
    card.dataset.papanNamaDigital='true';
    card.innerHTML=`<div class="aksi-icon">🌱</div><span class="aksi-label">INOVASI</span><h3>Papan Nama Tanaman Digital</h3><p>Media informasi tanaman yang menggabungkan identitas tanaman, pembelajaran lingkungan, dan teknologi digital.</p><button type="button">Lihat Detail →</button>`;
    card.addEventListener('click',openPapanNamaDigital);
    grid.appendChild(card);
  }

  function modal(cat){
    const box=document.createElement('div');box.className='ah-modal';box.innerHTML=`<div class="ah-panel"><button class="ah-close" aria-label="Tutup">×</button><span class="badge">${cat.icon} ${esc(cat.title.toUpperCase())}</span><h2>${esc(cat.title)}</h2><p>${esc(cat.desc)}</p><div class="ah-actions"><a class="ah-btn ah-primary" href="${gh(ROOT+'/'+cat.folder)}" target="_blank" rel="noopener">📤 Upload Foto / Video</a></div><p style="font-size:12px">Di GitHub pilih <b>Add file → Upload files</b>. Foto/video dan file <b>.txt</b> atau <b>.md</b> untuk uraian aktivitas akan terbaca otomatis.</p><h3 style="color:var(--forest);margin-top:25px">📸 Dokumentasi</h3><div class="ah-modal-gallery"><div class="ah-empty">Memuat...</div></div><h3 style="color:var(--forest);margin-top:25px">📝 Uraian Aktivitas</h3><div class="ah-list"><div class="ah-empty">Memuat...</div></div></div>`;
    box.addEventListener('click',e=>{if(e.target===box)box.remove()});box.querySelector('.ah-close').onclick=()=>box.remove();document.body.appendChild(box);load(cat,box)
  }
  async function load(cat,box){const files=await list(ROOT+'/'+cat.folder),gal=box.querySelector('.ah-modal-gallery'),listEl=box.querySelector('.ah-list');if(!Array.isArray(files)){gal.innerHTML='<div class="ah-empty">Belum dapat memuat dokumentasi.</div>';listEl.innerHTML='';return}const media=files.filter(f=>f.type==='file'&&/\.(jpe?g|png|webp|gif|mp4|webm|mov)$/i.test(f.name));const texts=files.filter(f=>f.type==='file'&&/\.(md|txt)$/i.test(f.name));gal.innerHTML=media.length?media.map(f=>{const v=/\.(mp4|webm|mov)$/i.test(f.name);return `<figure class="ah-media">${v?`<video controls preload="metadata" src="${esc(f.download_url)}"></video>`:`<img loading="lazy" src="${esc(f.download_url)}" alt="${esc(f.name)}">`}<figcaption>${esc(f.name)}</figcaption></figure>`}).join(''):'<div class="ah-empty">Belum ada foto/video. Gunakan tombol Upload Foto / Video.</div>';if(!texts.length){listEl.innerHTML='<div class="ah-empty">Belum ada uraian aktivitas. Unggah file .txt atau .md.</div>';return}const out=[];for(const f of texts.slice(0,20)){try{const t=await (await fetch(f.download_url)).text();out.push(`<article class="ah-item"><strong>${esc(f.name)}</strong><p>${esc(t)}</p></article>`)}catch(e){}}listEl.innerHTML=out.length?out.join(''):'<div class="ah-empty">Uraian belum dapat dibaca.</div>'}
  async function latest(cat){const files=await list(ROOT+'/'+cat.folder);if(!Array.isArray(files))return[];return files.filter(f=>f.type==='file'&&/\.(jpe?g|png|webp|gif)$/i.test(f.name)).slice(-4).reverse()}
  async function inject(){const aksi=document.getElementById('aksi');if(!aksi||document.getElementById('aktivitas-bali'))return;const sec=document.createElement('section');sec.id='aktivitas-bali';sec.className='section ah-section';sec.innerHTML=`<div class="c"><div class="head"><span class="kicker">Dokumentasi Hidup</span><h2>Pembiasaan & Inovasi</h2><p class="muted">Setiap kegiatan dapat ditambahkan tanpa mengubah HTML. Upload foto, video, dan uraian aktivitas langsung ke ruang dokumentasi.</p></div><div class="ah-grid">${Object.entries(categories).map(([key,c])=>`<article class="ah-card"><div class="ah-icon">${c.icon}</div><span class="badge">${key==='pembiasaan'?'PEMBIASAAN':'INOVASI'}</span><h3>${c.title}</h3><p>${c.desc}</p><div class="ah-actions"><button class="ah-btn ah-primary" data-ah="${key}">📸 Lihat Aktivitas</button><a class="ah-btn ah-secondary" href="${gh(ROOT+'/'+c.folder)}" target="_blank" rel="noopener">📤 Upload</a></div><div class="ah-latest"><h3>Terbaru</h3><div class="ah-gallery" id="ah-${key}"><div class="ah-empty">Memuat...</div></div></div></article>`).join('')}</div></div>`;aksi.insertAdjacentElement('afterend',sec);sec.querySelectorAll('[data-ah]').forEach(b=>b.onclick=()=>modal(categories[b.dataset.ah]));for(const [key,c] of Object.entries(categories)){const files=await latest(c),el=sec.querySelector('#ah-'+key);el.innerHTML=files.length?files.map(f=>`<figure class="ah-media"><img loading="lazy" src="${esc(f.download_url)}" alt="${esc(f.name)}"><figcaption>${esc(f.name)}</figcaption></figure>`).join(''):'<div class="ah-empty">Belum ada foto. Silakan upload dokumentasi.</div>'}}
  function init(){css();addMainInnovationCard();inject()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
