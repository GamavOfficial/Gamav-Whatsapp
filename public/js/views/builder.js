import {topbar,btn,escapeHtml} from "../core/utils.js";
import {toast} from "../components/modal.js";

const TYPES={
 trigger:["⚡","Start Bot Flow",{keywords:"hi,hello,start",match:"Exact Keyword Match",title:"Welcome Flow",addLabel:"",removeLabel:"",subscribe:"",unsubscribe:"",group:"",user:"",webhook:""}],
 text:["💬","Text",{message:"Hello {{first_name}}! Welcome to GAMAV.",delay:"0"}],
 image:["🖼","Image",{url:"https://example.com/image.jpg",caption:"Welcome image"}],
 video:["🎬","Video",{url:"https://example.com/video.mp4",caption:""}],
 audio:["🎵","Audio",{url:"https://example.com/audio.mp3",caption:""}],
 file:["📄","File",{url:"https://example.com/file.pdf",filename:"document.pdf"}],
 interactive:["🔘","Interactive",{text:"Choose an option",buttons:"Products|Support|Website",actions:"Flow:Products|Flow:Support|URL:https://example.com"}],
 list:["☷","List",{text:"Select a category",rows:"New Arrivals|Offers|Support"}],
 condition:["◇","Condition",{mode:"All Match",rules:"{{customer_type}} equals VIP"}],
 input:["⌨","User Input Flow",{campaign:"Lead Capture",question:"What is your order ID?",saveAs:"order_id",replyType:"Text",webhook:""}],
 variable:["≡","Set Custom Field",{name:"customer_type",value:"lead"}],
 label:["🏷","Labels",{label:"VIP",action:"Add"}],
 sequence:["◌","Sequence",{name:"Welcome Sequence",action:"Subscribe"}],
 wait:["◷","Schedule / Wait",{duration:"5",unit:"seconds"}],
 api:["⇄","API / Webhook",{method:"POST",url:"https://api.example.com/order",body:'{"id":"{{order_id}}"}'}],
 template:["▤","Template",{name:"order_update",language:"en",variables:"{{order_id}}"}],
 catalog:["🛒","E-commerce",{catalogId:"CATALOG_ID",mode:"Multiple",section:"Best Sellers",products:""}],
 ai:["✦","AI Agent",{agent:"GAMAV Sales",instruction:"Use knowledge base; ask for order ID when needed."}],
 human:["👤","Human Handoff",{group:"Support",user:"",reason:"Customer requested human"}],
 action:["⚡","Action Button",{action:"No Match",target:""}],
 end:["⏹","End",{}]
};

const GROUPS={
"TRIGGERS":["trigger"],
"MESSAGES":["text","image","video","audio","file","interactive","list","template"],
"LOGIC":["condition","input","variable","label","sequence","wait","action"],
"INTEGRATIONS":["api","catalog"],
"AI / HUMAN":["ai","human"],
"END":["end"]
};

export function builderView(store){
  if(!store.bots.nodes.length){
    let a={id:"n1",type:"trigger",x:120,y:160,fields:structuredClone(TYPES.trigger[2])};
    let b={id:"n2",type:"text",x:450,y:160,fields:structuredClone(TYPES.text[2])};
    let c={id:"n3",type:"interactive",x:780,y:160,fields:structuredClone(TYPES.interactive[2])};
    store.bots.nodes=[a,b,c]; store.bots.edges=[{from:"n1",to:"n2",branch:"default"},{from:"n2",to:"n3",branch:"default"}];
  }
  return topbar("Bot Builder","Visual WhatsApp automation flow",
    btn("Undo","btn mobile-hide")+" "+btn("Redo","btn mobile-hide")+" "+btn("Import JSON","btn mobile-hide")+" "+btn("Export JSON","btn mobile-hide")+" "+btn("Save","btn primary")+" "+btn("Publish","btn"));
}

