import {topbar,btn} from "../core/utils.js";
export function renderConnect(){
  return topbar("Connect Account","Official WhatsApp Business Platform connection",btn("＋ Connect New Account","btn primary"))+
  `<div class="content"><div class="grid two-col">
    <div class="card"><h2 style="font-size:14px">GAMAV Business WhatsApp</h2><p class="muted">Phone · +91 ••••••3210</p><p><span class="pill">● Connected</span></p>
      <table class="table"><tr><td>Messaging</td><td>WhatsApp Cloud API</td></tr><tr><td>Quality</td><td>High</td></tr><tr><td>Webhook</td><td>Verified</td></tr><tr><td>Business profile</td><td>Configured</td></tr></table>
      <button class="btn">Business Profile</button> <button class="btn">Webhook Settings</button>
    </div>
    <div class="card"><h2 style="font-size:14px">Credentials</h2><p class="muted">Masked values only.</p>
      <div class="field"><label>PHONE NUMBER ID</label><input class="input" value="••••••3210" readonly></div>
      <div class="field"><label>ACCESS TOKEN</label><input class="input" value="••••••••••••••••" readonly></div>
      <div class="field"><label>VERIFY TOKEN</label><input class="input" value="••••••••" readonly></div>
      <div class="notice">Use your backend server for real token storage, webhook verification and Graph API calls.</div>
    </div>
  </div></div>`;
}
