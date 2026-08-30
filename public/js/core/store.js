const STORAGE_KEY = "gamav_pro_v4_store";

const initial = {
  activePage: "Bot Builder",
  theme: "dark",
  workspace: {
    name: "GAMAV Business",
    timezone: "Asia/Kolkata",
    language: "English"
  },
  whatsapp: {
    status: "Connected",
    phone: "+91 ••••••3210",
    quality: "High",
    api: "Cloud API",
    webhook: "Verified"
  },
  contacts: [
    {id:"c1",name:"Arun Kumar",phone:"+91 98••••21",labels:["Lead","VIP"],email:"arun@example.com",notes:"Order GM10245"},
    {id:"c2",name:"Priya S",phone:"+91 97••••42",labels:["Support"],email:"priya@example.com",notes:"Needs callback"},
    {id:"c3",name:"GAMAV Store",phone:"+91 90••••08",labels:["Paid"],email:"",notes:"Retail account"},
    {id:"c4",name:"Rahul",phone:"+91 88••••77",labels:["Pending"],email:"",notes:"Payment pending"}
  ],
  labels:["Lead","VIP","Paid","Pending","Support","New Customer"],
  messages:[
    {contactId:"c1",dir:"in",text:"Hi, I need help with my order.",time:"10:24"},
    {contactId:"c1",dir:"out",text:"Sure! Please share your order ID.",time:"10:25"},
    {contactId:"c1",dir:"in",text:"GM10245",time:"10:26"},
    {contactId:"c1",dir:"out",text:"Thanks. I'm checking that now…",time:"10:26"}
  ],
  bots: {
    name:"Welcome & Support Bot",
    enabled:true,
    nodes:[],
    edges:[]
  },
  customFields:["order_id","city","membership","customer_type","email"],
  templates:[
    {name:"welcome_customer",category:"MARKETING",language:"en",status:"APPROVED"},
    {name:"order_update",category:"UTILITY",language:"en",status:"APPROVED"},
    {name:"payment_received",category:"UTILITY",language:"en",status:"DRAFT"}
  ]
};

export function loadStore(){
  try{
    const saved = localStorage.getItem(STORAGE_KEY);
    if(saved) return merge(structuredClone(initial), JSON.parse(saved));
  }catch{}
  return structuredClone(initial);
}
export function saveStore(store){localStorage.setItem(STORAGE_KEY, JSON.stringify(store))}
function merge(a,b){
  for(const [k,v] of Object.entries(b||{})){
    if(v && typeof v==="object" && !Array.isArray(v) && a[k]) a[k]=merge(a[k],v);
    else a[k]=v;
  }
  return a;
}

