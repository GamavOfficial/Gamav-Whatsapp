export function escapeHtml(value){
  return String(value ?? "").replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
}
export function iconButton(title,icon,id=""){return `<button class="btn ghost" ${id?`id="${id}"`:''} title="${title}">${icon}</button>`}
export function topbar(title,subtitle="",actions=""){
  return `<header class="page-top"><div class="page-title"><h1>${escapeHtml(title)}</h1><p>${escapeHtml(subtitle)}</p></div><div class="page-actions">${actions}</div></header>`;
}
export function btn(text,cls="btn"){return `<button class="${cls}">${escapeHtml(text)}</button>`}
export function statCard(label,value,delta){return `<div class="card"><div class="muted">${escapeHtml(label)}</div><div class="stat-big">${escapeHtml(value)}</div><div class="positive">${escapeHtml(delta)}</div></div>`}
export function formatNow(){return new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}
