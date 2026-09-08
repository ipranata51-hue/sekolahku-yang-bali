/* POPUP FIX - Sekolahku yang BALI */
(function(){
const extra={
'piket-kelas':{schedule:'Senin–Jumat',goal:'Membangun tanggung jawab, disiplin, gotong royong, dan kepedulian terhadap lingkungan belajar.',photo:'dokumentasi/piket-kelas-1.jpg'},
'piket-umum':{schedule:'Sesuai jadwal',goal:'Menumbuhkan kesadaran bahwa kebersihan sekolah merupakan tanggung jawab bersama.',photo:'dokumentasi/piket-umum.jpg'},
'operasi-semut':{schedule:'Senin–Jumat',goal:'Membangun kepedulian dan kebiasaan menjaga kebersihan secara spontan.',photo:'dokumentasi/operasi-semut.jpg'},
'general-clean-up':{schedule:'Setiap Jumat secara bergiliran',goal:'Menjaga lingkungan sekolah tetap bersih, nyaman, sehat, dan tertata.',photo:'dokumentasi/general-clean-up.jpg'},
'sisir-meja':{schedule:'Setiap hari',goal:'Membentuk kebiasaan menjaga kebersihan sebelum meninggalkan tempat.',photo:'dokumentasi/sisir-meja.jpg'},
'pemilahan-sampah':{schedule:'Setiap hari',goal:'Membangun kepedulian terhadap pengelolaan sampah.',photo:'dokumentasi/pemilahan-sampah.jpg'},
'perawatan-tanaman':{schedule:'Setiap hari',goal:'Menumbuhkan tanggung jawab, kesabaran, dan kecintaan terhadap lingkungan.',photo:'dokumentasi/perawatan-tanaman.jpg'},
'piral':{schedule:'Sesuai pelaksanaan program',goal:'Memanfaatkan kertas dan menumbuhkan kreativitas serta kepedulian lingkungan.'},
'si-pahala':{schedule:'Sesuai kondisi dan kebutuhan',goal:'Memanfaatkan air hujan dan menumbuhkan kesadaran terhadap konservasi air.',photo:'si-pahala.jpeg'},
'a-patar':{schedule:'Sesuai pelaksanaan program',goal:'Membiasakan penggunaan tumbler dan mengurangi penggunaan botol plastik sekali pakai.'},
'dupa':{schedule:'Sesuai kebutuhan',goal:'Menjaga kebersihan dan ketertiban lingkungan sekolah.'},
'eco-enzym':{schedule:'Sesuai pelaksanaan program',goal:'Memanfaatkan bahan organik dan mendorong praktik ramah lingkungan.'},
'komposting':{schedule:'Sesuai pelaksanaan program',goal:'Mengolah sampah organik menjadi media yang bermanfaat dan mengurangi sampah.'},
'ecobrick':{schedule:'Sesuai pelaksanaan program',goal:'Memanfaatkan sampah plastik agar memiliki nilai guna kembali.'},
'recycle':{schedule:'Sesuai pelaksanaan program',goal:'Mengolah bahan yang tidak terpakai menjadi produk baru yang bermanfaat.'},
'lagu-bali':{schedule:'Sesuai kegiatan sekolah',goal:'Menanamkan semangat Bersih, Asri, Lestari, dan Indah melalui media musik.',audio:'lagu-sekolahku-yang-bali.mp3'},

};

function injectPopupStyles(){
  if(document.getElementById('popup-fix-styles')) return;
  const style=document.createElement('style');
  style.id='popup-fix-styles';
  style.textContent=`
    html body.aksi-modal-open{overflow:hidden!important}
    .aksi-modal[data-popup-fix="true"]{
      position:fixed!important;
      inset:0!important;
      width:100vw!important;
      height:100vh!important;
      margin:0!important;
      padding:24px!important;
      box-sizing:border-box!important;
      background:rgba(4,25,18,.72)!important;
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      z-index:2147483647!important;
      overflow-y:auto!important;
      -webkit-overflow-scrolling:touch!important;
    }
    .aksi-modal[data-popup-fix="true"] .aksi-modal-panel{
      position:relative!important;
      width:min(760px,100%)!important;
      max-height:calc(100vh - 48px)!important;
      overflow-y:auto!important;
      box-sizing:border-box!important;
      margin:auto!important;
      padding:30px!important;
      border-radius:24px!important;
      background:#fff!important;
      color:#24352d!important;
      box-shadow:0 24px 80px rgba(0,0,0,.35)!important;
      border:1px solid rgba(24,73,51,.12)!important;
      font-family:inherit!important;
    }
    .aksi-modal[data-popup-fix="true"] .aksi-modal-close{
      position:absolute!important;
      top:14px!important;
      right:14px!important;
      width:42px!important;
      height:42px!important;
      min-width:42px!important;
      padding:0!important;
      border:0!important;
      border-radius:50%!important;
      background:#edf4ef!important;
      color:#173c2b!important;
      font-size:28px!important;
      line-height:42px!important;
      text-align:center!important;
      cursor:pointer!important;
      z-index:2!important;
    }
    .aksi-modal[data-popup-fix="true"] .aksi-modal-close:hover{
      background:#dcebe2!important;
    }
    .aksi-modal[data-popup-fix="true"] .aksi-modal-photo{
      display:block!important;
      width:100%!important;
      max-height:300px!important;
      object-fit:cover!important;
      border-radius:18px!important;
      margin:0 0 20px!important;
    }
    .aksi-modal[data-popup-fix="true"] .aksi-modal-icon{
      width:72px!important;
      height:72px!important;
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      border-radius:20px!important;
      background:#edf7f0!important;
      font-size:38px!important;
      margin:0 0 18px!important;
    }
    .aksi-modal[data-popup-fix="true"] .aksi-modal-type{
      display:inline-block!important;
      margin-bottom:8px!important;
      font-size:13px!important;
      font-weight:800!important;
      letter-spacing:.08em!important;
      color:#b08a24!important;
    }
    .aksi-modal[data-popup-fix="true"] h2{
      margin:0 45px 12px 0!important;
      font-size:clamp(25px,4vw,36px)!important;
      line-height:1.15!important;
      color:#173c2b!important;
    }
    .aksi-modal[data-popup-fix="true"] .aksi-modal-panel>p{
      margin:0 0 22px!important;
      font-size:16px!important;
      line-height:1.7!important;
      color:#4b5b52!important;
    }
    .aksi-modal[data-popup-fix="true"] .aksi-detail-grid{
      display:grid!important;
      grid-template-columns:repeat(2,minmax(0,1fr))!important;
      gap:14px!important;
      margin-top:18px!important;
    }
    .aksi-modal[data-popup-fix="true"] .aksi-detail-box{
      display:flex!important;
      flex-direction:column!important;
      gap:8px!important;
      padding:18px!important;
      border-radius:16px!important;
      background:#f4f8f5!important;
      border:1px solid #e1ebe4!important;
    }
    .aksi-modal[data-popup-fix="true"] .aksi-detail-box strong{
      color:#173c2b!important;
      font-size:15px!important;
    }
    .aksi-modal[data-popup-fix="true"] .aksi-detail-box span{
      color:#53645b!important;
      line-height:1.55!important;
      font-size:14px!important;
    }
    .aksi-modal[data-popup-fix="true"] .aksi-modal-note{
      margin-top:18px!important;
      padding-top:16px!important;
      border-top:1px solid #e5ece7!important;
      color:#65756c!important;
      font-size:14px!important;
    }
    .aksi-modal[data-popup-fix="true"] .aksi-audio-box{
      margin:18px 0!important;
      padding:16px!important;
      border-radius:16px!important;
      background:#f4f8f5!important;
    }
    .aksi-modal[data-popup-fix="true"] audio{width:100%!important}
    @media(max-width:640px){
      .aksi-modal[data-popup-fix="true"]{
        padding:12px!important;
        align-items:flex-start!important;
      }
      .aksi-modal[data-popup-fix="true"] .aksi-modal-panel{
        max-height:calc(100vh - 24px)!important;
        padding:22px!important;
        border-radius:20px!important;
      }
      .aksi-modal[data-popup-fix="true"] .aksi-detail-grid{
        grid-template-columns:1fr!important;
      }
      .aksi-modal[data-popup-fix="true"] .aksi-modal-close{
        top:10px!important;
        right:10px!important;
      }
    }
  `;
  document.head.appendChild(style);
}

/* SAPA BALI: hilangkan duplikasi tanpa pernah menghapus section SAPA BALI yang valid. */
function dedupeSapa(){
  const navSelectors=['nav.links a[href="#sapa-bali"]','nav a[href="#sapa-bali"]','a[href="#sapa-bali"]'];
  const nav=[];
  navSelectors.forEach(sel=>document.querySelectorAll(sel).forEach(a=>{if(!nav.includes(a))nav.push(a)}));
  nav.slice(1).forEach(a=>a.remove());

  /* Hanya deduplikasi elemen yang memang memiliki ID SAPA BALI. Jangan
     mencari berdasarkan teks karena section lain dapat memuat kata SAPA BALI. */
  const sections=[...document.querySelectorAll('[id="sapa-bali"]')];
  sections.slice(1).forEach(s=>s.remove());
}

function boot(){injectPopupStyles();wireCards();dedupeSapa();[500,1500,3000].forEach(t=>setTimeout(()=>{wireCards();dedupeSapa()},t))}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();window.openAksi=openPopup;window.closeAksi=closePopup;


document.addEventListener('keydown',e=>{
  if(e.key==='Escape') closePopup();
});

