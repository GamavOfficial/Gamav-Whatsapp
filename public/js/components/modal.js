export function openModal(html){document.getElementById("modalHost").innerHTML=`<div class="modal-back" id="modalBack"><div class="modal">${html}</div></div>`;document.getElementById("modalBack").addEventListener("click",e=>{if(e.target.id==="modalBack")closeModal()})}
export function closeModal(){document.getElementById("modalHost").innerHTML=""}
export function toast(m){const h=document.getElementById("toastHost");h.innerHTML=`<div class="toast show">${m}</div>`;setTimeout(()=>h.innerHTML="",1700)}
