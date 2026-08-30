const groups=[
 ["DASHBOARD",[["Overview","▦"]]],
 ["WHATSAPP",[["Shared Inbox","▣","4"],["Contacts & CRM","◉"],["Connect Account","⌁"],["Bot Builder","⌘"],["WhatsApp Flows","▱"],["Templates","▤"]]],
 ["AUTOMATION",[["Sequences","◌"],["Broadcast / Campaigns","↗"],["Labels","🏷"],["Custom Fields","≡"],["Action Buttons","⚡"]]],
 ["COMMERCE",[["Product Catalog","🛒"],["Orders","▣"],["Appointments","◷"]]],
 ["AI",[["AI Agent","✦"],["Knowledge Base","▤"]]],
 ["INSIGHTS",[["Analytics","◔"],["Logs","≋"]]],
 ["DEVELOPER",[["API & Webhooks","⇄"],["Integrations","⊞"]]],
 ["SYSTEM",[["Team & Roles","♙"],["Settings","⚙"]]]
];
export function sidebar(active,go){
 const s=document.getElementById("sidebar");
 s.innerHTML=`<div class="brand"><div class="logo">G</div><div><b>GAMAV</b><small>WHATSAPP PRO</small></div></div><button class="workspace">● GAMAV Business <span>⌄</span><small>WhatsApp · Connected</small></button><div class="navscroll"></div><div class="sidebottom"><button data-help>❔ Help Center</button><button data-settings>⚙ Settings</button><div class="user"><div class="avatar">G</div><div><b>GAMAV Admin</b><small>Owner</small></div></div></div>`;
 const n=s.querySelector(".navscroll");groups.forEach(([g,items])=>{const w=document.createElement("div");w.className="navgroup";w.innerHTML=`<div class="navtitle">${g}</div>`;items.forEach(([name,icon,count])=>{const b=document.createElement("button");b.className="navitem "+(name===active?"active":"");b.innerHTML=`<span>${icon}</span>${name}${count?`<span class="navcount">${count}</span>`:""}`;b.onclick=()=>go(name);w.appendChild(b)});n.appendChild(w)});
 s.querySelector("[data-settings]").onclick=()=>go("Settings");s.querySelector("[data-help]").onclick=()=>go("Help Center");
}
export function mobileHeader(){
 document.getElementById("mobileHeader").innerHTML=`<button id="hamb">☰</button><b>GAMAV WhatsApp</b><button id="qsave">✓</button>`;
 document.getElementById("hamb").onclick=()=>document.getElementById("sidebar").classList.toggle("open");
 document.getElementById("qsave").onclick=()=>window.dispatchEvent(new Event("gamav:save"));
}
