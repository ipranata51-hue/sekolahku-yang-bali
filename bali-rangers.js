/* BALI RANGERS — Dokumentasi & upload foto tim (Apps Script + Google Drive) */
(function(){
  const teams={
    'Tim Biopori':{id:'tim-biopori',icon:'💧',desc:'Tim yang mengembangkan dan merawat lubang biopori sebagai upaya meningkatkan resapan air, mengurangi genangan, dan mengelola bahan organik di lingkungan sekolah.',focus:'Pembuatan, pemeliharaan, pengisian bahan organik, dan pemantauan lubang biopori.'},
    'Tim Eco Enzym':{id:'tim-eco-enzym',icon:'🍃',desc:'Tim yang mengolah sisa bahan organik menjadi eco enzyme melalui proses fermentasi sehingga dapat dimanfaatkan sebagai bagian dari praktik ramah lingkungan.',focus:'Pengumpulan bahan organik, proses fermentasi, perawatan, dan dokumentasi hasil.'},
    'Tim Komposter':{id:'tim-komposter',icon:'♻️',desc:'Tim yang bertugas mengolah sampah organik sekolah menjadi kompos sebagai bagian dari upaya mengurangi sampah dan mengembalikan manfaat bahan organik ke lingkungan.',focus:'Pemilahan bahan organik, pengomposan, pemantauan proses, dan pemanfaatan kompos.'},
    'Tim Inovasi':{id:'tim-inovasi',icon:'💡',desc:'Tim penggerak gagasan dan karya kreatif yang mencari solusi sederhana, kontekstual, dan ramah lingkungan untuk mendukung Sekolahku yang BALI.',focus:'Merancang ide, membuat prototipe, menguji, memperbaiki, dan mendokumentasikan inovasi.'},
    'Tim Kampanye':{id:'tim-kampanye',icon:'📣',desc:'Tim yang mengajak seluruh warga sekolah membangun kesadaran dan kebiasaan melalui pesan, media, kegiatan, serta kampanye lingkungan yang positif.',focus:'Pesan lingkungan, poster, media edukasi, ajakan aksi, dan publikasi praktik baik.'},
    'Tim Reuse':{id:'tim-reuse',icon:'🔄',desc:'Tim yang mendorong penggunaan kembali barang atau bahan yang masih layak agar masa pakainya lebih panjang dan jumlah sampah dapat dikurangi.',focus:'Identifikasi barang yang dapat digunakan kembali dan penciptaan manfaat baru dari barang tersebut.'},
    'Tim Reduce':{id:'tim-reduce',icon:'➖',desc:'Tim yang mendorong pengurangan sampah sejak dari sumbernya melalui kebiasaan memilih, menggunakan, dan mengonsumsi secara lebih bijak.',focus:'Mengurangi plastik sekali pakai, menghemat sumber daya, dan membangun kebiasaan minim sampah.'},
    'Tim Recycle':{id:'tim-recycle',icon:'♻️',desc:'Tim yang mengolah bahan yang sudah tidak digunakan menjadi produk atau bahan baru yang memiliki nilai guna.',focus:'Pemilahan, pengolahan, pembuatan produk daur ulang, dan pameran hasil karya.'}
  };
  // Samakan dengan UPLOAD_PIN di site-ui.js kalau salah satunya diganti.
  const UPLOAD_PIN='BALI2026';
  const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  function getAksiUrl_(qs){return (typeof SAPA_APPS_SCRIPT_URL!=='undefined'?SAPA_APPS_SCRIPT_URL:'')+qs}
  async function fetchDokumentasi_(id){
    try{
      const url=getAksiUrl_('?action=dokumentasi&aksiId='+encodeURIComponent(id));
      if(!url)return[];
      const r=await fetch(url);
      const data=await r.json();
      return (data&&data.items)||[];
    }catch(err){console.error('Gagal memuat dokumentasi tim:',err);return[]}
  }
  function compressImage_(file){
    return new Promise((resolve,reject)=>{
      const reader=new FileReader();
      reader.onerror=()=>reject(new Error('Gagal membaca file.'));
      reader.onload=()=>{
        const img=new Image();
        img.onerror=()=>reject(new Error('File bukan gambar yang valid.'));
        img.onload=()=>{
          const maxW=1280;
          const scale=Math.min(1,maxW/img.width);
          const canvas=document.createElement('canvas');
          canvas.width=Math.round(img.width*scale);
          canvas.height=Math.round(img.height*scale);
          const ctx=canvas.getContext('2d');
          ctx.drawImage(img,0,0,canvas.width,canvas.height);
          const dataUrl=canvas.toDataURL('image/jpeg',0.75);
          resolve(dataUrl.split(',')[1]);
        };
        img.src=reader.result;
      };
      reader.readAsDataURL(file);
    });
  }
  function addCSS(){if(document.getElementById('br-style'))return;const s=document.createElement('style');s.id='br-style';s.textContent='.br-card{cursor:pointer!important;position:relative;transition:.25s!important}.br-card:hover{transform:translateY(-7px)!important;box-shadow:0 16px 32px rgba(31,63,45,.12)!important;border-color:#9bc7aa!important}.br-card:after{content:"Lihat dokumentasi & upload foto →";display:block;margin-top:12px;color:var(--forest2);font-size:12px;font-weight:800}.br-modal{position:fixed;inset:0;z-index:100;background:rgba(8,28,18,.72);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px}.br-panel{width:min(980px,96vw);max-height:92vh;overflow:auto;background:var(--paper);border:1px solid var(--line);border-radius:24px;box-shadow:0 24px 70px rgba(0,0,0,.25);padding:28px}.br-close{float:right;border:0;background:#edf3ec;width:40px;height:40px;border-radius:50%;font-size:24px;cursor:pointer;color:var(--forest)}.br-title{display:flex;gap:14px;align-items:center;padding-right:50px}.br-title .ico{font-size:38px}.br-title h2{margin:0;color:var(--forest);font-size:30px}.br-lead{color:var(--muted);max-width:780px}.br-focus{padding:15px 18px;border-left:4px solid var(--gold);background:#f6f8ef;border-radius:12px;margin:18px 0;color:var(--text)}.br-section-title{font-size:19px;color:var(--forest);margin:24px 0 12px}.br-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.br-gallery img{display:block;width:100%;height:150px;object-fit:cover;border-radius:15px;border:1px solid var(--line);background:#f8faf5}.br-empty{padding:22px;border:1px dashed #cbd8cc;border-radius:15px;color:var(--muted);background:#fbfcf9}.br-upload{margin-top:24px;padding:20px;border-radius:19px;background:#f6f9f3;border:1px solid #dfe9dc}.br-upload-form{display:grid;gap:12px;max-width:520px}.br-upload-form label{font-size:12px;font-weight:800;color:var(--forest)}.br-upload-form input{width:100%;border:1px solid #d9dfd2;border-radius:12px;padding:11px 13px;background:#fffdf8;font:inherit;color:var(--text)}.br-upload-btn{border:0;border-radius:999px;padding:12px 18px;background:var(--forest2);color:#fff;font-weight:800;cursor:pointer}.br-note{font-size:12px;color:var(--muted);margin-top:6px;line-height:1.6}@media(max-width:800px){.br-gallery{grid-template-columns:repeat(2,1fr)}.br-panel{padding:20px}}@media(max-width:600px){.br-gallery{grid-template-columns:1fr}.br-gallery img{height:180px}}';document.head.appendChild(s)}

  async function openTeam(team,title){
    const box=document.createElement('div');
    box.className='br-modal';
    box.setAttribute('role','dialog');
    box.setAttribute('aria-modal','true');
    box.innerHTML=`<div class="br-panel"><button class="br-close" aria-label="Tutup">×</button><div class="br-title"><div class="ico">${team.icon}</div><div><span class="badge">BALI RANGERS</span><h2>${esc(title)}</h2></div></div><p class="br-lead">${esc(team.desc)}</p><div class="br-focus"><strong>Fokus kegiatan:</strong> ${esc(team.focus)}</div><h3 class="br-section-title">📸 Dokumentasi Foto</h3><div class="br-gallery"><div class="br-empty">Memuat foto...</div></div><div class="br-upload"><h3 class="br-section-title" style="margin-top:0">📤 Upload Foto Kegiatan Tim</h3><form class="br-upload-form" id="brForm-${esc(team.id)}"><div><label>Foto</label><input type="file" accept="image/*" class="brFoto" required></div><div><label>Keterangan (opsional)</label><input type="text" class="brKeterangan" placeholder="Contoh: Pengisian biopori, Agustus 2026"></div><div><label>Kode Admin</label><input type="password" class="brPin" placeholder="Kode akses admin sekolah" required></div><button type="submit" class="br-upload-btn">📤 Upload Foto</button><p class="br-note brNote">Foto akan dikompres otomatis di browser sebelum dikirim.</p></form></div></div>`;
    box.addEventListener('click',e=>{if(e.target===box)box.remove()});
    box.querySelector('.br-close').onclick=()=>box.remove();
    document.body.appendChild(box);

    // Muat galeri foto tim ini
    const gallerySpot=box.querySelector('.br-gallery');
    fetchDokumentasi_(team.id).then(items=>{
      if(!box.isConnected)return; // modal sudah ditutup
      if(!items.length){gallerySpot.innerHTML='<div class="br-empty">Belum ada foto untuk tim ini. Gunakan form di bawah untuk menambahkan.</div>';return}
      gallerySpot.innerHTML=items.map(it=>`<img src="${esc(it.imageUrl)}" alt="${esc(it.keterangan||title)}" loading="lazy">`).join('');
    });

    // Form upload
    const form=box.querySelector('form');
    const note=box.querySelector('.brNote');
    form.addEventListener('submit',async function(e){
      e.preventDefault();
      const fileInput=form.querySelector('.brFoto');
      const keterangan=form.querySelector('.brKeterangan').value.trim();
      const pin=form.querySelector('.brPin').value;
      const file=fileInput.files&&fileInput.files[0];
      const btn=form.querySelector('.br-upload-btn');

      if(pin!==UPLOAD_PIN){note.textContent='❌ Kode admin salah.';return}
      if(!file){note.textContent='❌ Pilih foto terlebih dahulu.';return}

      btn.disabled=true;
      note.textContent='⏳ Mengompres & mengirim foto...';

      try{
        const base64=await compressImage_(file);
        const before=await fetchDokumentasi_(team.id);
        const beforeCount=before.length;

        await fetch(getAksiUrl_(''),{
          method:'POST',
          mode:'no-cors',
          headers:{'Content-Type':'text/plain;charset=utf-8'},
          body:JSON.stringify({
            type:'dokumentasi',
            aksiId:team.id,
            keterangan:keterangan,
            filename:(file.name||'foto')+'.jpg',
            mimeType:'image/jpeg',
            base64:base64
          })
        });

        note.textContent='⏳ Memverifikasi foto tersimpan...';
        let verified=false;
        let latestItems=before;
        for(let i=0;i<5&&!verified;i++){
          await new Promise(r=>setTimeout(r,2000));
          const after=await fetchDokumentasi_(team.id);
          if(after.length>beforeCount){verified=true;latestItems=after}
        }

        if(verified){
          note.textContent='✅ Foto berhasil diunggah dan sudah tersimpan.';
          form.reset();
          if(box.isConnected){
            gallerySpot.innerHTML=latestItems.map(it=>`<img src="${esc(it.imageUrl)}" alt="${esc(it.keterangan||title)}" loading="lazy">`).join('');
          }
        }else{
          note.textContent='⚠️ Foto sudah dikirim, tapi belum terverifikasi tersimpan. Cek beberapa saat lagi atau lihat langsung di Google Sheet.';
        }
      }catch(err){
        console.error('Gagal upload dokumentasi tim:',err);
        note.textContent='❌ Gagal mengunggah foto: '+(err.message||'Terjadi kesalahan.');
      }finally{
        btn.disabled=false;
      }
    });
  }

  function init(){
    addCSS();
    const h=[...document.querySelectorAll('h2')].find(x=>x.textContent.trim()==='BALI Rangers');
    if(!h)return;
    const section=h.closest('section');
    if(!section)return;
    section.querySelectorAll('.teams .card').forEach(card=>{
      const title=card.querySelector('h3')?.textContent.trim(),team=teams[title];
      if(!team)return;
      card.classList.add('br-card');
      card.setAttribute('tabindex','0');
      card.setAttribute('role','button');
      card.addEventListener('click',()=>openTeam(team,title));
      card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openTeam(team,title)}});
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