export function initBuilder(store){
  const host=document.getElementById("appView");
  host.insertAdjacentHTML("beforeend",
  `<div class="builder-shell"><aside class="builder-pane left"><div class="pane-head"><input id="nodeSearch" class="input" placeholder="Search components…"></div><div id="palette"></div></aside>
  <section class="canvas-wrap"><div id="canvas" class="canvas"><svg id="edges" class="canvas-svg"></svg><div id="nodes"></div></div>
    <div class="builder-tools"><div class="tool-group"><button id="addTrigger">＋ Trigger</button><button id="addText">＋ Text</button><button id="addInteractive">＋ Interactive</button><button id="fit">Fit</button></div><div class="tool-group"><button id="zoomOut">−</button><button id="zoomLabel">100%</button><button id="zoomIn">＋</button></div></div>
    <div class="builder-hint">Drag nodes • drag ● connector to join • condition = YES/NO • double-click connection to delete • right-click node to clone</div>
  </section>
  <aside class="builder-pane right"><div class="pane-head">NODE CONFIGURATION</div><div id="inspector"></div></aside></div>`);
  const b=store.bots; let selected=null,zoom=1,connecting=null,next=100;
  const canvas=document.getElementById("canvas");

  function renderPalette(q=""){
    const p=document.getElementById("palette");p.innerHTML="";
    Object.entries(GROUPS).forEach(([g,types])=>{
      let wrap=document.createElement("div");wrap.className="palette-group";wrap.innerHTML=`<h4>${g}</h4>`;
      types.filter(t=>(TYPES[t][1]).toLowerCase().includes(q.toLowerCase())).forEach(t=>{
        let x=document.createElement("button");x.className="node-button";x.textContent=`${TYPES[t][0]} ${TYPES[t][1]}`;
        x.onclick=()=>add(t,220+b.nodes.length*25,140+b.nodes.length*18);wrap.appendChild(x);
      });p.appendChild(wrap);
    });
  }
  function add(type,x,y){
    let n={id:"n"+(++next),type,x,y,fields:structuredClone(TYPES[type][2])};b.nodes.push(n);selected=n.id;renderNodes();renderInspector();toast("Node added ✓");
  }
  function node(id){return b.nodes.find(n=>n.id===id)}
  function preview(n){return Object.entries(n.fields||{}).filter(([,v])=>v!=="").map(([k,v])=>`${k}: ${v}`).join("\\n")}
  function renderNodes(){
    const host=document.getElementById("nodes");host.innerHTML="";
    b.nodes.forEach(n=>{
      let d=TYPES[n.type],el=document.createElement("div");el.className="flow-node "+(selected===n.id?"selected":"");el.style.left=n.x+"px";el.style.top=n.y+"px";el.dataset.id=n.id;
      el.innerHTML=`<div class="head"><span>${d[0]} ${d[1]}</span><span style="color:#506a77">${n.id}</span></div><div class="body">${escapeHtml(preview(n))}</div>
      ${n.type!=="trigger"?'<i class="port in"></i>':""}
      ${n.type==="condition"?'<i class="port yes" data-branch="yes"></i><i class="port no" data-branch="no"></i>':n.type!=="end"?'<i class="port out" data-branch="default"></i>':""}`;
      host.appendChild(el);
      drag(el,n);
      el.onclick=()=>{selected=n.id;renderNodes();renderInspector()};
      el.ondblclick=()=>{selected=n.id;renderInspector()};
      el.oncontextmenu=e=>{e.preventDefault();if(confirm("Clone this node?")){b.nodes.push({...n,id:"n"+(++next),x:n.x+40,y:n.y+40,fields:structuredClone(n.fields)});renderNodes();}};
      el.querySelectorAll(".out,.yes,.no").forEach(p=>p.onpointerdown=e=>{e.stopPropagation();connecting={from:n.id,branch:p.dataset.branch||"default"}});
      el.querySelector(".in")?.addEventListener("pointerup",e=>{e.stopPropagation();if(connecting&&connecting.from!==n.id){b.edges.push({from:connecting.from,to:n.id,branch:connecting.branch});connecting=null;drawEdges();toast("Nodes connected ✓")}});
    });
    drawEdges();
  }
  function drag(el,n){
    let sx=0,sy=0,ox=0,oy=0,m=false;
    el.onpointerdown=e=>{if(e.target.classList.contains("port"))return;sx=e.clientX;sy=e.clientY;ox=n.x;oy=n.y;m=true;el.setPointerCapture(e.pointerId)};
    el.onpointermove=e=>{if(!m)return;n.x=ox+(e.clientX-sx)/zoom;n.y=oy+(e.clientY-sy)/zoom;el.style.left=n.x+"px";el.style.top=n.y+"px";drawEdges()};
    el.onpointerup=()=>m=false;
  }
  function drawEdges(){
    const s=document.getElementById("edges");s.innerHTML="";
    b.edges.forEach((ed,i)=>{let a=node(ed.from),c=node(ed.to);if(!a||!c)return;let x1=a.x+250,y1=a.y+48+(ed.branch==="yes"?-16:ed.branch==="no"?18:0),x2=c.x,y2=c.y+48,dx=Math.max(70,(x2-x1)/2),p=`M${x1} ${y1} C${x1+dx} ${y1},${x2-dx} ${y2},${x2} ${y2}`;s.innerHTML+=`<path class="edge hit" data-i="${i}" d="${p}"></path><path class="edge" d="${p}"></path>`});
    s.querySelectorAll(".hit").forEach(x=>x.ondblclick=()=>{b.edges.splice(+x.dataset.i,1);drawEdges();toast("Connection removed")});
  }
  function renderInspector(){
    const box=document.getElementById("inspector"),n=node(selected);
    if(!n){box.innerHTML=`<div class="inspector-section muted">Select a node to configure text, media, buttons, conditions, variables, webhook, sequence or handoff settings.</div>`;return}
    const d=TYPES[n.type];
    box.innerHTML=`<div class="inspector-section"><div class="inspector-title">${d[0]} ${d[1]}</div><div class="muted">Node ID: ${n.id}</div></div>`+
      Object.entries(n.fields).map(([k,v])=>`<div class="field" style="padding:0 12px"><label>${k.replaceAll("_"," ").toUpperCase()}</label>${String(v).length>75||["message","body","instruction"].includes(k)?`<textarea class="input textarea" data-k="${k}">${escapeHtml(v)}</textarea>`:`<input class="input" data-k="${k}" value="${escapeHtml(v)}">`}</div>`).join("")+
      `<div class="inspector-section"><label class="muted">VARIABLES</label><p><span class="var-chip">{{first_name}}</span><span class="var-chip">{{phone}}</span><span class="var-chip">{{email}}</span><span class="var-chip">{{order_id}}</span><span class="var-chip">{{custom_field}}</span></p></div>
       <div class="inspector-section"><button class="btn primary" id="applyNode">Apply</button> <button class="btn danger" id="deleteNode">Delete</button></div>`;
    box.querySelectorAll("[data-k]").forEach(i=>i.oninput=()=>n.fields[i.dataset.k]=i.value);
    document.getElementById("applyNode").onclick=()=>{renderNodes();toast("Node updated ✓")};
    document.getElementById("deleteNode").onclick=()=>{b.nodes=b.nodes.filter(x=>x.id!==n.id);b.edges=b.edges.filter(e=>e.from!==n.id&&e.to!==n.id);selected=null;renderNodes();renderInspector();toast("Node deleted")};
  }
  function setZoom(z){zoom=Math.max(.5,Math.min(1.8,z));canvas.style.transform=`scale(${zoom})`;document.getElementById("zoomLabel").textContent=Math.round(zoom*100)+"%";drawEdges()}
  document.getElementById("nodeSearch").oninput=e=>renderPalette(e.target.value);
  document.getElementById("addTrigger").onclick=()=>add("trigger",100,120);
  document.getElementById("addText").onclick=()=>add("text",430,120);
  document.getElementById("addInteractive").onclick=()=>add("interactive",760,120);
  document.getElementById("zoomIn").onclick=()=>setZoom(zoom+.1);document.getElementById("zoomOut").onclick=()=>setZoom(zoom-.1);document.getElementById("fit").onclick=()=>setZoom(1);
  window.addEventListener("pointerup",()=>connecting=null);
  renderPalette();renderNodes();renderInspector();
}

