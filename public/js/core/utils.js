export function esc(v){return String(v??"").replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]))}
export function btn(t,c="btn"){return `<button class="${c}">${esc(t)}</button>`}
export function topbar(t,s,a=""){return `<header class="top"><div><h1>${esc(t)}</h1><p>${esc(s)}</p></div><div class="actions">${a}</div></header>`}
export function stat(label,value,delta){return `<div class="card"><div class="muted">${esc(label)}</div><div class="stat">${esc(value)}</div><div class="up">${esc(delta)}</div></div>`}
