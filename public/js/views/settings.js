import {topbar,btn} from "../core/utils.js";
export function renderSettings(){
  const sections=["General","WhatsApp Account","Business Profile","Business Hours","Notifications","Team & Roles","API & Webhooks","Security","Billing"];
  return topbar("Settings","Workspace, WhatsApp, permissions, security and billing",btn("Save Changes","btn primary"))+
  `<div class="content"><div class="settings-layout">
    <aside class="settings-nav">${sections.map((x,i)=>`<button class="${i===0?"active":""}">${x}</button>`).join("")}</aside>
    <section class="card">
      <h2 style="font-size:14px;margin-top:0">General Settings</h2>
      <div class="field"><label>WORKSPACE NAME</label><input class="input" value="GAMAV Business"></div>
      <div class="field"><label>TIMEZONE</label><select class="input"><option>Asia/Kolkata (IST)</option><option>UTC</option></select></div>
      <div class="field"><label>DEFAULT LANGUAGE</label><select class="input"><option>English</option><option>Tamil</option></select></div>
      ${["Enable message logs","Notify agents for assigned chats","Enable flow versioning","Require 2FA for admins","Enable webhook retries","Enable API audit logs"].map((x,i)=>`<div class="switch-row"><span>${x}</span><span class="toggle ${i<5?"on":""}"><i></i></span></div>`).join("")}
      <div class="notice" style="margin-top:14px">Production note: Meta WhatsApp credentials belong on the backend. Never place access tokens in GitHub Pages frontend code.</div>
    </section>
  </div></div>`;
}
