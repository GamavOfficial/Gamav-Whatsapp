import {loadStore,saveStore} from "./core/store.js";
import {renderSidebar,renderMobileHeader} from "./components/nav.js";
import {toast,showModal} from "./components/modal.js";
import {renderDashboard} from "./views/dashboard.js";
import {renderInbox} from "./views/inbox.js";
import {renderGeneric} from "./views/generic.js";
import {renderSettings} from "./views/settings.js";
import {renderConnect} from "./views/connect.js";
import {renderFlows} from "./views/flows.js";
import {builderView,initBuilder} from "./views/builder.js";
import {renderHelp} from "./views/help.js";

const store=loadStore();

const genericMap={
"Templates":["Templates","Reusable WhatsApp message templates",["welcome_customer","order_update","payment_received"]],
"Sequences":["Sequences","Timed follow-ups and subscriber automation",["Welcome Sequence","Lead Nurture","Payment Reminder"]],
"Broadcast / Campaigns":["Broadcast / Campaigns","Audience, scheduling and template messaging",["August Offer","Order Updates"]],
"Labels":["Labels","Segment conversations and customers",store.labels],
"Custom Fields":["Custom Fields","Store customer-specific data",store.customFields],
"Action Buttons":["Action Buttons","No Match, unsubscribe and reusable button actions",["No Match","Unsubscribe","Transfer to Agent"]],
"Product Catalog":["Product Catalog","WhatsApp commerce and product sections",["GAMAV Store"]],
"Orders":["Orders","Order records and status automation",["GM10245","GM10246"]],
"Appointments":["Appointments","Booking and follow-up automation",["Demo Call","Support Slot"]],
"AI Agent":["AI Agent","Prompts, tools, actions and business knowledge",["GAMAV Sales Agent","GAMAV Support Agent"]],
"Knowledge Base":["Knowledge Base","FAQs, URLs, files and business knowledge",["Product Docs","Support FAQ"]],
"Analytics":["Analytics","Messages, flow performance and conversion metrics",["Overview","Bot Performance","Campaign Performance"]],
"Logs":["Logs","Webhook events, API requests and flow errors",["Webhook events","API requests","Flow errors"]],
"API & Webhooks":["API & Webhooks","Keys, endpoints, webhook URLs and delivery logs",["Production API","WhatsApp Webhook"]],
"Integrations":["Integrations","Connect your backend services",["HTTP API","CRM","Payment Gateway"]],
"Team & Roles":["Team & Roles","Agents, groups, roles and permissions",["GAMAV Admin","Support Team","Sales Team"]]
};

function navigate(page){store.activePage=page;saveStore(store);render();if(innerWidth<=720)document.getElementById("sidebar").classList.remove("open")}
function render(){
  renderSidebar(store.activePage,navigate);renderMobileHeader();
  const root=document.getElementById("appView");
  if(store.activePage==="Overview") root.innerHTML=renderDashboard();
  else if(store.activePage==="Shared Inbox") root.innerHTML=renderInbox(store);
  else if(store.activePage==="Connect Account") root.innerHTML=renderConnect();
  else if(store.activePage==="WhatsApp Flows") root.innerHTML=renderFlows();
  else if(store.activePage==="Bot Builder"){root.innerHTML=builderView(store);initBuilder(store)}
  else if(store.activePage==="Settings") root.innerHTML=renderSettings();
  else if(store.activePage==="Help Center") root.innerHTML=renderHelp();
  else if(genericMap[store.activePage]){const [t,s,items]=genericMap[store.activePage];root.innerHTML=renderGeneric(t,s,items)}
  else root.innerHTML=renderGeneric(store.activePage,"GAMAV WhatsApp workspace",["Create your first item","Default automation","Example configuration"]);

  root.querySelectorAll("[data-go]").forEach(el=>el.onclick=()=>navigate(el.dataset.go));
  const composer=document.getElementById("composer");
  if(composer)composer.onsubmit=e=>{e.preventDefault();const text=new FormData(composer).get("text")?.toString().trim();if(!text)return;store.messages.push({contactId:"c1",dir:"out",text,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})});saveStore(store);render();toast("Message added to mock inbox ✓")};
}
window.addEventListener("gamav:save",()=>{saveStore(store);toast("Workspace saved ✓")});
render();

