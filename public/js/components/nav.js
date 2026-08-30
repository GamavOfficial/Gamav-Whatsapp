const NAV = [
  ["DASHBOARD",[["Overview","▦"]]],
  ["WHATSAPP",[["Shared Inbox","▣","4"],["Contacts & CRM","◉"],["Connect Account","⌁"],["Bot Builder","⌘"],["WhatsApp Flows","▱"],["Templates","▤"]]],
  ["AUTOMATION",[["Sequences","◌"],["Broadcast / Campaigns","↗"],["Labels","🏷"],["Custom Fields","≡"],["Action Buttons","⚡"]]],
  ["COMMERCE",[["Product Catalog","🛒"],["Orders","▣"],["Appointments","◷"]]],
  ["AI",[["AI Agent","✦"],["Knowledge Base","▤"]]],
  ["INSIGHTS",[["Analytics","◔"],["Logs","≋"]]],
  ["DEVELOPER",[["API & Webhooks","⇄"],["Integrations","⊞"]]],
  ["SYSTEM",[["Team & Roles","♙"],["Settings","⚙"]]]
];

export function renderSidebar(active,onNavigate){
  const side=document.getElementById("sidebar");
  side.innerHTML=`
    <div class="brand"><div class="logo">G</div><div><b>GAMAV</b><small>WHATSAPP PRO</small></div></div>
    <button class="workspace-switch">● GAMAV Business <span>⌄</span><small style="display:block;color:#718995;margin-top:3px">WhatsApp · Connected</small></button>
    <div class="sidebar-scroll"></div>
    <div class="side-bottom">
      <button data-help>❔ Help Center</button>
      <button data-settings>⚙ Settings</button>
      <div class="user"><div class="avatar">G</div><div><b>GAMAV Admin</b><small>Owner</small></div></div>
    </div>`;
  const scroll=side.querySelector(".sidebar-scroll");
  NAV.forEach(([group,items])=>{
    const g=document.createElement("div");g.className="nav-group";
    g.innerHTML=`<div class="nav-group-title">${group}</div>`;
    items.forEach(([name,icon,count])=>{
      const b=document.createElement("button");b.className="nav-item "+(name===active?"active":"");b.innerHTML=`<span>${icon}</span>${name}${count?`<span class="count">${count}</span>`:""}`;
      b.onclick=()=>onNavigate(name);g.appendChild(b);
    });
    scroll.appendChild(g);
  });
  side.querySelector("[data-settings]").onclick=()=>onNavigate("Settings");
  side.querySelector("[data-help]").onclick=()=>onNavigate("Help Center");
}
export function renderMobileHeader(onMenu){
  document.getElementById("mobileHeader").innerHTML=`<button id="hamb">☰</button><b>GAMAV WhatsApp</b><button id="quickSave">✓</button>`;
  document.getElementById("hamb").onclick=()=>document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("quickSave").onclick=()=>window.dispatchEvent(new CustomEvent("gamav:save"));
}

