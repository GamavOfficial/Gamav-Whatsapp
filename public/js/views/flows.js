import {topbar,btn} from "../core/utils.js";
export function renderFlows(){
  return topbar("WhatsApp Flows","Multi-screen forms, conditions, fields and JSON import",btn("Import Flow JSON","btn")+" "+btn("＋ New Screen","btn primary"))+
  `<div class="flow-layout">
    <aside class="flow-list"><button class="node-button">＋ Add Screen</button>
      ${["Welcome","Customer Details","Order Details","Confirmation"].map((x,i)=>`<div class="flow-screen ${i===1?"active":""}"><b>${i+1}. ${x}</b><p class="muted">${i===1?"Text + Email + Phone":"Form elements and actions"}</p></div>`).join("")}
      <button class="node-button">⇄ Connect Screens</button><button class="node-button">{} View / Edit JSON</button>
    </aside>
    <main style="overflow:auto;padding:16px"><div class="preview-phone"><div class="preview-head">GAMAV · Customer Form</div><div class="muted">Screen 2 / 4</div>
      <div class="preview-field">Name<br><span class="muted">Text Input · save to first_name</span></div>
      <div class="preview-field">Email<br><span class="muted">Email Input · save to email</span></div>
      <div class="preview-field">Upload ID<br><span class="muted">File Picker · optional</span></div>
      <div class="preview-field">Condition → membership == VIP</div>
      <div class="preview-field">THEN → VIP branch</div><div class="preview-field">ELSE → Standard branch</div>
      <div class="preview-button">Next</div>
    </div></main>
  </div>`;
}
