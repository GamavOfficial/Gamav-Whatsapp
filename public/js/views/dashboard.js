import {topbar,btn,statCard} from "../core/utils.js";
export function renderDashboard(){
  return topbar("Overview","WhatsApp automation at a glance",btn("＋ Create Bot","btn primary"))+
  `<div class="content">
    <div class="grid stats">
      ${statCard("Active Contacts","12,842","+8.4%")}
      ${statCard("Messages Today","4,291","+12.7%")}
      ${statCard("Active Flows","18","+2")}
      ${statCard("Human Handoffs","37","-4.1%")}
    </div>
    <div class="grid two-col section">
      <div class="card">
        <h2>Recent activity</h2>
        <table class="table"><tr><th>Event</th><th>Contact</th><th>Flow</th><th>Status</th></tr>
        <tr><td>Flow completed</td><td>+91 98••••21</td><td>Lead Capture</td><td><span class="pill">Success</span></td></tr>
        <tr><td>Human handoff</td><td>+91 97••••42</td><td>Support</td><td><span class="pill">Assigned</span></td></tr>
        <tr><td>Template sent</td><td>+91 90••••08</td><td>Order Update</td><td><span class="pill">Delivered</span></td></tr></table>
      </div>
      <div class="card">
        <h2>WhatsApp account</h2>
        <p>GAMAV Business</p><span class="pill">● Connected</span>
        <p class="muted">Quality: High · Cloud API · Webhook Verified</p>
        <button class="btn" data-go="Connect Account">Manage</button>
      </div>
    </div>
    <div class="grid three-col section">
      <div class="card"><h2>Automation</h2><p class="muted">18 active flows · 6 sequences · 34 labels</p><button class="btn" data-go="Bot Builder">Open Builder</button></div>
      <div class="card"><h2>AI</h2><p class="muted">2 agents · knowledge base synced</p><button class="btn" data-go="AI Agent">Manage AI</button></div>
      <div class="card"><h2>Developer</h2><p class="muted">API keys · webhook logs · integrations</p><button class="btn" data-go="API & Webhooks">Open API</button></div>
    </div>
  </div>`;
}
