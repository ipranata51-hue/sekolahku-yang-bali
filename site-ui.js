/* SEKOLAHKU YANG BALI — UI TERPADU
   Satu modul untuk popup detail + dokumentasi.
*/
(function(){
  const extra={
    'piral':{goal:'Memanfaatkan kertas bekas menjadi PIRAL (Piala Ramah Lingkungan) dan menumbuhkan kreativitas serta kepedulian lingkungan.'},
    'si-pahala':{goal:'Memanfaatkan air hujan dan menumbuhkan kesadaran terhadap konservasi air.'},
    'a-patar':{goal:'Membiasakan penggunaan tumbler dan mengurangi penggunaan botol plastik sekali pakai.'},
    'dupa':{goal:'Mengembangkan praktik pengelolaan lingkungan yang bersih dan tertib dalam kegiatan sekolah.'},
    'eco-enzym':{goal:'Memanfaatkan bahan organik menjadi produk yang berguna serta mengurangi sampah.'},
    'komposting':{goal:'Mengolah sampah organik menjadi media yang bermanfaat dan mengurangi sampah.'},
    'ecobrick':{goal:'Memanfaatkan sampah plastik agar memiliki nilai guna kembali.'},
    'recycle':{goal:'Mengolah bahan yang tidak terpakai menjadi produk baru yang bermanfaat.'},
    'lagu-bali':{goal:'Menanamkan semangat Bersih, Asri, Lestari, dan Indah melalui media musik.',audio:'lagu-sekolahku-yang-bali.mp3'},
    'papan-nama-tanaman-digital':{goal:'Mengenalkan jenis dan identitas tanaman di lingkungan sekolah, menjadikan lingkungan sebagai sumber belajar kontekstual, serta memanfaatkan teknologi untuk mendukung edukasi lingkungan.'}
  };
  // Ganti kode ini kapan saja untuk mengunci siapa yang boleh upload dokumentasi.
  // Ini BUKAN keamanan yang kuat (masih bisa dilihat siapapun yang buka kode
  // sumber halaman), hanya penyaring supaya pengunjung biasa tidak asal upload.
  const UPLOAD_PIN = 'BALI2026';
  const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  function style(){if(document.getElementById('site-ui-style'))return;const s=document.createElement('style');s.id='site-ui-style';s.textContent=`
  body.ui-lock{overflow:hidden}.ui-modal{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(7,24,15,.72);backdrop-filter:blur(7px)}.ui-panel{position:relative;width:min(760px,96vw);max-height:90vh;overflow:auto;background:#fffdf8;border-radius:26px;padding:30px;box-shadow:0 25px 80px rgba(0,0,0,.3);border:1px solid #dce8dc}.ui-close{position:absolute;right:16px;top:16px;width:40px;height:40px;border:0;border-radius:50%;background:#edf3eb;color:#234a31;font-size:25px;cursor:pointer}.ui-panel h2{color:#183b28;margin:12px 45px 10px 0;font-size:32px}.ui-panel p{color:#5f6d61;line-height:1.65}.ui-type{display:inline-block;padding:6px 11px;border-radius:999px;background:#e6f1e5;color:#2f6b46;font-size:11px;font-weight:900}.ui-box{margin-top:18px;padding:17px;border-radius:17px;background:#f3f8f1;border:1px solid #dce8dc}.ui-box strong{display:block;color:#214d32;margin-bottom:7px}.ui-audio{margin-top:18px;padding:17px;border-radius:17px;background:#f5f0df}.ui-audio audio{width:100%;margin-top:10px}.ui-doc{margin-top:25px;padding-top:22px;border-top:1px solid #e0e7dc}.ui-doc h3{color:#214d32}.ui-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}.ui-btn{display:inline-flex;align-items:center;justify-content:center;padding:11px 17px;border-radius:999px;text-decoration:none;border:0;cursor:pointer;font:inherit;font-weight:800;font-size:13px}.ui-primary{background:#2f6b46;color:white!important}.ui-secondary{background:#e9f1e8;color:#214d32!important}.ui-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:14px}.ui-gallery img{width:100%;height:110px;object-fit:cover;border-radius:12px;border:1px solid #dce8dc;background:#eef3ec}.ui-gallery-empty{font-size:13px;color:#8a978c;margin-top:10px}.ui-upload{margin-top:28px;padding:25px;border-radius:24px;background:linear-gradient(135deg,#f0f8f0,#fffdf6);border:1px solid #d9e7d9}.ui-upload-form{display:grid;gap:13px;max-width:560px}.ui-upload-form label{font-size:12px;font-weight:800;color:#214d32}.ui-upload-form input,.ui-upload-form select{width:100%;border:1px solid #d9dfd2;border-radius:12px;padding:11px 13px;background:#fffdf8;font:inherit;color:#28331f}.ui-note{font-size:12px;color:#5f6d61;margin-top:6px;line-height:1.6}@media(max-width:700px){.ui-gallery{grid-template-columns:repeat(2,1fr)}.ui-panel{padding:22px}.ui-panel h2{font-size:26px}}
  `;document.head.appendChild(s)}
  function close(){document.querySelectorAll('.ui-modal').forEach(x=>x.remove());document.body.classList.remove('ui-lock')}
  function getAksiUrl_(qs){return (typeof SAPA_APPS_SCRIPT_URL!=='undefined'?SAPA_APPS_SCRIPT_URL:'')+qs}
  async function fetchDokumentasi_(id){
    try{
      const url=getAksiUrl_('?action=dokumentasi&aksiId='+encodeURIComponent(id));
      if(!url)return[];
      const r=await fetch(url);
      const data=await r.json();
      return (data&&data.items)||[];
    }catch(err){console.error('Gagal memuat dokumentasi:',err);return[]}
  }
  async function open(id,card){
    close();
    const title=card?.querySelector('h3')?.textContent?.trim()||id;
    const type=card?.querySelector('.aksi-label')?.textContent?.trim()||'INOVASI';
    const desc=card?.querySelector('p')?.textContent?.trim()||'';
    const d=extra[id]||{};
    const box=document.createElement('div');
    box.className='ui-modal';
    box.innerHTML=`<div class="ui-panel" role="dialog" aria-modal="true"><button class="ui-close" type="button">×</button><span class="ui-type">${esc(type)}</span><h2>${esc(title)}</h2><p>${esc(desc)}</p>${d.audio?`<div class="ui-audio"><strong>🎵 Dengarkan Lagu Sekolahku yang BALI</strong><audio controls preload="metadata" src="${d.audio}"></audio></div>`:''}<div class="ui-box"><strong>🎯 Tujuan</strong><span>${esc(d.goal||(type==='PEMBIASAAN'?'Membangun budaya peduli lingkungan melalui kebiasaan yang dilakukan secara konsisten.':'Mewujudkan solusi kreatif untuk mendukung lingkungan sekolah yang Bersih, Asri, Lestari, dan Indah.'))}</span></div><div class="ui-box"><strong>📅 Pelaksanaan</strong><span>Sesuai pelaksanaan program</span></div><div class="ui-doc"><h3>📸 Dokumentasi</h3><div class="ui-gallery-empty">Memuat foto...</div><div class="ui-actions"><button type="button" class="ui-btn ui-primary" data-goto-upload="${esc(id)}">📤 Tambah Foto Kegiatan Ini</button></div></div></div>`;
    box.addEventListener('click',e=>{if(e.target===box)close()});
    box.querySelector('.ui-close').onclick=close;
    box.querySelector('[data-goto-upload]').onclick=()=>{close();gotoUpload(id)};
    document.body.appendChild(box);
    document.body.classList.add('ui-lock');
    box.querySelector('.ui-close').focus();
    const items=await fetchDokumentasi_(id);
    const gallerySpot=box.querySelector('.ui-gallery-empty');
    if(!gallerySpot)return; // modal sudah ditutup sebelum data selesai dimuat
    if(!items.length){gallerySpot.textContent='Belum ada foto untuk kegiatan ini.';return}
    const gal=document.createElement('div');
    gal.className='ui-gallery';
    gal.innerHTML=items.map(it=>`<img src="${esc(it.imageUrl)}" alt="${esc(it.keterangan||title)}" loading="lazy">`).join('');
    gallerySpot.replaceWith(gal);
  }
  function gotoUpload(id){
    const sec=document.getElementById('ui-upload-section');
    if(!sec)return;
    sec.scrollIntoView({behavior:'smooth',block:'start'});
    const sel=sec.querySelector('#dokAksiId');
    if(sel&&id)sel.value=id;
  }
  function wire(){document.querySelectorAll('.aksi-card').forEach(card=>{let id=card.dataset.uiId;const raw=card.getAttribute('onclick')||'';const m=raw.match(/openAksi\(['"]([^'"]+)['"]\)/);id=id||m?.[1];if(!id)return;card.dataset.uiId=id;card.removeAttribute('onclick');if(card.dataset.uiWired)return;card.dataset.uiWired='1';card.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();open(id,card)});});}

  function buildAksiOptions_(){
    const data=(typeof aksiData!=='undefined')?aksiData:{};
    const groups={PEMBIASAAN:[],INOVASI:[]};
    Object.keys(data).forEach(id=>{
      const row=data[id];
      const tipe=(row&&row[1])||'INOVASI';
      const judul=(row&&row[2])||id;
      (groups[tipe]||groups.INOVASI).push({id,judul});
    });
    let html='';
    Object.keys(groups).forEach(tipe=>{
      if(!groups[tipe].length)return;
      html+=`<optgroup label="${tipe==='PEMBIASAAN'?'Pembiasaan':'Inovasi'}">`;
      groups[tipe].forEach(o=>{html+=`<option value="${esc(o.id)}">${esc(o.judul)}</option>`});
      html+='</optgroup>';
    });
    return html;
  }

  // Mengecilkan & mengompres foto di browser sebelum dikirim, supaya cepat
  // dan tidak kebesaran ukurannya.
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

  function uploadSection(){
    if(document.getElementById('ui-upload-section'))return;
    const aksi=document.getElementById('aksi');
    if(!aksi)return;
    const sec=document.createElement('section');
    sec.id='ui-upload-section';
    sec.className='section';
    sec.innerHTML=`<div class="c"><div class="head"><span class="kicker">Dokumentasi</span><h2>Kelola Dokumentasi</h2><p class="muted">Upload foto kegiatan pembiasaan/inovasi langsung dari sini. Foto tersimpan otomatis ke Google Drive & muncul di halaman kegiatan terkait.</p></div><div class="ui-upload"><form class="ui-upload-form" id="dokForm"><div><label for="dokAksiId">Kegiatan</label><select id="dokAksiId" required>${buildAksiOptions_()}</select></div><div><label for="dokFoto">Foto</label><input type="file" id="dokFoto" accept="image/*" required></div><div><label for="dokKeterangan">Keterangan (opsional)</label><input type="text" id="dokKeterangan" placeholder="Contoh: Piket kelas 4A, Agustus 2026"></div><div><label for="dokPin">Kode Admin</label><input type="password" id="dokPin" placeholder="Kode akses admin sekolah" required></div><button type="submit" class="ui-btn ui-primary" id="dokSubmitBtn">📤 Upload Foto</button><p class="ui-note" id="dokNote">Foto akan dikompres otomatis di browser sebelum dikirim.</p></form></div></div>`;
    aksi.insertAdjacentElement('afterend',sec);

    const form=sec.querySelector('#dokForm');
    const note=sec.querySelector('#dokNote');
    const btn=sec.querySelector('#dokSubmitBtn');

    form.addEventListener('submit',async function(e){
      e.preventDefault();
      const aksiId=sec.querySelector('#dokAksiId').value;
      const fileInput=sec.querySelector('#dokFoto');
      const keterangan=sec.querySelector('#dokKeterangan').value.trim();
      const pin=sec.querySelector('#dokPin').value;
      const file=fileInput.files&&fileInput.files[0];

      if(pin!==UPLOAD_PIN){note.textContent='❌ Kode admin salah.';return}
      if(!file){note.textContent='❌ Pilih foto terlebih dahulu.';return}

      btn.disabled=true;
      note.textContent='⏳ Mengompres & mengirim foto...';

      try{
        const base64=await compressImage_(file);
        const before=await fetchDokumentasi_(aksiId);
        const beforeCount=before.length;

        await fetch(getAksiUrl_(''),{
          method:'POST',
          mode:'no-cors',
          headers:{'Content-Type':'text/plain;charset=utf-8'},
          body:JSON.stringify({
            type:'dokumentasi',
            aksiId:aksiId,
            keterangan:keterangan,
            filename:(file.name||'foto')+'.jpg',
            mimeType:'image/jpeg',
            base64:base64
          })
        });

        note.textContent='⏳ Memverifikasi foto tersimpan...';
        let verified=false;
        for(let i=0;i<3&&!verified;i++){
          await new Promise(r=>setTimeout(r,1500));
          const after=await fetchDokumentasi_(aksiId);
          if(after.length>beforeCount)verified=true;
        }

        if(verified){
          note.textContent='✅ Foto berhasil diunggah dan sudah tersimpan.';
          form.reset();
        }else{
          note.textContent='⚠️ Foto sudah dikirim, tapi belum terverifikasi tersimpan. Cek beberapa saat lagi atau lihat langsung di Google Sheet.';
        }
      }catch(err){
        console.error('Gagal upload dokumentasi:',err);
        note.textContent='❌ Gagal mengunggah foto: '+(err.message||'Terjadi kesalahan.');
      }finally{
        btn.disabled=false;
      }
    });
  }

  function boot(){style();wire();uploadSection();setTimeout(wire,700);setTimeout(wire,1800)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

/* SAPA BALI — KIRIM LANGSUNG KE API VERCEL, TANPA LOGIN GITHUB
   DINONAKTIFKAN: form #sapaForm sudah ditangani langsung di index.html
   (terhubung ke Google Apps Script / Google Sheet). Blok ini dulu
   membajak form yang sama dan mengalihkannya ke endpoint /api/sapa. */
(function(){
  return; // eslint-disable-line no-unreachable
  function install(){
    const form=document.getElementById('sapaForm');
    if(!form || form.dataset.publicApiReady==='1') return !!form;
    form.dataset.publicApiReady='1';
    const old=form.cloneNode(true);
    form.replaceWith(old);
    const f=old;
    const button=f.querySelector('.sapa-submit');
    const card=f.closest('.sapa-card');
    let note=card?.querySelector('.sapa-note');
    if(!note && card){note=document.createElement('p');note.className='sapa-note';card.appendChild(note)}
    if(note){note.innerHTML='Saran dikirim melalui sistem website dan akan melalui moderasi sebelum ditampilkan.'}
    f.addEventListener('submit',async function(e){
      e.preventDefault();
      const nama=f.querySelector('#sapaNama')?.value.trim()||'';
      const status=f.querySelector('#sapaStatus')?.value||'Lainnya';
      const pesan=f.querySelector('#sapaPesan')?.value.trim()||'';
      if(!nama||!pesan){if(note)note.textContent='Mohon isi Nama dan Saran & Pandangan terlebih dahulu.';return}
      const oldText=button?.textContent||'';
      if(button){button.disabled=true;button.textContent='⏳ Mengirim...'}
      if(note)note.textContent='Sedang mengirim SAPA BALI...';
      try{
        const r=await fetch('/api/sapa',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({nama,status,pesan})});
        let data={};try{data=await r.json()}catch(_){ }
        if(!r.ok)throw new Error(data.error||'SAPA BALI gagal dikirim.');
        f.reset();
        if(note)note.textContent='✅ SAPA BALI berhasil dikirim. Terima kasih. Saran akan diperiksa terlebih dahulu sebelum dipublikasikan.';
      }catch(err){
        console.error('SAPA BALI:',err);
        if(note)note.textContent='❌ SAPA BALI belum terkirim: '+(err.message||'Terjadi kesalahan.');
      }finally{
        if(button){button.disabled=false;button.textContent=oldText||'🌱 Kirim SAPA BALI'}
      }
    });
    return true;
  }
  function boot(){if(install())return;setTimeout(install,300);setTimeout(install,1000);setTimeout(install,2000);setTimeout(install,4000)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
