import {topbar,btn,esc} from "../core/utils.js";
import {openModal,closeModal,toast} from "../components/modal.js";

const TYPES={
 trigger:["⚡","Start Bot Flow",{keywords:"hi,hello,start",matching:"Exact Keyword Match",title:"Welcome Flow",addLabels:"",removeLabels:"",sequence:"",group:"",assignedUser:"",webhook:""}],
 text:["💬","Text Message",{message:"Hello {{first_name}}! Welcome to GAMAV.",delay:"0",custom:"first_name,phone,email,order_id"}],
 image:["🖼","Image Message",{source:"URL",url:"https://example.com/image.jpg",caption:"Welcome image",delay:"0"}],
 video:["🎬","Video Message",{source:"URL",url:"https://example.com/video.mp4",caption:"",delay:"0"}],
 audio:["🎵","Audio Message",{source:"URL",url:"https://example.com/audio.mp3",caption:"",delay:"0"}],
 file:["📄","File Message",{source:"URL",url:"https://example.com/file.pdf",filename:"document.pdf",caption:"",delay:"0"}],
 interactive:["🔘","Interactive Buttons",{message:"Choose an option",button1:"Products",button2:"Support",button3:"Website",action1:"Flow",action2:"Flow",action3:"URL",target1:"Products",target2:"Support",target3:"https://example.com",delay:"0"}],
 list:["☷","Interactive List",{message:"Select a category",button:"Open Menu",rows:"Products|Support|Contact us",targets:"Products|Support|Contact",delay:"0"}],
 condition:["◇","Condition",{match:"All Match",rule1:"{{customer_type}}",operator1:"equals",value1:"VIP",rule2:"",operator2:"equals",value2:""}],
 input:["⌨","User Input Flow",{campaign:"Lead Capture",webhook:"https://example.com/input",question1:"What is your order ID?",saveAs1:"order_id",type1:"Text",question2:"",saveAs2:"",type2:"Text"}],
 variable:["≡","Set Custom Field",{field:"customer_type",value:"lead"}],
 label:["🏷","Labels",{action:"Add",label:"VIP"}],
 sequence:["◌","Sequence",{action:"Subscribe",sequence:"Welcome Sequence"}],
 wait:["◷","Schedule / Wait",{amount:"5",unit:"seconds",mode:"relative"}],
 api:["⇄","API / Webhook",{method:"POST",url:"https://api.example.com/order",headers:"Content-Type: application/json",body:'{"order_id":"{{order_id}}"}',saveResponse:"api_result"}],
 template:["▤","WhatsApp Template",{template:"order_update",language:"en",variables:"{{order_id}}",fallback:""}],
 catalog:["🛒","E-commerce / Catalog",{catalog:"GAMAV Store",mode:"Multiple Products",section:"Best Sellers",products:""}],
 ai:["✦","AI Agent",{agent:"GAMAV Sales",prompt:"Answer using knowledge base. Ask for order ID when required.",tools:"catalog,order_lookup"}],
 human:["👤","Human Handoff",{group:"Support",user:"",reason:"Customer requested human",message:"Connecting you to an agent…"}],
 action:["⚡","Action Button",{action:"No Match",target:""}],
 end:["⏹","End Flow",{}]
};

const groups={
"TRIGGERS":["trigger"],"MESSAGES":["text","image","video","audio","file","interactive","list","template"],
"LOGIC":["condition","input","variable","label","sequence","wait","action"],
"INTEGRATIONS":["api","catalog"],"AI / HUMAN":["ai","human"],"END":["end"]
};

