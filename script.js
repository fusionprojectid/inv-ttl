const idr = new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0});
const tBody = document.querySelector('#items tbody');
const sumSubtotal = document.getElementById('sumSubtotal');
const sumGrand = document.getElementById('sumGrand');
const dpEditable = document.getElementById('sumDP');

function parseCurrency(t){
  if(!t) return 0;
  // Hapus karakter non-angka
  const n = (' '+t).replace(/[^0-9]/g,'');
  return Number(n||0);
}

function makeRow(desc='', price=0, qty=1){
  const tr = document.createElement('tr');
  // Jika harga 0, tampilkan kosong saja agar lebih bersih, kecuali jika memang ada nilainya
  const displayPrice = price === 0 ? '' : price;
  
  // Hitung subtotal awal
  const subTotal = price * qty;
  const displaySub = subTotal === 0 ? 'Rp0' : idr.format(subTotal);

  tr.innerHTML=`<td class="col-no">-</td>
                <td class="col-desc" contenteditable placeholder="Deskripsi item...">${desc}</td>
                <td class="col-price" contenteditable>${displayPrice}</td>
                <td class="col-qty" contenteditable>${qty}</td>
                <td class="col-sub">${displaySub}</td>`;
  tBody.appendChild(tr);
  refreshNumbers(); // Update nomor urut
  return tr;
}

function refreshNumbers(){
  let i = 1;
  tBody.querySelectorAll('tr').forEach(tr => {
    tr.querySelector('.col-no').textContent = i++;
  });
}

function calculateTotal(){
  let sub = 0;
  tBody.querySelectorAll('tr').forEach(tr => {
    const p = parseCurrency(tr.querySelector('.col-price').textContent);
    const q = parseInt(tr.querySelector('.col-qty').textContent)||0;
    const s = p * q;
    
    sub += s;
    tr.querySelector('.col-sub').textContent = idr.format(s);
  });
  
  sumSubtotal.textContent = idr.format(sub);
  const dp = parseCurrency(dpEditable.textContent);
  sumGrand.textContent = idr.format(Math.max(0, sub - dp));
}

// Fungsi untuk mengecek apakah baris sudah terisi
function isRowFilled(tr) {
  const desc = tr.querySelector('.col-desc').textContent.trim();
  const priceText = tr.querySelector('.col-price').textContent.trim();
  
  // Baris dianggap "diisi" jika deskripsi ada isinya ATAU harga ada isinya
  return desc.length > 0 || (priceText.length > 0 && priceText !== '0');
}

// Event Listener Utama pada Tabel
tBody.addEventListener('input', (e) => {
  // 1. Hitung ulang total setiap kali mengetik
  calculateTotal();

  // 2. Logika Auto-Add Row
  const rows = tBody.querySelectorAll('tr');
  const lastRow = rows[rows.length - 1];

  // Jika user sedang mengetik di baris terakhir, dan baris itu sudah mulai terisi
  if (lastRow && lastRow.contains(e.target)) {
    if (isRowFilled(lastRow)) {
      makeRow('', 0, 1); // Tambah baris kosong baru di bawahnya
    }
  }
});

dpEditable.addEventListener('input', calculateTotal);

// --- Inisialisasi Data Awal ---
makeRow('Desain & Produksi', 1500000, 1); // Item contoh
makeRow('', 0, 1); // Baris kosong awal untuk memancing input

// Tombol Tambah Item Manual (tetap ada sebagai opsi)
document.getElementById('addItemBtn').addEventListener('click', () => {
  makeRow('', 0, 1);
});

// Tombol Print
document.getElementById('printBtn').addEventListener('click',()=>window.print());

// Tombol Export PDF
document.getElementById('exportPDF').addEventListener('click',()=>{
  const el=document.getElementById('sheet');
  const originalHeight = el.style.height;
  el.style.height = 'auto';

  const opt={
    margin:[10, 10, 10, 10],
    filename:'Invoice-Tritunggal-Lancar.pdf',
    image:{type:'jpeg',quality:1},
    html2canvas:{useCORS:true, scrollY:0, scrollX:0, letterRendering: true},
    jsPDF:{unit:'mm', format:'a4', orientation:'portrait'},
    pagebreak: { mode: ['css', 'legacy'] },
    callback: function (pdf) {
        el.style.height = originalHeight;
        pdf.save(opt.filename);
    }
  };
  html2pdf().set(opt).from(el).toPdf().get('pdf').save();
});