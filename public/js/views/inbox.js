import {topbar,btn,escapeHtml} from "../core/utils.js";
export function renderInbox(store){
  const c=store.contacts[0];
  const msgs=store.messages.filter(m=>m.contactId===c.id);
  return topbar("Shared Inbox","Conversations, automation controls and agent actions",btn("＋ Add Contact","btn primary"))+
  `<div class="inbox-shell">
    <aside class="chat-list"><div class="chat-search"><input class="input" placeholder="Search conversations…"></div>
      ${store.contacts.map((x,i)=>`<div class="chat ${i===0?"active":""}"><b>${escapeHtml(x.name)}</b><p>${escapeHtml(store.messages.find(m=>m.contactId===x.id)?.text||"No messages yet")}</p></div>`).join("")}
    </aside>
    <section style="display:flex;flex-direction:column;min-width:0">
      <div class="messages" style="flex:1">${msgs.map(m=>`<div class="bubble ${m.dir==='out'?'out':'in'}">${escapeHtml(m.text)}<div style="opacity:.5;font-size:8px">${m.time}</div></div>`).join("")}</div>
      <form class="composer" id="composer"><input class="input" name="text" placeholder="Type a message…"><button class="btn">＋</button><button class="btn primary">Send</button></form>
    </section>
    <aside class="chat-profile">
      <div class="profile-section"><b>Customer Snapshot</b><p class="muted">${escapeHtml(c.name)} · ${escapeHtml(c.phone)}</p></div>
      <div class="profile-section"><label class="muted">ENGAGEMENT</label><p>Score <b>84</b> · Active</p><span class="pill">Inside 24h window</span></div>
      <div class="profile-section"><label class="muted">LABELS</label><p>${c.labels.map(l=>`<span class="chip">${escapeHtml(l)}</span>`).join("")}</p><button class="btn">＋ Add Label</button></div>
      <div class="profile-section"><label class="muted">BOT / AI</label><p>● Bot Active</p><button class="btn">Pause Bot</button> <button class="btn">Pause AI</button></div>
      <div class="profile-section"><label class="muted">ACTIONS</label><p><button class="btn">Schedule</button> <button class="btn">Google Meet</button></p><p><button class="btn">Assign Agent</button> <button class="btn">Add Note</button></p><p><button class="btn">Add Sequence</button> <button class="btn">Start Flow</button></p></div>
      <div class="profile-section"><label class="muted">CUSTOM FIELDS</label><p class="muted">order_id = GM10245<br>city = Chennai<br>membership = VIP</p></div>
    </aside>
  </div>`;
}