export function render(store){if(!store.bots.nodes.length){store.bots.nodes=[
{id:"n1",type:"trigger",x:100,y:130,fields:structuredClone(TYPES.trigger[2])},
{id:"n2",type:"text",x:420,y:130,fields:structuredClone(TYPES.text[2])},
{id:"n3",type:"interactive",x:740,y:130,fields:structuredClone(TYPES.interactive[2])},
{id:"n4",type:"condition",x:1060,y:130,fields:structuredClone(TYPES.condition[2])},
{id:"n5",type:"human",x:1380,y:80,fields:structuredClone(TYPES.human[2])},
{id:"n6",type:"end",x:1380,y:300,fields:structuredClone(TYPES.end[2])}
];store.bots.edges=[{from:"n1",to:"n2",branch:"default"},{from:"n2",to:"n3",branch:"default"},{from:"n3",to:"n4",branch:"default"},{from:"n4",to:"n5",branch:"yes"},{from:"n4",to:"n6",branch:"no"}]}
return topbar("Bot Builder","Visual WhatsApp automation · edit every component",
 `${btn("Undo","btn")+" "+btn("Redo","btn")+" "+btn("Import","btn")+" "+btn("Export","btn")+" "+btn("Save","btn primary")+" "+btn("Publish","btn")}`+
`<div class="builder"><aside class="pane left"><div class="panehead"><input id="builderSearch" class="input" placeholder="Search components…"></div><div id="palette"></div></aside><section class="canvaswrap"><div id="canvas" class="canvas"><svg id="edgeSvg" class="svg"></svg><div id="nodeLayer"></div></div><div class="buildertools"><div class="toolgroup"><button id="addTrigger">＋ Trigger</button><button id="addText">＋ Text</button><button id="addInteractive">＋ Interactive</button><button id="fit">Fit</button></div><div class="toolgroup"><button id="zout">−</button><button id="zlabel">100%</button><button id="zin">＋</button></div></div><div class="hint">Drag nodes • drag output ● to input ● • double-click a connection to delete • click Edit / double-click node to configure</div></section><aside class="pane right"><div class="panehead">QUICK EDIT</div><div id="quickInspector"></div></aside></div>`;
}

export function init(store){
 const b=store.bots;let selected=null,zoom=1,next=50,connecting=null;
 const layer=()=>document.getElementById("nodeLayer");
 const nBy=id=>b.nodes.find(n=>n.id===id);

 function palette(q=""){const p=document.getElementById("palette");p.innerHTML="";Object.entries(groups).forEach(([g,types])=>{let w=document.createElement("div");w.className="group";w.innerHTML=`<div class="gtitle">${g}</div>`;types.filter(t=>(TYPES[t][1]).toLowerCase().includes(q.toLowerCase())).forEach(t=>{let x=document.createElement("button");x.className="nodebtn";x.textContent=`${TYPES[t][0]} ${TYPES[t][1]}`;x.onclick=()=>add(t,220+b.nodes.length*30,120+b.nodes.length*18);w.appendChild(x)});p.appendChild(w)})}
 function add(type,x,y){const d=TYPES[type],node={id:"n"+(++next),type,x,y,fields:structuredClone(d[2])};b.nodes.push(node);selected=node.id;draw();openEditor(node)}
 function summary(n){return Object.entries(n.fields||{}).filter(([,v])=>v!=="").map(([k,v])=>`${k}: ${v}`).join("\n")}
 function draw(){layer().innerHTML="";b.nodes.forEach(n=>{let d=TYPES[n.type],e=document.createElement("div");e.className="flownode "+(selected===n.id?"selected":"");e.style.left=n.x+"px";e.style.top=n.y+"px";e.dataset.id=n.id;e.innerHTML=`<div class="nhead"><span>${d[0]} ${d[1]}</span><span style="color:#526c79">${n.id}</span></div><div class="nbody">${esc(summary(n))}</div><div class="hovertools"><button data-edit="${n.id}">Edit</button><button data-clone="${n.id}">Clone</button><button data-del="${n.id}">×</button></div>${n.type!=="trigger"?'<i class="port pin"></i>':""}${n.type==="condition"?'<i class="port yes" data-branch="yes"></i><i class="port no" data-branch="no"></i>':n.type!=="end"?'<i class="port pout" data-branch="default"></i>':""}`;layer().appendChild(e);drag(e,n);e.querySelectorAll("[data-edit]").forEach(x=>x.onclick=ev=>{ev.stopPropagation();openEditor(n)});e.querySelectorAll("[data-clone]").forEach(x=>x.onclick=ev=>{ev.stopPropagation();clone(n)});e.querySelectorAll("[data-del]").forEach(x=>x.onclick=ev=>{ev.stopPropagation();del(n.id)});e.ondblclick=()=>openEditor(n);e.onclick=()=>{selected=n.id;quick(n);draw()};e.querySelectorAll(".pout,.yes,.no").forEach(p=>p.onpointerdown=ev=>{ev.stopPropagation();connecting={from:n.id,branch:p.dataset.branch||"default"}});e.querySelector(".pin")?.addEventListener("pointerup",ev=>{ev.stopPropagation();if(connecting&&connecting.from!==n.id){b.edges.push({from:connecting.from,to:n.id,branch:connecting.branch});connecting=null;draw();toast("Connected ✓")}})});edges();quick(nBy(selected))}
 function drag(el,n){let sx=0,sy=0,ox=0,oy=0,m=false;el.onpointerdown=e=>{if(e.target.classList.contains("port")||e.target.closest(".hovertools"))return;sx=e.clientX;sy=e.clientY;ox=n.x;oy=n.y;m=true;el.setPointerCapture(e.pointerId)};el.onpointermove=e=>{if(!m)return;n.x=ox+(e.clientX-sx)/zoom;n.y=oy+(e.clientY-sy)/zoom;el.style.left=n.x+"px";el.style.top=n.y+"px";edges()};el.onpointerup=()=>m=false}
 function edges(){const s=document.getElementById("edgeSvg");if(!s)return;s.innerHTML="";b.edges.forEach((e,i)=>{let a=nBy(e.from),c=nBy(e.to);if(!a||!c)return;let x1=a.x+255,y1=a.y+48+(e.branch==="yes"?-16:e.branch==="no"?20:0),x2=c.x,y2=c.y+48,dx=Math.max(70,(x2-x1)/2),p=`M${x1} ${y1} C${x1+dx} ${y1},${x2-dx} ${y2},${x2} ${y2}`;s.innerHTML+=`<path class="hit" data-i="${i}" d="${p}"></path><path class="edge" d="${p}"></path>`});s.querySelectorAll(".hit").forEach(x=>x.ondblclick=()=>{b.edges.splice(+x.dataset.i,1);edges();toast("Connection removed")})}
 function quick(n){const q=document.getElementById("quickInspector");if(!q)return;if(!n){q.innerHTML='<div class="insgroup muted">Select a node.</div>';return}q.innerHTML=`<div class="insgroup"><div class="institle">${TYPES[n.type][0]} ${TYPES[n.type][1]}</div><div class="muted">ID: ${n.id}</div></div><div class="insgroup"><button class="btn primary" id="quickEdit">Open Full Editor</button></div><div class="insgroup"><label class="muted">VARIABLES</label><p>${["first_name","phone","email","order_id","custom_field"].map(v=>`<span class="var">{{${v}}}</span>`).join("")}</p></div>`;q.querySelector("#quickEdit").onclick=()=>openEditor(n)}
 function clone(n){b.nodes.push({...n,id:"n"+(++next),x:n.x+40,y:n.y+40,fields:structuredClone(n.fields)});draw();toast("Node cloned ✓")}
 function del(id){b.nodes=b.nodes.filter(n=>n.id!==id);b.edges=b.edges.filter(e=>e.from!==id&&e.to!==id);if(selected===id)selected=null;draw();toast("Node deleted")}
 function setZoom(z){zoom=Math.max(.5,Math.min(1.7,z));document.getElementById("canvas").style.transform=`scale(${zoom})`;document.getElementById("zlabel").textContent=Math.round(zoom*100)+"%";edges()}
 function openEditor(n){
   let fields=structuredClone(n.fields||{});let tab="general";
   const d=TYPES[n.type];
   const fieldEntries=()=>Object.entries(fields).map(([k,v])=>`<div class="field"><label>${k.replaceAll("_"," ").toUpperCase()}</label>${String(v).length>75||["message","body","prompt","headers","webhook"].includes(k)?`<textarea class="input textarea" data-field="${k}">${esc(v)}</textarea>`:`<input class="input" data-field="${k}" value="${esc(v)}">`}</div>`).join("");
   const tabs=["General","Content","Buttons","Variables","Conditions","Advanced"];
   function body(){if(n.type==="interactive")return `<div class="field"><label>MESSAGE</label><textarea class="input textarea" data-special="message">${esc(fields.message||"")}</textarea></div>${[1,2,3].map(i=>`<div class="button-editor"><b>Button ${i}</b><div class="button-row"><div class="field"><label>BUTTON NAME</label><input class="input" data-special="button${i}" value="${esc(fields["button"+i]||"")}"></div><div class="field"><label>ACTION</label><select class="input" data-special="action${i}"><option>Flow</option><option>URL</option><option>Call</option><option>Sequence</option><option>Handoff</option></select></div><div class="field"><label>TARGET</label><input class="input" data-special="target${i}" value="${esc(fields["target"+i]||"")}"></div><button class="remove">Remove</button></div></div>`).join("")}<button class="btn">＋ Add Button</button>`;
     if(n.type==="condition")return `<div class="help">Choose whether <b>All Match</b> or <b>Any Match</b> must pass. Each rule can use system fields or custom fields. The YES/NO output sockets represent the two branches.</div>`+fieldEntries();
     if(n.type==="trigger")return `<div class="help">Trigger the flow with comma-separated keywords. Matching can be Exact Keyword Match or String Match. Add/remove labels, subscribe to a sequence, assign group/user and call a webhook.</div>`+fieldEntries();
     if(n.type==="input")return `<div class="help">User Input Flow stores answers in selected system/custom fields and can send captured data to a webhook.</div>`+fieldEntries();
     return fieldEntries();
   }
   function renderModal(){openModal(`<button class="close" id="close">×</button><h2>${d[0]} ${d[1]}</h2><div class="sub">${n.id} · Double-click node editor</div><div class="modal-tabs">${tabs.map((x,i)=>`<button class="modal-tab ${i===0?"active":""}" data-tab="${x.toLowerCase()}">${x}</button>`).join("")}</div><div class="modalpane" id="modalPane">${body()}</div><div class="modal-foot"><button class="btn danger" id="mDelete">Delete Node</button><button class="btn" id="mCancel">Cancel</button><button class="btn primary" id="mSave">Save Changes</button></div>`);
      document.getElementById("close").onclick=closeModal;document.getElementById("mCancel").onclick=closeModal;document.getElementById("mDelete").onclick=()=>{del(n.id);closeModal()};
      document.querySelectorAll("#modalPane [data-field]").forEach(x=>x.oninput=()=>fields[x.dataset.field]=x.value);
      document.querySelectorAll("#modalPane [data-special]").forEach(x=>x.oninput=()=>fields[x.dataset.special]=x.value);
      document.querySelectorAll(".modal-tab").forEach(x=>x.onclick=()=>{document.querySelectorAll(".modal-tab").forEach(t=>t.classList.remove("active"));x.classList.add("active");let t=x.dataset.tab;document.getElementById("modalPane").innerHTML=t==="buttons"&&n.type==="interactive"?body():fieldEntries()});
      document.getElementById("mSave").onclick=()=>{n.fields=fields;closeModal();draw();toast("Changes saved ✓")};
   }
   renderModal();
 }
 document.getElementById("builderSearch").oninput=e=>palette(e.target.value);
 document.getElementById("addTrigger").onclick=()=>add("trigger",100,110);document.getElementById("addText").onclick=()=>add("text",390,110);document.getElementById("addInteractive").onclick=()=>add("interactive",680,110);document.getElementById("fit").onclick=()=>setZoom(1);document.getElementById("zin").onclick=()=>setZoom(zoom+.1);document.getElementById("zout").onclick=()=>setZoom(zoom-.1);
 renderPaletteSafe();draw();
 function renderPaletteSafe(){palette("")}
}

