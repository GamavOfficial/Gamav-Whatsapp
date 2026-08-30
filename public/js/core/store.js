const KEY="gamav-whatsapp-v5";
const seed={
 activePage:"Bot Builder",
 workspace:{name:"GAMAV Business",timezone:"Asia/Kolkata",language:"English"},
 whatsapp:{status:"Connected",phone:"+91 ••••••3210",quality:"High",api:"Cloud API",webhook:"Verified"},
 labels:["Lead","VIP","Paid","Pending","Support","New Customer"],
 customFields:["order_id","city","membership","customer_type","email"],
 contacts:[
  {id:"c1",name:"Arun Kumar",phone:"+91 98••••21",labels:["Lead","VIP"],email:"arun@example.com",notes:"Order GM10245"},
  {id:"c2",name:"Priya S",phone:"+91 97••••42",labels:["Support"],email:"priya@example.com",notes:"Callback"},
  {id:"c3",name:"GAMAV Store",phone:"+91 90••••08",labels:["Paid"],email:"",notes:"Retail"},
  {id:"c4",name:"Rahul",phone:"+91 88••••77",labels:["Pending"],email:"",notes:"Payment pending"}
 ],
 messages:[
  {contactId:"c1",dir:"in",text:"Hi, I need help with my order.",time:"10:24"},
  {contactId:"c1",dir:"out",text:"Sure! Please share your order ID.",time:"10:25"},
  {contactId:"c1",dir:"in",text:"GM10245",time:"10:26"},
  {contactId:"c1",dir:"out",text:"Thanks. I'm checking that now…",time:"10:26"}
 ],
 bots:{name:"Welcome & Support Bot",enabled:true,nodes:[],edges:[]}
};
export function load(){try{const s=localStorage.getItem(KEY);return s?merge(structuredClone(seed),JSON.parse(s)):structuredClone(seed)}catch{return structuredClone(seed)}}
export function save(store){localStorage.setItem(KEY,JSON.stringify(store))}
function merge(a,b){for(const [k,v] of Object.entries(b||{})){if(v&&typeof v==="object"&&!Array.isArray(v)&&a[k])a[k]=merge(a[k],v);else a[k]=v}return a}
