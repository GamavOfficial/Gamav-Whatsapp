const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const state={nodes:[],edges:[],selected:null,zoom:1,nextId:1,panX:0,panY:0};
const defs={
trigger:{title:"Trigger",icon:"⚡",body:"Keyword / event",fields:{keyword:"hi",mode:"keyword"}},
text:{title:"Send Text",icon:"💬",body:"Hello {{name}}",fields:{text:"Hello {{name}}"}},
image:{title:"Image",icon:"🖼",body:"Image URL",fields:{url:"https://example.com/image.jpg",caption:""}},
buttons:{title:"Buttons / URL",icon:"🔘",body:"Choose an option",fields:{text:"Choose an option",buttons:"Yes|No|Visit Website",urls:"||https://example.com"}},
list:{title:"List",icon:"☷",body:"Menu list",fields:{text:"Select an item",rows:"Option 1|Option 2|Option 3"}},
condition:{title:"Condition",icon:"◇",body:"{{value}} equals...",fields:{variable:"value",operator:"equals",value:"yes"}},
input:{title:"User Input",icon:"⌨",body:"Wait for customer reply",fields:{variable:"name",prompt:"What is your name?"}},
variable:{title:"Set Variable",icon:"≡",body:"Set variable",fields:{name:"status",value:"new"}},
label:{title:"Assign Label",icon:"🏷",body:"Add customer label",fields:{label:"VIP"}},
wait:{title:"Wait",icon:"◷",body:"5 seconds",fields:{seconds:"5"}},
api:{title:"API / Webhook",icon:"⇄",body:"POST /endpoint",fields:{method:"POST",url:"https://example.com/webhook",body:'{"id":"{{id}}"}'}},
template:{title:"Template",icon:"▤",body:"Approved template",fields:{name:"welcome",language:"en"}},
human:{title:"Human Handoff",icon:"👤",body:"Assign to agent",fields:{team:"Support"}},
end:{title:"End",icon:"⏹",body:"Flow complete",fields:{}}
};
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),1800)}
function addNode(type,x=150+state.nodes.length*25,y=150+state.nodes.length*25){
 const d=defs[type]; const n={id:"n"+state.nextId++,type,x,y,fields:structuredClone(d.fields)};
 state.nodes.push(n); state.selected=n.id; render(); return n;
}
function removeNode(id){state.nodes=state.nodes.filter(n=>n.id!==id);state.edges=state.edges.filter(e=>e.from!==id&&e.to!==id);state.selected=null;render()}
function nodeBy(id){return state.nodes.find(n=>n.id===id)}
function render(){
 const holder=$("#nodes"); holder.innerHTML="";
 state.nodes.forEach(n=>{
   const d=defs[n.type], el=document.createElement("div"); el.className="node"+(state.selected===n.id?" selected":"");el.dataset.id=n.id;
   el.style.left=n.x+"px";el.style.top=n.y+"px";
   const summary=summaryFor(n);
   el.innerHTML=`<div class="nodeHead"><span class="nodeType">${d.icon} ${d.title}</span><span style="color:#587181">${n.id}</span></div><div class="nodeBody">${esc(summary)}</div>`;
   if(n.type!=="trigger") el.innerHTML+=`<i class="port in" data-port="in"></i>`;
   if(n.type==="condition") el.innerHTML+=`<i class="port out" data-port="out" data-branch="yes" title="YES"></i><i class="port out" data-port="out" data-branch="no" title="NO"></i>`;
   else if(n.type!=="end") el.innerHTML+=`<i class="port out" data-port="out"></i>`;
   holder.appendChild(el); wireDrag(el,n);
 });
 drawEdges(); renderInspector();
}
function summaryFor(n){const f=n.fields;switch(n.type){
case"trigger":return `When: ${f.keyword||"any message"}`;
case"text":return f.text||"Text message";
case"image":return f.url||"Image URL";
case"buttons":return `${f.text||"Buttons"} • ${(f.buttons||"").split("|").join(" / ")}`;
case"condition":return `IF {{${f.variable}}} ${f.operator} "${f.value}"`;
case"input":return `Save reply → {{${f.variable}}}`;
case"variable":return `{{${f.name}}} = ${f.value}`;
case"label":return `Label: ${f.label}`;
case"wait":return `${f.seconds||0} seconds`;
case"api":return `${f.method} ${f.url}`;
case"template":return `${f.name} (${f.language})`;
case"human":return `Team: ${f.team}`;
default:return dflt(n);
}}
function dflt(n){return defs[n.type].body}
function esc(s){return String(s??"").replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]))}
function wireDrag(el,n){
 let sx,sy,ox,oy,moving=false;
 el.addEventListener("pointerdown",e=>{if(e.target.classList.contains("port"))return;sx=e.clientX;sy=e.clientY;ox=n.x;oy=n.y;moving=true;el.setPointerCapture(e.pointerId);state.selected=n.id;});
 el.addEventListener("pointermove",e=>{if(!moving)return;n.x=ox+(e.clientX-sx)/state.zoom;n.y=oy+(e.clientY-sy)/state.zoom;el.style.left=n.x+"px";el.style.top=n.y+"px";drawEdges();});
 el.addEventListener("pointerup",()=>{moving=false;renderInspector()});
 el.addEventListener("click",e=>{if(Math.abs(e.clientX-sx)+Math.abs(e.clientY-sy)<5){state.selected=n.id;render()}});
 el.querySelectorAll(".port.out").forEach(p=>p.addEventListener("pointerdown",e=>startConnect(e,n,p.dataset.branch||"default")));
 el.querySelectorAll(".port.in").forEach(p=>p.addEventListener("pointerup",e=>finishConnect(e,n)));
}
let connection=null;
function startConnect(e,n,branch){e.stopPropagation();connection={from:n.id,branch};document.body.style.cursor="crosshair"}
function finishConnect(e,n){e.stopPropagation();if(connection&&connection.from!==n.id){state.edges.push({from:connection.from,to:n.id,branch:connection.branch});toast("Nodes connected ✓");}connection=null;document.body.style.cursor="";render()}
document.addEventListener("pointerup",e=>{if(connection){connection=null;document.body.style.cursor=""}})
function drawEdges(){
 const svg=$("#edges");svg.innerHTML="";
 state.edges.forEach(edge=>{const a=nodeBy(edge.from),b=nodeBy(edge.to);if(!a||!b)return;
  const x1=a.x+235,y1=a.y+47+(edge.branch==="yes"?-15:edge.branch==="no"?18:0),x2=b.x,y2=b.y+47;
  const dx=Math.max(55,(x2-x1)*.5);const path=`M ${x1} ${y1} C ${x1+dx} ${y1}, ${x2-dx} ${y2}, ${x2} ${y2}`;
  svg.innerHTML+=`<path class="edgeHit" d="${path}" data-edge="${edge.from}:${edge.to}:${edge.branch}"/><path class="edge" d="${path}"/>`;
 });
 $$(".edgeHit").forEach(e=>e.addEventListener("dblclick",()=>{const [f,t,b]=e.dataset.edge.split(":");state.edges=state.edges.filter(x=>!(x.from===f&&x.to===t&&x.branch===b));drawEdges();toast("Connection removed")}));
}
function renderInspector(){
 const n=nodeBy(state.selected), empty=$("#emptyInspector"), form=$("#inspectorForm");
 if(!n){empty.hidden=false;form.hidden=true;return}
 empty.hidden=true;form.hidden=false;const d=defs[n.type];
 let html=`<div style="font-size:18px;font-weight:800;margin-bottom:4px">${d.icon} ${d.title}</div><div style="font-size:11px;color:#637c8b;margin-bottom:12px">Node ID: ${n.id}</div>`;
 Object.entries(n.fields).forEach(([k,v])=>{
   const label=k.replace(/^\w/,x=>x.toUpperCase()).replaceAll("_"," ");
   const isLong=String(v).length>55||k==="text"||k==="body"||k==="prompt";
   html+=`<div class="field"><label>${label}</label>${isLong?`<textarea data-field="${k}">${esc(v)}</textarea>`:`<input data-field="${k}" value="${esc(v)}">`}</div>`;
 });
 if(n.type==="condition")html+=`<div class="field"><label>Connections</label><div style="font-size:11px;color:#6f8896">Blue = YES • Orange = NO</div></div>`;
 html+=`<div class="inspectorActions"><button id="deleteNode" class="topActions button danger">Delete</button></div>`;
 form.innerHTML=html;
 form.querySelectorAll("[data-field]").forEach(inp=>inp.addEventListener("input",()=>{n.fields[inp.dataset.field]=inp.value;render()}));
 $("#deleteNode").onclick=()=>removeNode(n.id);
}
$$(".addNode").forEach(b=>b.addEventListener("click",()=>addNode(b.dataset.type)));
$("#saveBtn").onclick=()=>{localStorage.setItem("gamavFlow",JSON.stringify(state));toast("Bot saved locally ✓")};
$("#loadBtn").onclick=()=>{const s=localStorage.getItem("gamavFlow");if(!s)return toast("No saved bot found");Object.assign(state,JSON.parse(s));render();toast("Bot loaded ✓")};
$("#newBtn").onclick=()=>{if(confirm("Start a new bot?")){state.nodes=[];state.edges=[];state.selected=null;state.nextId=1;addNode("trigger",160,180);addNode("text",470,180);render();}};
$("#testBtn").onclick=()=>{const trigger=state.nodes.find(n=>n.type==="trigger");toast(trigger?`Test started: "${trigger.fields.keyword}"`:"Add a Trigger first")};
$("#zoomIn").onclick=()=>zoom(1.1);$("#zoomOut").onclick=()=>zoom(.9);$("#fitBtn").onclick=()=>{state.zoom=1;render();};
function zoom(v){state.zoom=Math.max(.5,Math.min(1.7,state.zoom*v));$("#canvas").style.transform=`scale(${state.zoom})`;$("#zoomLabel").textContent=Math.round(state.zoom*100)+"%";drawEdges()}
$("#canvasWrap").addEventListener("wheel",e=>{if(e.ctrlKey){e.preventDefault();zoom(e.deltaY<0?1.1:.9)}},{passive:false});
function init(){const saved=localStorage.getItem("gamavFlow");if(saved){try{Object.assign(state,JSON.parse(saved))}catch{}}if(!state.nodes.length){addNode("trigger",130,160);const t=addNode("text",440,160);state.edges.push({from:"n1",to:t.id,branch:"default"});const c=addNode("condition",750,160);state.edges.push({from:t.id,to:c.id,branch:"default"});addNode("human",1080,110);addNode("end",1080,300)}render()}
init();
