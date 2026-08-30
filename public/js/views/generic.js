import {topbar,btn} from "../core/utils.js";
export function renderGeneric(title,subtitle,items){
  return topbar(title,subtitle,btn("＋ Create","btn primary"))+
  `<div class="content"><div class="tabs"><button class="tab active">All</button><button class="tab">Active</button><button class="tab">Drafts</button><button class="tab">Archived</button></div>
  <div class="card"><table class="table"><tr><th>Name</th><th>Status</th><th>Updated</th><th>Actions</th></tr>
  ${items.map(i=>`<tr><td><b>${i}</b></td><td><span class="pill">Active</span></td><td>Today</td><td>•••</td></tr>`).join("")}</table></div>
  </div>`;
}
