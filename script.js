const idr = new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0});
const tBody=document.querySelector('#items tbody');
const sumSubtotal=document.getElementById('sumSubtotal');
const sumGrand=document.getElementById('sumGrand');
const dpEditable=document.getElementById('sumDP');

function parseCurrency(t){if(!t)return 0;const n=(''+t).replace(/[^0-9]/g,'');return Number(n||0);}
function makeRow(desc='',price=0,qty=1){
  const tr=document.createElement('tr');
  tr.innerHTML=`<td class="col-no">-</td>
                <td class="col-desc" contenteditable>${desc}</td>
                <td class="col-price" contenteditable>${price}</td>
                <td class="col-qty" contenteditable>${qty}</td>
                <td class="col-sub">${idr.format(price*qty)}</td>`;
  tBody.appendChild(tr);refresh();return tr;
}
function refresh(){
  let sub=0,i=1;
  tBody.querySelectorAll('tr').forEach(tr=>{
    tr.querySelector('.col-no').textContent=i++;
    const p=parseCurrency(tr.querySelector('.col-price').textContent);
    const q=parseInt(tr.querySelector('.col-qty').textContent)||0;
    const s=p*q;sub+=s;tr.querySelector('.col-sub').textContent=idr.format(s);
  });
  sumSubtotal.textContent=idr.format(sub);
  const dp=parseCurrency(dpEditable.textContent);
  sumGrand.textContent=idr.format(Math.max(0,sub-dp));
}

dpEditable.addEventListener('input',refresh);
makeRow('Desain & Produksi',1500000,1);
tBody.addEventListener('input',refresh);

// Tombol Print (Satu-satunya tombol yang dipertahankan)
document.getElementById('printBtn').addEventListener('click',()=>window.print());

// Kode untuk exportPDF dihapus sepenuhnya.