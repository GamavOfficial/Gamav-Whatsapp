import {load,save} from "./core/store.js";
import {sidebar,mobileHeader} from "./components/nav.js";
import {toast} from "./components/modal.js";
import {topbar} from "./core/utils.js";
import * as dashboard from "./views/dashboard.js";
import * as inbox from "./views/inbox.js";
import * as settings from "./views/settings.js";
import * as connect from "./views/connect.js";
import * as flows from "./views/flows.js";
import {render as builderRender,init as builderInit} from "./views/builder.js";
import * as generic from "./views/generic.js";

const store=load();

const G={
"Templates":["Templates","Reusable WhatsApp message templates",["welcome_customer","order_update","payment_received"]],
"Sequences":["Sequences","Timed follow-ups and subscriber automation",["Welcome Sequence","Lead Nurture","Payment Reminder"]],
"Broadcast / Campaigns":["Broadcast / Campaigns","Audience, scheduling and template messaging",["August Offer","Order Updates"]],
"Labels":["Labels","Segment conversations and customers",store.labels],
"Custom Fields":["Custom Fields","Store customer-specific data",store.customFields],
"Action Buttons":["Action Buttons","No Match, unsubscribe and reusable actions",["No Match","Unsubscribe","Transfer to Agent"]],
"Product Catalog":["Product Catalog","WhatsApp commerce and product sections",["GAMAV Store"]],
"Orders":["Orders","Order records and status automation",["GM10245","GM10246"]],
"Appointments":["Appointments","Booking and follow-up automation",["Demo Call","Support Slot"]],
"AI Agent":["AI Agent","Prompts, tools, actions and knowledge",["GAMAV Sales Agent","GAMAV Support Agent"]],
"Knowledge Base":["Knowledge Base","FAQs, URLs, files and business knowledge",["Product Docs","Support FAQ"]],
"Analytics":["Analytics","Messages, flow performance and conversion metrics",["Overview","Bot Performance","Campaign Performance"]],
"Logs":["Logs","Webhook events, API requests and errors",["Webhook events","API requests","Flow errors"]],
"API & Webhooks":["API & Webhooks","Keys, endpoints, webhook URLs and delivery logs",["Production API","WhatsApp Webhook"]],
"Integrations":["Integrations","Connect backend services",["HTTP API","CRM","Payment Gateway"]],
"Team & Roles":["Team & Roles","Agents, groups, roles and permissions",["GAMAV Admin","Support Team","Sales Team"]]
};

function go(p){store.activePage=p;save(store);render();document.getElementById("sidebar").classList.remove("open")}
function render(){
 sidebar(store.activePage,go);mobileHeader();
 const root=document.getElementById("appView");
 if(store.activePage==="Overview")root.innerHTML=dashboard.view();
 else if(store.activePage==="Shared Inbox")root.innerHTML=inbox.view(store);
 else if(store.activePage==="Settings")root.innerHTML=settings.view();
 else if(store.activePage==="Connect Account")root.innerHTML=connect.view();
 else if(store.activePage==="WhatsApp Flows")root.innerHTML=flows.view();
 else if(store.activePage==="Bot Builder"){root.innerHTML=builderRender(store);builderInit(store)}
 else if(store.activePage==="Help Center")root.innerHTML=topbar("Help Center","GAMAV WhatsApp documentation");
 else if(G[store.activePage]){const [a,b,c]=G[store.activePage];root.innerHTML=generic.view(a,b,c)}
 else root.innerHTML=generic.view(store.activePage,"GAMAV WhatsApp workspace",["Example configuration","Default automation"]);
 const composer=document.getElementById("composer");
 if(composer)composer.onsubmit=e=>{e.preventDefault();const t=new FormData(composer).get("text")?.toString().trim();if(!t)return;store.messages.push({contactId:"c1",dir:"out",text:t,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})});save(store);render();toast("Mock message added ✓")};
}
window.addEventListener("gamav:save",()=>{save(store);toast("Workspace saved ✓")});
render();
