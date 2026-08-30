export function showModal(title,body){
  const host=document.getElementById("modalHost");
  host.innerHTML=`<div class="modal-backdrop" id="modalBackdrop"><div class="modal"><button class="modal-close" id="modalClose">×</button><h2>${title}</h2>${body}</div></div>`;
  document.getElementById("modalClose").onclick=closeModal;
  document.getElementById("modalBackdrop").onclick=e=>{if(e.target.id==="modalBackdrop")closeModal()};
}
export function closeModal(){document.getElementById("modalHost").innerHTML=""}
export function toast(message){
  const host=document.getElementById("toastHost");
  host.innerHTML=`<div class="toast show">${message}</div>`;
  setTimeout(()=>host.innerHTML="",1800);
}

